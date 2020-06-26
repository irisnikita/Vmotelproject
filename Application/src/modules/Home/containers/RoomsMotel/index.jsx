// Libraries
import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Table,Row,Col, Typography, Tooltip, Spin, Popconfirm, message, Select, Input, InputNumber} from 'antd';
import axios from 'axios';
import numeral from 'numeral';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';

// Actions
import {layout} from 'Layouts/actions';

// Servers
import * as blockServices from 'Src/services/block';
import * as roomServices from 'Src/services/room';

// Components
import RoomModal from './components/RoomModal';
import AddMoreRoom from './components/AddMoreRoom';

// Antd
const {Title} = Typography;
const {Option} = Select;

const RoomsMotel = props => {
    // Props
    const {blocks} = props;

    const [isShowLoadingTable, setIsShowLoadingTable] = useState(false);
    const [blockSelected, setBlockSelected] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [roomModal, setRoomModal] = useState({
        isOpen: false,
        roomEdited: {},
        title: 'Tạo mới',
        type: 'create'
    });
    const [selectedRowKeys, setselectedRowKeys] = useState([]);
    const [isOpenAddMoreRoom, setIsOpenAddMoreRoom] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const rowSelection = {
        selectedRowKeys,
        onChange: (selectedRowsKey) => {
            setselectedRowKeys(selectedRowsKey);
        }
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex, name) => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${name}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon={<SearchOutlined />}
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
              Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
              Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                if (searchInput) {
                    setTimeout(() => searchInput.current.select());
                }
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            )
    });

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
            ...getColumnSearchProps('nameRoom', 'Tên phòng'),
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
            key:'square',
            sorter: (a, b) => a.square - b.square,
            ellipsis: true
        },
        {
            title: 'Đơn giá',
            dataIndex: 'price',
            key:'price',
            sorter: (a, b) => a.price - b.price,
            render: (price) => (<div>
                {numeral(price).format('0,0.00')} vnđ
            </div>)
        },
        {
            title: <div style={{textAlign: 'center'}}>Trạng thái</div>,
            dataIndex: 'status',
            key:'status',
            filterMultiple: false,
            filters: [
                {
                    text: 'Còn trống',
                    value: 0
                },
                {
                    text: 'Đã thuê',
                    value: 1
                }
            ],
            onFilter: (value, record) => value === record.status,
            render: (status) => {
                switch (status) {
                    case 0:
                        return <div className='flex-row-center' style={{color: '#f5222d'}}>
                            <i className='icon-error'  /> &nbsp;
                            Còn trống
                        </div>;
                
                    case 1:
                        return <div className='flex-row-center' style={{color: '#13c2c2'}}>
                            <i className='icon-check_circle' /> &nbsp;
                            Đã thuê
                        </div>;
                
                    default:
                        break;
                }
            }
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key:'description',
            ellipsis: true
        }
    ];

    useEffect(() => {
        props.layout({
            type: 'path',
            value: 'rooms-motel'
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
            roomEdited: room,
            title: 'Chỉnh sửa',
            type: 'edit'
        });
    };

    const onConfirmRemove = async (id) => {
        if (id) {
            const newRooms = rooms.find(room => room.key === id);

            if (newRooms.status === 0) {
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
            } else {
                message.warning('Phòng đang thuê bạn không thể xóa!');
            }
           
        } 
    };

    const onChangeBlocks = (value) => {
        localStorage.setItem('blockSelected',value);
        
        setBlockSelected(value);
        
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
                    status: room.status,
                    codeRoom: room.codeRoom
                }));

                setRooms(draftRooms);
            }

            setIsShowLoadingTable(false);
        }
    };

    const onConfirmDelete = async () => {
        const newRooms = rooms.filter(room => {
            return selectedRowKeys.some(row => row === room.key);
        });

        const isInValid = newRooms.some(room => room.status === 1);

        if (!isInValid) {
            const deleteAll = await roomServices.delAll({
                roomsId: selectedRowKeys
            });

            if (deleteAll) {
                if (deleteAll.data && deleteAll.data.data) {
                    message.success('Xóa thành công');
                    setselectedRowKeys([]);
                    getDataRooms();
                } else {
                    message.error('Xóa thất bại');
                }
            }
        } else {
            const draftRooms = newRooms.filter(room => room.status === 1);

            message.warning(`Có ${draftRooms.length} phòng đang cho thuê, bạn không thể xóa!`);
        }
       
    };

    const onClickAddNew = () => {
        setRoomModal({
            ...roomModal,
            isOpen: true,
            roomEdited: {},
            title: 'Tạo mới',
            type: 'create'
        });
    };

    const toggleRoomModal = () => {
        setRoomModal({
            ...roomModal,
            isOpen: !roomModal.isOpen
        });
    };

    const toggleModalAddMoreRoom = () => {
        setIsOpenAddMoreRoom(!isOpenAddMoreRoom);
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
                <Col xs={{span: 24}} md={{span: 24}} className='flex-row' style={{justifyContent: 'flex-end'}}>
                    <Button disabled={blocks.length > 0 ? false : true} type='primary' className='flex-row' onClick={onClickAddNew} >
                        <i className='icon-add_circle_outlinecontrol_point' /> &nbsp;
                        Thêm mới
                    </Button> &nbsp;
                    <Button onClick={() => {setIsOpenAddMoreRoom(true)}} disabled={blocks.length > 0 ? false : true} type='primary' className='flex-row' >
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
            <img src="" alt="" srcset=""/>
            <Spin spinning={isShowLoadingTable} tip='Loading...'>
                <Row style={{paddingTop: '10px'}}>
                    <Table bordered size='small' rowSelection={rowSelection} style={{width: '100%'}} columns={columns} dataSource={rooms} />
                </Row>
            </Spin>
            <RoomModal
                roomEdited={roomModal.roomEdited}
                title={roomModal.title}
                type={roomModal.type}
                block={blocks.find(block => block.id === blockSelected)}
                isOpen={roomModal.isOpen}
                toggleModal={toggleRoomModal}
                callback={callbackRoomModal}
            />
            <AddMoreRoom 
                isOpen={isOpenAddMoreRoom}
                toggleModal={toggleModalAddMoreRoom}
                block={blocks.find(block => block.id === blockSelected)}
            />
        </div>
    );
};

const mapDispatchToProps = {
    layout
};

function mapStateToProps(state) {
    return {
        blocks: state.Layouts.layoutReducer.blocks
    };
}

RoomsMotel.propTypes = {
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomsMotel);