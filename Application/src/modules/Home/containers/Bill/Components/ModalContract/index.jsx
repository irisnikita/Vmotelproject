// Libraries
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Modal, Table, Form, Input, Button, message, Row, Col, InputNumber, Select, DatePicker} from 'antd';
import numeral from 'numeral';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

// Services
import * as roomServices from 'Src/services/room';
import * as customerServices from 'Src/services/customer';
import * as contractServices from 'Src/services/contract';
import * as serviceServices from 'Src/services/servicesMotel';
import * as billServices from 'Src/services/bill';

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
    const [services, setServices] = useState([]);
    const [roomSelected, setRoomSelected] = useState({});
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
    const [total, setTotal] = useState(0);
    const [isShowLoading, setIsShowLoading] = useState(false);

    const columns = [
        {
            title: 'Tên dịch vụ',
            dataIndex: 'nameService',
            key: 'nameService'
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => {
                return <div>{numeral(price).format('0,0')} đ</div>;
            }
        },
        {
            title: 'Số lượng',
            dataIndex: 'numberInfo',
            key: 'numberInfo',
            render: (numberInfo) => {
                return <InputNumber min={0} disabled={numberInfo.isDisabled} onChange={(e) => onChangeNumber(e, numberInfo.index)} value={numberInfo.number || 0} />;
            }
        },
        {
            title: 'Đơn vị',
            dataIndex: 'nameUnit',
            key: 'nameUnit'
        },
        {
            title: 'Tổng cộng',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (totalPrice) => <div>{numeral(totalPrice).format('0,0')} đ</div>
        }
    ];

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
        if (!_.isEmpty(roomSelected)) {
            getServices();
        }
    }, [blockSelected, roomSelected]);

    useEffect(() => {
        let total = 0;

        services.forEach(service => {
            total = total + service.totalPrice;
        });

        setTotal(total);
    }, [services]);

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

    const onChangeNumber = (value, index) => {
        let service = services[index];

        service = {
            ...service,
            numberInfo: {
                index,
                number: value || 0
            },
            totalPrice: (value || 0) * service.price
        };

        const newServices = [...services];

        newServices[index] = service;

        setServices(newServices);
    };

    const getServices = async () => {
        const getServices = await serviceServices.getList({
            idBlock: blockSelected
        });

        if (getServices) {
            if (getServices.data && getServices.data.data) {
                const {services = []} = getServices.data.data;
                
                const newServices = services.map((service, index) => ({
                    ...service,
                    key: service.id,
                    nameService: service.nameService,
                    price: service.price,
                    nameUnit: service.nameUnit,
                    totalPrice: 0,
                    numberInfo: {
                        number: 0,
                        index
                    }
                }));

                newServices.push({
                    id: 10001,
                    key: 10001,
                    nameService: 'Tiền phòng',
                    price: roomSelected.price,
                    nameUnit: 'Phòng',
                    idUnit: 2,
                    totalPrice: roomSelected.price,
                    numberInfo: {
                        number: 1,
                        isDisabled: true
                    }
                });

                setServices(newServices);
            }
        }
    };

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
        createBill(value);
        
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

    console.log(services);

    const createBill = async (valueForm) => {
        if (props.userLogin.id) {
            setIsShowLoading(true);

            const billDetails = services.map(service =>({
                nameService: service.nameService,
                price: service.price,
                nameUnit: service.nameUnit,
                amount: service.numberInfo.number,
                totalPrice: service.totalPrice
            }));

            const bill = {
                idRoom: valueForm.idRoom,
                dateCheckOut: moment().format(),
                totalPrice: total,
                isCheckedOut: 0,
                idBlock: blockSelected,
                codeBill: '#' + moment().unix(),
                billDetails: billDetails
            };

            const createContract = await billServices.create({
                ...bill
            });

            if (createContract) {
                if (createContract.data && createContract.data.data) {
                    message.success('Tạo hóa đơn thành công');
                    toggle();
                    callback();
                    getDataRooms();
                }
                else {
                    message.error('Tạo hóa đơn thất bại');
                }
            }

            setIsShowLoading(false);

        }

    };
    const getDataRooms = async () => {

        const getRooms = await roomServices.getList({
            idBlock: blockSelected
        });

        if (getRooms) {
            if (getRooms.data && getRooms.data.data) {
                const {rooms} = getRooms.data.data;

                setRooms(rooms || []);

                setRoomSelected(rooms[0]);

                if (rooms[0]) {
                    form.setFieldsValue({
                        idRoom: rooms[0].id
                    });
                }
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

    const onChangeRoom = (id) => {
        let room = rooms.find(room => room.id === id);

        setRoomSelected(room);
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
                <Form.Item
                    label='Chọn phòng'
                    name='idRoom'
                    rules={[
                        {required: true , message: 'Hãy chọn phòng'}
                    ]}
                >
                    <Select style={{width: 278}} placeholder='Hãy chọn phòng' onChange={onChangeRoom}>
                        {
                            rooms.length > 0 ?
                                rooms.map(room => {
                                    return <Option key={room.id} value={room.id}>
                                        {room.nameRoom}
                                    </Option>;
                                }) : null
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    label='Chọn dịch vụ'
                >
                    <Table 
                        pagination={false}
                        columns={columns} 
                        dataSource={services} 
                        footer = {() => <div><strong>Tổng cộng:</strong> {numeral(total).format('0,0')} đ</div>}
                    />
                </Form.Item>
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