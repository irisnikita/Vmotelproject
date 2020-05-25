// Libraries
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {Button, Table,Row,Col, Typography, Tooltip, Spin, Popconfirm, message, Select, Avatar} from 'antd';

// Actions
import {layout} from 'Layouts/actions';

// Services
import * as customerServices from 'Src/services/customer';

// Components
import CustomerModal from './components/CustomerModal';

// Utils
import {fortmatName} from 'Src/utils';

const {Title} = Typography;

const hideField = ['id', 'key', 'actions', 'userName', 'pass', 'rooms', 'identifyFront', 'identifyBack', 'role', 'province', 'avatar', 'idOwner', 'address'];

const Customers = props => {
    // Props
    const {layout, blocks} = props;
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [isShowLoadingTable, setIsShowLoadingTable] = useState(false);
    const [customers, setCustomers] = useState([]);
    const [customerModal, setCustomerModal] = useState({
        isOpen: false,
        customerEdited: {}
    });

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowsKey) => {
            setselectedRowKeys(selectedRowsKey);
        }
    };

    const columns = [
        {
            title: '',
            dataIndex: 'actions',
            key:'actions',
            width: 100,
            render: (id)=> <div className='flex-row-center'>
                <Tooltip title='Sửa'>
                    <Button onClick={()=>onClickEdit(id)} className='flex-row-center' size='small' shape='circle'>
                        <i className='icon-createmode_editedit' />
                    </Button>
                </Tooltip> &nbsp;
                <Tooltip title='Xóa'>
                    <Popconfirm
                        title='Bạn muốn xóa khu trọ/căn hộ này?'
                        onConfirm={()=>onConfirmRemove(id)}
                        okText='Xóa'
                        cancelText='Hủy'
                    >
                        <Button className='flex-row-center' size='small' type='danger' shape='circle'>
                            <i className='icon-highlight_remove' />
                        </Button>
                    </Popconfirm>
                </Tooltip>
            </div>
        },
        {
            title: 'Tên khách thuê',
            dataIndex: 'fullName',
            key:'fullName'
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phoneNumber',
            key:'phoneNumber'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key:'status',
            render: (rooms) => {
                if (rooms && rooms.length > 0) {
                    return <div style={{color: '#13c2c2'}}>
                        <i className='icon-check_circle' /> &nbsp;
                            Đã thuê
                    </div>;
                } else {
                    return <div style={{color: '#f5222d'}}>
                        <i className='icon-error'  /> &nbsp;
                            Chưa thuê
                    </div>;
                }
            }
        },
        {
            title: 'Phòng',
            dataIndex: 'rooms',
            key:'rooms',
            ellipsis: true,
            render: (rooms) => <div className='flex-row'>{rooms && rooms.length > 0 ? rooms.map(room => <div key={room.nameRoom} style={{marginRight: '2px'}}>{`${room.nameRoom},`}</div>) : 'Không có'}</div> 
        },
        {
            title: 'Đại diện phòng',
            dataIndex: 'roomMaster',
            key:'roomMaster'
        }
    ];

    useEffect(() => {
        getDataCustomers();
    }, []);

    const getDataCustomers = async() => {
        setIsShowLoadingTable(true);

        const getCustomers = await customerServices.getList();

        if (getCustomers) {
            if (getCustomers.data && getCustomers.data.data) {
                let {customers} = getCustomers.data.data;

                customers = customers.map(customer => ({
                    ...customer,
                    status: customer.rooms,
                    key: customer.id,
                    actions: customer.id
                }));

                setCustomers(customers);
            }
        }

        setIsShowLoadingTable(false);
    };

    const onConfirmRemove = async (id) => {
        const customer = customers.find(customer => customer.id === id);

        if (customer.rooms && customer.rooms.length > 0) {
            message.error('Khách hàng đang thuê không thể xóa được !');
            
        } else {
            const removeCustomer = await customerServices.del({
                id
            });

            if (removeCustomer) {
                if (removeCustomer.data && removeCustomer.data.data) {
                    message.success('Xóa khách hàng thành công');
                
                    getDataCustomers();
                }
            }
        }
       
    };

    const onClickEdit = (id) => {
        const customerEdited = customers.find(customer => customer.id === id);

        setCustomerModal({
            ...customerEdited,
            isOpen: true,
            customerEdited
        });
    };

    useEffect(() => {
        layout({
            type: 'path',
            value: 'customers'
        });
        
    }, []);

    const onClickAddNew = () => {
        setCustomerModal({
            ...customerModal,
            isOpen: true,
            customerEdited: {}
        });
    };

    const onConfirmDelete = async () => {
        const newCustomers = customers.filter(customer => {
            return selectedRowKeys.some(row => row === customer.id);
        });

        const isInValid = false;

        if (!isInValid) {
            const deleteCustomers = await customerServices.delAll({
                customersId: selectedRowKeys
            });

            if (deleteCustomers) {
                if (deleteCustomers.data && deleteCustomers.data.data) {
                    message.success('Xóa các khách hàng thành công!');
                    getDataCustomers();
                } else {
                    message.error('Xóa các khách hàng thất bại!');
                }
            }
        } else {
            const draftCustomer = newCustomers.filter(customer => customer.rooms.length > 0);

            message.error(`Có ${draftCustomer.length} khách hàng đang thuê, bạn không thể xóa được!`);
        }
       
    };

    const showRenderInfoUser = (key, value) => {
        switch (key) {
            case 'sex':
                return value === 'male' ? 'Nam' : 'Nữ';
            case 'dateBirth':
                return moment(value).format('DD/MM/YYYY');
        
            case 'tempReg':
                return value === 1 ? 'Có' : 'Không';
        
            default:
                return value;
        }
    };

    const callbackCustomerModal = () => {
        getDataCustomers();
    };

    return (
        <div style={{padding: 10}}>
            <Row>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}}>
                    <Title level={4}>QUẢN LÝ KHÁCH THUÊ</Title>
                </Col>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}} className='flex-row' style={{justifyContent: 'flex-end'}}>
                    <Button disabled={blocks.length > 0 ? false : true} type='primary' className='flex-row' onClick={onClickAddNew} >
                        <i className='icon-add_circle_outlinecontrol_point' /> &nbsp;
                        Thêm mới
                    </Button> &nbsp;
                    <Popconfirm
                        disabled={selectedRowKeys.length > 0 ? false : true}
                        placement="bottom"
                        title={`Bạn có muốn xóa ${selectedRowKeys.length} phòng này?`}
                        okText='Xóa'
                        onConfirm={onConfirmDelete}
                        cancelText='Hủy'
                    >
                        <Button disabled={selectedRowKeys.length > 0 ? false : true} type='danger' >
                            <i className='icon-delete' /> &nbsp;
                            Xóa nhiều
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>
            <Spin spinning={isShowLoadingTable} tip='Loading...'>
                <Row style={{paddingTop: '10px'}}>
                    <Table 
                        size='small' 
                        rowSelection={rowSelection} 
                        style={{width: '100%'}} 
                        columns={columns} 
                        dataSource={customers}
                        expandable={{
                            expandedRowRender: records => <Row>
                                <Col xs={{span: 24}} md={{span: 4}} className='flex-row-center'>
                                    <Avatar size={100} src={records.avatar} />
                                </Col>
                                <Col xs={{span: 24}} md={{span: 16}}>
                                    <Row>
                                        {
                                            Object.keys(records).length > 0 ?
                                                Object.keys(records).map(record => {
                                                    const isHide = hideField.some(field => record === field);

                                                    if (!isHide && typeof records[record] !== 'object') {
                                                        return <Col span='12' key={record}>
                                                            <strong>{fortmatName(record)}:</strong> &nbsp;
                                                            {showRenderInfoUser(record, records[record])}
                                                        </Col>;
                                                    }
                                                }) : null
                                        }
                                    </Row>
                                </Col>
                            </Row>
                        }} 
                    />
                </Row>
            </Spin>
            <CustomerModal 
                customerEdited={customerModal.customerEdited}
                callback={callbackCustomerModal}
                isOpen={customerModal.isOpen}
                toggle={() => {setCustomerModal({...customerModal, isOpen: !customerModal.isOpen})}} 
            />
        </div>
    );
};

Customers.propTypes = {
    
};

function mapStateToProps (state) {
    return {
        blocks: state.Layouts.layoutReducer.blocks
    };
}

const mapDispatchToProps = {
    layout
};

export default connect(mapStateToProps, mapDispatchToProps)(Customers);