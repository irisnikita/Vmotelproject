// Libraries
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Table,Row,Col, Typography, Tooltip, Spin, Popconfirm, message, Select, Input} from 'antd';
import axios from 'axios';
import numeral from 'numeral';

// Actions
import {layout} from 'Layouts/actions';

// Servers
import * as blockServices from 'Src/services/block';
import * as roomServices from 'Src/services/room';

// Components
import RoomModal from './components/RoomModal';

// Antd
const {Title} = Typography;
const {Option} = Select;

const RoomsMotel = props => {

    const [isShowLoadingTable, setIsShowLoadingTable] = useState(false);
    const [blocks, setBlocks] = useState([]);
    const [blockSelected, setBlockSelected] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [roomModal, setRoomModal] = useState({
        isOpen: false,
        roomEdited: {}
    });
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
            title: 'Tầng',
            dataIndex: 'floor',
            key:'floor'
        },
        {
            title: 'Tên phòng',
            dataIndex: 'nameRoom',
            key:'nameRoom'
        },
        {
            title: 'Số người tối đa',
            dataIndex: 'maxPeople',
            key:'maxPeople'
        },
        {
            title: 'Diện tích(m2)',
            dataIndex: 'square',
            key:'square'
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
            title: 'Trạng thái',
            dataIndex: 'status',
            key:'status',
            render: (status) => {
                switch (status) {
                    case 0:
                        return <div>Còn trống</div>;
                
                    case 1:
                        return <div>Đã thuê</div>;
                
                    default:
                        break;
                }
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key:'description'
        }
    ];

    useEffect(() => {
        props.layout({
            type: 'path',
            value: 'rooms-motel'
        });

        getDataBlocks();
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

    useEffect(() => {
        if (blockSelected) {
            
            // Get data rooms
            getDataRooms();
        }

    }, [blockSelected]);

    const onClickEdit = (id) => {
        const room = rooms.find(room => room.key === id);

        setRoomModal({
            ...roomModal,
            isOpen: true,
            roomEdited: room
        });
    };

    const onConfirmRemove = async (id) => {
        if (id) {
            const deleteRoom = await roomServices.del({
                id
            });

            if (deleteRoom) {
                if (deleteRoom.data && deleteRoom.data.data) {
                    message.success('Xóa phòng thành công');
                    
                    getDataRooms();
                } else {
                    message.error('Xóa phòng không thành công');
                }
            }
        } 
    };

    const onChangeBlocks = (value) => {
        localStorage.setItem('blockSelected',value);
        
        setBlockSelected(value);
        
        getDataRooms();
    };

    const getDataRooms = async () => {
        setIsShowLoadingTable(true);

        const getRooms = await roomServices.getList({
            idBlock: blockSelected,
            id:1
        });

        if (getRooms) {
            if (getRooms.data && getRooms.data.data) {
                const {rooms} = getRooms.data.data;

                const draftRooms = rooms.map(room => ({
                    key: room.id,
                    nameRoom: room.nameRoom,
                    edit: room.id,
                    floor: room.floor,
                    square: room.square,
                    price: room.price,
                    description: room.description,
                    maxPeople: room.maxPeople,
                    status: room.status
                }));

                setRooms(draftRooms);
            }

            setIsShowLoadingTable(false);
        }
    };

    const getDataBlocks = () => {
        const getBlocks = blockServices.getList();

        setIsShowLoadingTable(true);

        if (getBlocks) {
            getBlocks.then(res => {
                if (res.data && res.data.data) {
                    const {blocks} = res.data.data;

                    setBlocks(blocks);
                } 
                setIsShowLoadingTable(false);
            });
        }
    };

    const onConfirmDelete = async () => {
        const deleteAll = await roomServices.delAll({
            roomsId: selectedRowKeys
        });

        if (deleteAll) {
            if (deleteAll.data && deleteAll.data.data) {
                message.success('Xóa thành công');
                getDataRooms();
            } else {
                message.error('Xóa thất bại');
            }
        }
    };

    const onClickAddNew = () => {
        setRoomModal({
            ...roomModal,
            isOpen: true,
            roomEdited: {}
        });
    };

    const toggleRoomModal = () => {
        setRoomModal({
            ...roomModal,
            isOpen: !roomModal.isOpen
        });
    };

    const callbackRoomModal = () => {
        getDataRooms();
    };

    return (
        <div style={{padding: 10}}>
            <Row>
                <Col xs={{span: 24, offset: 0}} md={{span: 12, offset: 0}}>
                    <Title level={4}>QUẢN LÝ PHÒNG TRỌ</Title>
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
                <Col xs={{span: 24}} md={{span: 12}}>
                    <Input.Group compact>
                        <Select defaultValue='hello'>
                            <Option value='hello'>Hello</Option>
                        </Select>
                        <Input style={{width: 200}} defaultValue="26888888" />
                    </Input.Group>
                </Col>
                <Col xs={{span: 24}} md={{span: 12}} className='flex-row' style={{justifyContent: 'flex-end'}}>
                    <Button disabled={blocks.length > 0 ? false : true} type='primary' className='flex-row' onClick={onClickAddNew} >
                        <i className='icon-add_circle_outlinecontrol_point' /> &nbsp;
                        Thêm mới
                    </Button> &nbsp;
                    <Button disabled={blocks.length > 0 ? false : true} type='primary' className='flex-row' >
                        <i className='icon-add_circle_outlinecontrol_point' /> &nbsp;
                        Thêm nhiều
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
                    <Table size='small' rowSelection={rowSelection} style={{width: '100%'}} columns={columns} dataSource={rooms} />
                </Row>
            </Spin>
            <RoomModal
                roomEdited={roomModal.roomEdited}
                block={blocks.find(block => block.id === blockSelected)}
                isOpen={roomModal.isOpen}
                toggleModal={toggleRoomModal}
                callback={callbackRoomModal}
            />
        </div>
    );
};

const mapDispatchToProps = {
    layout
};

RoomsMotel.propTypes = {
};

export default connect(null, mapDispatchToProps)(RoomsMotel);