// Libraries
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Table,Row,Col, Typography, Tooltip, Spin, Popconfirm, message, Select, Input, InputNumber} from 'antd';
import axios from 'axios';
import numeral from 'numeral';

// Actions
import {layout} from 'Layouts/actions';

// Services
import * as serviceServices from 'Src/services/servicesMotel';

// Components
import ModalCreate from './components/ModalCreate';

// Antd
const {Title} = Typography;
const {Option} = Select;

const Services = props => {

    // Props
    const {layout, blocks} = props;

    // State
    const [blockSelected, setBlockSelected] = useState(null);
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [isShowLoadingTable, setIsShowLoadingTable] = useState(false);
    const [services, setServices] = useState([]);
    const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);

    const rowSelection = {
        
    };

    const columns = [
        {
            title: '',
            dataIndex: 'edit',
            key:'edit',
            width: 100,
            render: (id)=> <div className='flex-row-center'>
                <Tooltip title='Sửa'>
                    <Button onClick={()=>onClickEdit(id)} className='flex-row-center' size='small' shape='circle'>
                        <i className='icon-createmode_editedit' />
                    </Button>
                </Tooltip> &nbsp;
                <Tooltip title='Xóa'>
                    <Popconfirm
                        title='Bạn muốn xóa dịch vụ này?'
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
            title: 'Tên dịch vụ',
            dataIndex: 'nameService',
            key:'nameService'
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key:'price',
            render: (price) => (<div>
                {numeral(price).format('0,0.00')} vnđ
            </div>)
        },
        {
            title: 'Đơn vị',
            dataIndex: 'nameUnit',
            key:'nameUnit'
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key:'description'
        }
    ];

    useEffect(() => {
        layout({
            type: 'path',
            value: 'services'
        });
    }, []);

    useEffect(() => {
        if (blockSelected) {
            getServices();
        }
    }, [blockSelected]);

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

    const onChangeBlocks = (value) => {
        localStorage.setItem('blockSelected',value);
        
        setBlockSelected(value);
    };

    const getServices = async () => {
        setIsShowLoadingTable(true);

        const getServices = await serviceServices.getList({
            idBlock: blockSelected
        });

        if (getServices) {
            if (getServices.data && getServices.data.data) {
                const {services} = getServices.data.data;

                const draftServices = services.map(service => ({
                    key: service.id,
                    edit: service.id,
                    nameService: service.nameService,
                    price: service.price,
                    nameUnit: service.nameUnit,
                    description: service.description
                }));

                setServices(draftServices ? draftServices : []);
            }
        }

        setIsShowLoadingTable(false);
    };

    const onConfirmRemove = async (id) => {
        const removeService = await serviceServices.del({
            id
        });

        if (removeService) {
            if (removeService.data && removeService.data.data) {
                message.success('Xóa dịch vụ thành công!');
                getServices();
                
            } else {
                message.error('Xóa dịch vụ thất bại');
            }
        }
    };

    const onClickEdit = (id) => {

    };

    const onClickAddNew = () => {
        setIsOpenModalCreate(true);
    };

    const onConfirmDelete = () => {
        
    };

    const toggleModalCreate = () => {
        setIsOpenModalCreate(!isOpenModalCreate);
    };

    const callbackModalCreate = () => {
        getServices();
    };

    return (
        <div style={{padding: 10}}>
            <Row>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}}>
                    <Title level={4}>QUẢN LÝ DỊCH VỤ</Title>
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
                    <Table size='small' rowSelection={rowSelection} style={{width: '100%'}} columns={columns} dataSource={services} />
                </Row>
            </Spin>
            <ModalCreate 
                isOpen={isOpenModalCreate}
                toggleModal={toggleModalCreate}
                block={blocks.find(block => block.id === blockSelected)}
                blockServices={services}
                callback={callbackModalCreate}
            />
        </div>
    );
};

Services.propTypes = {
    
};

const mapDispatchToProps = {
    layout
};

function mapStateToProps(state) {
    return {
        blocks: state.Layouts.layoutReducer.blocks
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Services);