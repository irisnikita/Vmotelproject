// Libraries
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Table,Row,Col, Typography, Tooltip, Spin, Popconfirm, message} from 'antd';

// Components
import BlockModal from './components/BlockModal';

// Actions
import {layout} from 'Layouts/actions';

// Servers
import * as blockServices from 'Src/services/block';

// Antd
const {Title, Text} = Typography;

const Blocks = (props) => {
    // State
    const [blocks, setBlocks] = useState([]);
    const [blockModal, setBlockModal] = useState({
        isOpen: false,
        blockEdited: {}
    });
    const [isShowLoadingTable, setIsShowLoadingTable] = useState(false);
    const [selectedRowKeys, setselectedRowKeys] = useState([]);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowsKey) => {
            setselectedRowKeys(selectedRowsKey);
        }
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
            title: 'Tên khu/Tòa nhà',
            dataIndex: 'nameBlock',
            key:'nameBlock'
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key:'address'
        },
        {
            title: 'Mô tả',
            dataIndex: 'desc',
            key:'desc'
        }
    ];

    // Component DidMount 
    useEffect(() => {
        props.layout({
            type: 'path',
            value: 'blocks'
        });

        // Call api get blocks
        getDataBlocks();
    },[]);

    // Toggle BlockModal
    const toggleBlockModal = () => {
        setBlockModal({
            ...blockModal,
            isOpen: !blockModal.isOpen
        });
    };

    const onConfirmRemove = (id) => {
        let deleteBlock = blockServices.del({
            id
        });

        if (deleteBlock) {
            deleteBlock.then(res => {
                if (res.data && res.data.data) {
                    message.success('Xóa khu trọ/căn hộ thành công');
                    
                    getDataBlocks();
                } else {
                    message.error('Xóa khu trọ/căn hộ thất bại!');
                }
            });
        }
    };

    const onClickAddNew = () => {
        setBlockModal({
            ...blockModal,
            blockEdited: {},
            isOpen: true
        });
    };

    const getDataBlocks = () => {
        const getBlocks = blockServices.getList();

        setIsShowLoadingTable(true);

        if (getBlocks) {
            getBlocks.then(res => {
                if (res.data && res.data.data) {
                    const {blocks} = res.data.data;

                    const draftBlocks = blocks.map(block => ({
                        key: block.id,
                        edit: block.id,
                        nameBlock: block.nameBlock,
                        address: block.address,
                        desc: block.descreption
                    }));

                    setBlocks(draftBlocks);
                } 
                setIsShowLoadingTable(false);
            });
        }
    };

    const onClickEdit = (id) => {
        let editedBlock = blocks.find(block => block.key === id);

        setBlockModal({
            ...blockModal,
            isOpen: true,
            blockEdited: editedBlock
        });
    };

    const onConfirmDeleteAll = () => {
        let deleteAll = blockServices.delAll({
            blocksId: selectedRowKeys
        });

        if (deleteAll) {
            deleteAll.then(res => {
                if (res.data && res.data.data) {
                    message.success('Xóa thành công!');
                    setselectedRowKeys([]);
                    getDataBlocks();
                } else {
                    message.error('Xóa không thành công!');
                }
            });
        }
    };

    const callbackBlockModal = () => {
        getDataBlocks();
    };

    return (
        <>
            <Row style={{padding: 10}}>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}}>
                    <Title level={4}>QUẢN LÝ DANH SÁCH NHÀ TRỌ</Title>
                </Col>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}} style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button type='primary' className='flex-row' onClick={onClickAddNew}>
                        <i className='icon-add_circle_outlinecontrol_point' /> &nbsp;
                        Thêm mới
                    </Button> &nbsp;
                    <Popconfirm
                        placement="bottom"
                        title={`Bạn có muốn xóa ${selectedRowKeys.length} khu trọ/căn hộ này?`}
                        onConfirm={onConfirmDeleteAll}
                        okText='Xóa'
                        cancelText='Hủy'
                    >
                        <Button type='danger' disabled={selectedRowKeys.length > 0 ? false : true}>
                            <i className='icon-delete' /> &nbsp;
                            Xóa nhiều
                        </Button>
                    </Popconfirm>
                </Col>
            </Row>
            
            <Spin spinning={isShowLoadingTable} tip='Loading...'>
                <Row style={{padding: 10}}>
                    <Table size='small' rowSelection={rowSelection} style={{width: '100%'}} columns={columns} dataSource={blocks} />
                </Row>
            </Spin>
            <BlockModal 
                blockEdited={blockModal.blockEdited}
                isOpen={blockModal.isOpen}
                toggleModal={toggleBlockModal}
                callback={callbackBlockModal}
            /> 
        </>
    );
};

const mapDispatchToProps = {
    layout
};

export default connect(null, mapDispatchToProps)(Blocks);