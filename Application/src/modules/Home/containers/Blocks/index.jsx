// Libraries
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Button, Table,Row,Col, Typography, Tooltip} from 'antd';

// Components
import BlockModal from './components/BlockModal';

// Actions
import {layout} from 'Layouts/actions';

// Antd
const {Title, Text} = Typography;

const Blocks = (props) => {
    // State
    const [blocks, setBlocks] = useState([
        {key: '1', nameBlock: 'Khu tòa a', address: '55.3 Bình Lợi/32', desc: 'Không có gì ngoài tiền'}
    ]);
    const [blockSelected, setBlockSelected] = useState([]);
    const [blockModal, setBlockModal] = useState({
        isOpen: false
    });

    const rowSelection = {

    };

    const columns = [
        {
            title: '',
            dataIndex: 'edit',
            key:'edit',
            width: 100,
            render: ()=> <div className='flex-row-center'>
                <Tooltip title='Sửa'>
                    <Button className='flex-row-center' size='small' shape='circle'>
                        <i className='icon-createmode_editedit' />
                    </Button>
                </Tooltip> &nbsp;
                <Tooltip title='Xóa'>
                    <Button className='flex-row-center' size='small' type='danger' shape='circle'>
                        <i className='icon-highlight_remove' />
                    </Button>
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
    },[]);

    // Toggle BlockModal
    const toggleBlockModal = () => {
        setBlockModal({
            ...blockModal,
            isOpen: !blockModal.isOpen
        });
    };

    const onClickAddNew = () => {
        setBlockModal({
            ...blockModal,
            isOpen: true
        });
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
                    <Button type='danger'>
                        <i className='icon-delete' /> &nbsp;
                        Xóa nhiều
                    </Button>
                </Col>
            </Row>
            <Row style={{padding: 10}}>
                <Table size='small' rowSelection={rowSelection} style={{width: '100%'}} columns={columns} dataSource={blocks} />
            </Row>
            <BlockModal 
                isOpen={blockModal.isOpen}
                toggleModal={toggleBlockModal}
            />
        </>
    );
};

const mapDispatchToProps = {
    layout
};

export default connect(null, mapDispatchToProps)(Blocks);