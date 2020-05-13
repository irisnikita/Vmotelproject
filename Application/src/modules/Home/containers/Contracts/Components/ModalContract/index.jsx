// Libraries
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Modal, Typography, Form, Input, Button, message, Row, Col, Transfer, InputNumber, Select, DatePicker} from 'antd';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

// Services
import * as roomServices from 'Src/services/room';
import * as customerServices from 'Src/services/customer';
import * as contractServices from 'Src/services/contract';

const {Option} = Select;
const {RangePicker} = DatePicker;

const dateFormat = 'DD/MM/YYYY';

const ModalContract = props => {
    const [form] = Form.useForm();

    // Props
    const {isOpen, contractEdited, toggle, blockSelected, callback} = props;

    // State
    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState({});
    const [customers, setCustomers] = useState([]);
    const [transfer, setTransfer] = useState({
        targetKeys: [],
        selectedKeys: []
    });
    const [newCustomers, setNewCustomers] = useState([]);

    const [formContract, setFormContract] = useState({
        idSlave: '',
        startDate: moment().format('YYYY-MM-DD'),
        endDate: moment().add(1, 'year').format('YYYY-MM-DD'),
        circlePay: 1
    });
    const [isShowLoading, setIsShowLoading] = useState(false);

    useEffect(() => {
        getDataCustomers();
    }, []);

    useEffect(() => {
        if (isOpen) {
            if (!_.isEmpty(contractEdited)) {
                form.setFieldsValue({
                    idRoom: contractEdited.idRoom,
                    idSlave: contractEdited.idSlave,
                    circlePay: contractEdited.circlePay,
                    deposit: contractEdited.deposit,
                    dayPay: contractEdited.dayPay,
                    note: contractEdited.note,
                    date: [moment(contractEdited.startDate), moment(contractEdited.endDate)]
                });

                getRoom(contractEdited.idRoom);
                setFormContract({
                    startDate: moment(contractEdited.startDate).format('YYYY-MM-DD'),
                    endDate: moment(contractEdited.endDate).format('YYYY-MM-DD')
                });
                setTransfer({
                    targetKeys: contractEdited.idUsers,
                    selectedKeys: []
                });

            } else {
                form.setFieldsValue({
                    idRoom: '',
                    idSlave: '',
                    deposit: '',
                    note: '',
                    date: [moment(), moment().add(1, 'year')],
                    circlePay: 1,
                    dayPay: +moment().format('DD')
                });
                setTransfer({
                    targetKeys: [],
                    selectedKeys: []
                });
                setFormContract({
                    startDate: moment().format('YYYY-MM-DD'),
                    endDate: moment().add(1, 'year').format('YYYY-MM-DD'),
                    circlePay: 1
                });
            }
        }
    }, [isOpen, contractEdited]);

    useEffect(() => {
        form.setFieldsValue({
            dayPay: +moment(formContract.startDate, 'YYYY-MM-DD').format('DD')
        });
    }, [formContract.startDate]);

    useEffect(() => {
        getDataRooms();
        
    }, [blockSelected]);

    useEffect(() => {
        if (transfer.targetKeys.length > 0) {
            const newCustomers = customers.filter(customer => transfer.targetKeys.some(key => key === customer.id));

            setNewCustomers(newCustomers);
        } else {
            setNewCustomers([]);

            form.setFieldsValue({
                idSlave: ''
            });
        }
    }, [transfer.targetKeys]);

    const getRoom = async (id) => {
        const getRoom = await roomServices.get({
            id
        });
        
        if (getRoom) {
            if (getRoom.data && getRoom.data.data) {
                const {room = {}} = getRoom.data.data;

                setRoom(room || {});
            }
        }
    };

    const getDataCustomers = async() => {
        const getCustomers = await customerServices.getList();

        if (getCustomers) {
            if (getCustomers.data && getCustomers.data.data) {
                let {customers} = getCustomers.data.data;

                customers = customers.map(customer => ({
                    ...customer,
                    key: customer.id,
                    actions: customer.id
                }));

                setCustomers(customers);
            }
        }

    };

    const onOkModal = () => {
        toggle();
    };

    const onCancelModal = () => {
        toggle();
    };

    const onFinishForm = (value) => {
        if (_.isEmpty(contractEdited)) {
            createContract(value);
        }
        else {
            updateContract(value);
        }
        
    };

    const updateContract = async (valueForm) => {
        if (props.userLogin.id) {
            setIsShowLoading(true);

            const userRooms = transfer.targetKeys.map(user => ({
                idUser: user,
                idRoom: valueForm.idRoom
            }));

            const contract = {
                idRoom: valueForm.idRoom,
                idSlave: valueForm.idSlave,
                startDate: formContract.startDate,
                endDate: formContract.endDate,
                circlePay: valueForm.circlePay,
                deposit: valueForm.deposit,
                dayPay: valueForm.dayPay,
                note: valueForm.note,
                idBlock: blockSelected,
                userRooms
            };

            const updateContract = await contractServices.update({
                ...contract,
                id: contractEdited.id
            });

            if (updateContract) {
                if (updateContract.data && updateContract.data.data) {
                    message.success('Cập nhật hợp đồng thành công');
                    toggle();
                    callback();
                } else {
                    message.error('Cập nhật hợp đồng thật bại');
                }
            }

            setIsShowLoading(false);

        }
    };

    const createContract = async (valueForm) => {
        if (props.userLogin.id) {
            setIsShowLoading(true);

            const userRooms = transfer.targetKeys.map(user => ({
                idUser: user,
                idRoom: valueForm.idRoom
            }));

            const contract = {
                idRoom: valueForm.idRoom,
                idOwner: props.userLogin.id || 0,
                idSlave: valueForm.idSlave,
                startDate: formContract.startDate,
                endDate: formContract.endDate,
                circlePay: valueForm.circlePay,
                deposit: valueForm.deposit,
                dayPay: valueForm.dayPay,
                note: valueForm.note,
                idBlock: blockSelected,
                userRooms
            };

            const createContract = await contractServices.create({
                ...contract
            });

            if (createContract) {
                if (createContract.data && createContract.data.data) {
                    message.success('Tạo hợp đồng thành công');
                    toggle();
                    callback();
                    getDataRooms();
                }
                else {
                    message.error('Tạo hợp đồng thất bại');
                }
            }

            setIsShowLoading(false);

        }

    };
    const getDataRooms = async () => {

        const getRooms = await roomServices.getList({
            idBlock: blockSelected,
            id:1,
            isMatch: true
        });

        if (getRooms) {
            if (getRooms.data && getRooms.data.data) {
                const {rooms} = getRooms.data.data;

                setRooms(rooms || []);
            }
        }
    };

    const layout = {
        labelCol: {
            xs: {span: 24},
            md: {span: 24}
        },
        wrapperCol: {
            xs: {span: 24},
            md: {span: 24}
        }
    };

    const onChangeTransfer = (nextTargetKeys, direction, moveKeys) => {
        setTransfer({
            ...transfer,
            targetKeys: nextTargetKeys
        });

    };

    const onSelectChangeTransfer = (sourceSelectedKeys, targetSelectedKeys) => {
        if ( typeof form.getFieldValue('idRoom') !== 'undefined') {
            setTransfer({
                ...transfer,
                selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys]
            });
    
        }
        else {
            message.error('Vui lòng chọn phòng trước');
        }
        
    };

    const onScrollTransfer = () => {
        
    };

    const onChangeDateRangePicker = (dates) => {
        setFormContract({
            ...formContract,
            startDate: moment(dates[0]).format('YYYY-MM-DD'),
            endDate: moment(dates[1]).format('YYYY-MM-DD')
        });
    };

    const onChangeCirclePay = (event) => {
        const {value} = event.target;

        setFormContract({
            ...formContract,
            circlePay: value
        });
    };

    const onClickCancel = () => {
        toggle();
    };

    return (
        <Modal
            width={700}
            title={
                <div className='flex-row' style={{fontSize: 20, color: '#08979c'}}>
                    <i className={_.isEmpty(contractEdited) ? 'icon-add' : 'icon-createmode_editedit'} /> &nbsp;
                    <strong >{_.isEmpty(contractEdited) ? 'Tạo mới' : 'Chỉnh sửa'}</strong>
                </div>
            }            
            forceRender
            destroyOnClose={false} 
            getContainer={false}
            visible={isOpen}
            onOk={onOkModal}
            onCancel={onCancelModal}
            footer={null}
        >
            <Form 
                form={form} {...layout} 
                name='form-contract' 
                onFinish={onFinishForm} 
                labelAlign='left'
                initialValues={{
                    date: [moment(), moment().add(1, 'year')],
                    circlePay: 1,
                    dayPay: +moment().format('DD')
                }}
            >
                <Row>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Chọn phòng'
                            name='idRoom'
                            rules={[
                                {required: _.isEmpty(contractEdited) ? true : false, message: 'Hãy chọn phòng'}
                            ]}
                        >
                            {_.isEmpty(contractEdited) ? 
                                <Select style={{width: 278}} placeholder='Hãy chọn phòng'>
                                    {
                                        rooms.length > 0 ?
                                            rooms.map(room => {
                                                return <Option key={room.id} value={room.id}>
                                                    {room.nameRoom}
                                                </Option>;
                                            }) : null
                                    }
                                </Select> : 
                                <strong>{room.nameRoom}</strong>
                            }
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label='Chọn khách hàng'
                >
                    <Transfer
                        dataSource={customers}
                        titles={['Khách hàng chọn', 'Khách hàng đã chọn']}
                        listStyle={{
                            width: 300,
                            height: 300
                        }}
                        locale={{
                            itemUnit: 'Khách hàng'
                        }}
                        targetKeys={transfer.targetKeys}
                        selectedKeys={transfer.selectedKeys}
                        onChange={onChangeTransfer}
                        onSelectChange={onSelectChangeTransfer}
                        onScroll={onScrollTransfer}
                        render={customer => customer.fullName}
                    />
                </Form.Item>
                <Row>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Chọn người đại diện'
                            name='idSlave'
                            rules={[
                                {required: true, message: 'Vui lòng chọn người đại diện'}
                            ]}
                        >
                            <Select style={{width: 278}} placeholder='Chọn người đại diện'>
                                {
                                    newCustomers.map(customer => (
                                        <Select.Option key={customer.id} value={customer.id}>
                                            {customer.fullName}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label='Tiền đặt cọc'
                            name='deposit'
                            rules={[
                                {required: true, message: 'Vui lòng nhập tiền đặt cọc'}
                            ]}
                        >
                            <InputNumber  
                                style={{width: 278}}
                                formatter={value => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                // eslint-disable-next-line no-useless-escape
                                parser={value => value.replace(/\₫\s?|(,*)/g, '')} 
                                placeholder='Nhập tiền đặt cọc' 
                            />
                        </Form.Item>
                        <Form.Item
                            label='Ngày bắt đầu và kết thúc hợp đồng'
                            name='date'
                            rules={[
                                {required: true, message: 'Vui lòng nhập ngày bắt đầu và kết thúc hợp đồng'}
                            ]}
                        >
                            <RangePicker
                                onChange={onChangeDateRangePicker}
                                format={dateFormat}
                            />
                        </Form.Item>
                        <Form.Item
                            label='Kì thanh toán'
                            name='circlePay'
                            rules={[
                                {required: true, message: 'Vui lòng nhập kì thanh toán'}
                            ]}
                        >
                            <Input
                                onChange={onChangeCirclePay}
                                placeholder='Vui lòng nhập kì thanh toán'
                                style={{width: 278}} 
                                addonAfter={<div className='flex-row-center'><i className='icon-update' />Tháng/lần</div>} />
                        </Form.Item>
                        <Form.Item
                            label='Ngày đóng tiền kì tới'
                            name='dayPay'
                            rules={[
                                {required: true, message: 'Vui lòng nhập ngày đóng tiền kì tới'}
                            ]}
                        >
                            <InputNumber style={{width: 278}} min={0} max={30} placeholder='Nhập ngày đóng tiền kì tới' />
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Ghi chú'
                            name='note'
                        >
                            <Input.TextArea placeholder='Nhập ghi chú' />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item 
                    wrapperCol={{
                        md: {span: 8, offset: 16}
                    }}
                >
                    <div className='flex-row' style={{justifyContent: 'flex-end'}}>
                        <Button onClick={onClickCancel} >Hủy bỏ</Button>&nbsp;
                        <Button htmlType='submit' type='primary' loading={isShowLoading}>Lưu lại</Button> 
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

function mapStateToProps(state) {
    return {
        userLogin: state.Layouts.layoutReducer.userLogin
    };
}

ModalContract.propTypes = {
    toggle: PropTypes.func.isRequired
};

ModalContract.defaultProps = {
    isOpen: false,
    contractEdited: {}
};

export default connect(mapStateToProps, null)(ModalContract);