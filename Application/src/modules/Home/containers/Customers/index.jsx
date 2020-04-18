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

// Utils
import {fortmatName} from 'Src/utils';

const {Title} = Typography;
const {Option} = Select;

const hideField = ['id', 'key', 'actions', 'userName', 'pass', 'identifyFront', 'identifyBack', 'role', 'province', 'avatar', 'idOwner'];

const Customers = props => {
    // Props
    const {layout, blocks} = props;
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [blockSelected, setBlockSelected] = useState([]);
    const [isShowLoadingTable, setIsShowLoadingTable] = useState(false);
    const [customers, setCustomers] = useState([]);

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
            title: <div style={{textAlign: 'center'}}>Trạng thái</div>,
            dataIndex: 'status',
            key:'status'
        },
        {
            title: 'Phòng',
            dataIndex: 'room',
            key:'room',
            ellipsis: true
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

    const onConfirmRemove = (id) => {

    };

    const onClickEdit = () => {

    };

    useEffect(() => {
        layout({
            type: 'path',
            value: 'customers'
        });
        
    }, []);

    useEffect(()=>{
        if (blocks.length > 0) {

            // had block in list
            let isHaded = blocks.some(block => block.id === +localStorage.getItem('blockSelected'));

            if (localStorage.getItem('blockSelected') && isHaded) {
                const defaultBlock = localStorage.getItem('blockSelected');
    
                setBlockSelected(+defaultBlock);
            } else {
                setBlockSelected(blocks[0].id);
            }

        }

    },[blocks]);

    const onClickAddNew = () => {

    };

    const onConfirmDelete = () => {

    };

    const onChangeBlocks = (value) => {
        localStorage.setItem('blockSelected',value);
        
        setBlockSelected(value);
    };

    const showRenderInfoUser = (key, value) => {
        switch (key) {
            case 'sex':
                return value === 'male' ? 'Nam' : 'Nữ';
            case 'dateBirth':
                return moment(value, 'YYYY-MM-DD').format('DD/MM/YYYY');
        
            case 'tempReg':
                return value === 1 ? 'Có' : 'Không';
        
            default:
                return value;
        }
    };

    return (
        <div style={{padding: 10}}>
            <Row>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}}>
                    <Title level={4}>QUẢN LÝ KHÁCH THUÊ</Title>
                </Col>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}} className='flex-row' style={{justifyContent: 'flex-end'}}>
                    <Select
                        showSearch
                        value={blockSelected}
                        style={{width: 200}}
                        placeholder="Chọn khu trọ"
                        onChange={onChangeBlocks}
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {
                            blocks.map(block =>(
                                <Option key={block.id} value={block.id}>{block.nameBlock}</Option>
                            ))
                        }
                    </Select>
                </Col>
            </Row>
            <Row style={{marginTop: 20}}>
                <Col xs={{span: 24}} md={{span: 24}} className='flex-row' style={{justifyContent: 'flex-end'}}>
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

                                                    if (!isHide) {
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