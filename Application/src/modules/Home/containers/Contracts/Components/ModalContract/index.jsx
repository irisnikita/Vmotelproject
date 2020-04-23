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

const {Option} = Select;
const {RangePicker} = DatePicker;

const dateFormat = 'DD/MM/YYYY';

const ModalContract = props => {
    const [form] = Form.useForm();

    // Props
    const {isOpen, contractEdited, toggle, blockSelected} = props;

    // State
    const [rooms, setRooms] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [transfer, setTransfer] = useState({
        targetKeys: [],
        selectedKeys: []
    });
    const [newCustomers, setNewCustomers] = useState([]);

    const [formContract, setFormContract] = useState({
        idSlave: '',
        startDate: '',
        endDate: ''
    });

    useEffect(() => {
        getDataCustomers();
    }, []);

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

    const onFinishForm = () => {
        
    };

    const getDataRooms = async () => {

        const getRooms = await roomServices.getList({
            idBlock: blockSelected,
            id:1
        });

        if (getRooms) {
            if (getRooms.data && getRooms.data.data) {
                const {rooms} = getRooms.data.data;

                setRooms(rooms || []);
            }
        }
    };

    console.log(formContract);

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
            <Form form={form} {...layout} name='form-contract' onFinish={onFinishForm} labelAlign='left'>
                <Row>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Chọn phòng'
                            name='idRoom'
                            rules={[
                                {required: true, message: 'Hãy chọn phòng'}
                            ]}
                        >
                            <Select style={{width: 278}} placeholder='Hãy chọn phòng'>
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
                                {required: true, message: 'Vui lòng nhập tiền đặt cọc'}
                            ]}
                        >
                            <RangePicker
                                onChange={onChangeDateRangePicker}
                                defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                                format={dateFormat}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}} />
                </Row>
            </Form>
        </Modal>
    );
};

ModalContract.propTypes = {
    toggle: PropTypes.func.isRequired
};

ModalContract.defaultProps = {
    isOpen: false,
    contractEdited: {}
};

export default ModalContract;