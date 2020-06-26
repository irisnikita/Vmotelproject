// Libraries
import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {Button, Input, Col, Row, Typography, Select, Divider, Popover, Spin} from 'antd';
import {connect} from 'react-redux';
import numeral from 'numeral';
import * as Sentry from '@sentry/browser';
import _ from 'lodash';

// Components
import ViewRoomModal from 'Src/modules/Home/containers/RoomsMotel/components/ViewRoomModal';

// Services
import * as roomServices from 'Src/services/room';

// Actions
import {layout} from 'Layouts/actions';

// Icon
import {BankOutlined, UserOutlined, DollarCircleOutlined} from '@ant-design/icons';
import {userLogin} from '../Layouts/actions';

const {Title, Text} = Typography;
const {Option} = Select;

const PATH = 'Src/modules/Home/index.jsx';

const Home = (props) => {
    // Props
    const {blocks = []} = props;

    const [rooms, setRooms] = useState([]);
    const [query, setQuery] = useState({
        status: -1,
        idBlock: ''
    });
    const [stateBlocks, setStateBlocks] = useState([{id: -1, nameBlock: 'Tất cả'}]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [roomSelected, setRoomSelected] = useState({});

    useEffect(() => {
        getDataRooms();
    }, [query]);

    useEffect(() => {
        setStateBlocks(stateBlocks.concat(blocks));
    }, [blocks]);

    useEffect(() => {
        try {
            props.layout({
                type: 'path',
                value: 'mainDash'
            });

        } catch (error) {
            //
        }
    });

    useEffect(() => {
        if (stateBlocks.length > 0) {

            // had block in list
            let isHaded = stateBlocks.some(block => block.id === +localStorage.getItem('blockDashSelected'));

            if (localStorage.getItem('blockDashSelected') && isHaded) {
                const defaultBlock = localStorage.getItem('blockDashSelected');

                setQuery({
                    ...query,
                    idBlock: +defaultBlock
                });
            } else {
                setQuery({
                    ...query,
                    idBlock: stateBlocks[0].id
                });
            }

        }

    }, [stateBlocks]);

    const getDataRooms = async () => {
        setIsLoading(true);

        const getRooms = await roomServices.getList({
            status: query.status,
            idBlock: query.idBlock,
            type: 'query'
        });

        if (getRooms) {
            if (getRooms.data && getRooms.data.data) {
                const {rooms = []} = getRooms.data.data;

                const newRooms = _.groupBy(rooms, room => room.status);

                setRooms(newRooms);
            }
        }

        setIsLoading(false);
    };

    const onClickRoom = (room) => {
        setIsOpenModal(true);

        setRoomSelected(room);
    };

    const showRenderRooms = () => {
        if (rooms && Object.keys(rooms).length > 0) {
            return Object.keys(rooms).map(room => {
                const isEmty = rooms[room].some(room => room.status === 0);

                const newRooms = rooms[room].filter(room => room.nameRoom.toLowerCase().indexOf(search.toLowerCase()) > -1);

                return (
                    <React.Fragment key={room}>
                        {newRooms.length > 0 ? <Divider orientation="left">{isEmty ? 'Còn trống' : 'Đã thuê'}</Divider> : null}
                        <Row gutter={16} style={{padding: '10px'}}>
                            {newRooms.length > 0 ?
                                newRooms.map(room => {
                                    return <Col key={room.id} className='flex-row box-room' onClick={() => onClickRoom(room)}>
                                        <div className='status-room' style={{backgroundColor: isEmty ? '#13c2c2' : '#f5222d'}}>
                                            <strong className='name-room'>{room.nameRoom}</strong>
                                            <i style={{fontSize: 40}} className='icon-airline_seat_individual_suite' />
                                            <div className='desc-room'>
                                                <Row style={{width: '100%'}} >
                                                    <Col span={4}><i className='icon-grouppeople' /></Col>
                                                    <Col span={20}>{room.maxPeople}</Col>
                                                </Row>
                                                <Row style={{width: '100%'}} >
                                                    <Col span={4}><i className='icon-attach_money' /></Col>
                                                    <Col span={20}>{numeral(room.price).format('0,0')}</Col>
                                                </Row>
                                            </div>
                                        </div>
                                    </Col>;
                                }) : null
                            }
                        </Row>
                    </React.Fragment>
                );
            });
        } else {
            return <div style={{width: '100%', textAlign: 'center', fontSize: '20px', marginTop: 20}}>Khu trọ này không có phòng</div>;
        }
    };

    const onChangeBlocks = (value) => {
        localStorage.setItem('blockDashSelected', value);

        setQuery({
            ...query,
            idBlock: value
        });
    };

    const onChangeSelectStatus = (value) => {
        setQuery({
            ...query,
            status: value
        });
    };

    const onChangeSearch = (event) => {
        const {value} = event.target;

        setSearch(value);
    };

    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    return (
        <div className='home-content'>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col xs={{span: 24}} md={{span: 8}}>
                        <div className='card-info flex-row' onClick={() => { this.props.history.push('/rooms-motel') }}>
                            <BankOutlined style={{fontSize: 40, color: ''}} />
                            <div style={{marginLeft: 10}} >
                                <Title style={{color: '#53caa1'}} level={4} underline>Thông tin phòng</Title>
                                <Text strong>Tổng số phòng: 30</Text> <br />
                                <Text strong>Số phòng trống: 24</Text> <br />
                                <Text strong>Số phòng đã thuê: 25</Text>
                            </div>
                        </div>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 8}}>
                        <div className='card-info violet-my flex-row'>
                            <UserOutlined style={{fontSize: 40, color: ''}} />
                            <div style={{marginLeft: 10}}>
                                <Title style={{color: '#dd22c7'}} level={4} underline>Người thuê</Title>
                                <Text strong>Tổng số người thuê: 30</Text> <br />
                                <Text strong>Số phòng trống: 30</Text> <br />
                                <Text strong>Số phòng đã thuê: 30</Text>
                            </div>
                        </div>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 8}}>
                        <div className='card-info orange-my flex-row'>
                            <DollarCircleOutlined style={{fontSize: 40, color: ''}} />
                            <div style={{marginLeft: 10}}>
                                <Title style={{color: '#dd7322'}} level={4} underline>Chi phí</Title>
                                <Text strong>Tiền phòng: 3,000,000 vnd/1 tháng</Text> <br />
                                <Text strong>Tiền nước: 70,000 vnd/1 tháng</Text> <br />
                                <Text strong>Tiền mạng: 100,000 vnd/1 tháng</Text> {' '}...
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="main-content">
                <Row style={{marginTop: '20px'}} >
                    <Col xs={{span: 24}} md={{span: 6}} className='mb-5 flex-row'>
                        <div className='mr-5 ml-5' style={{fontSize: 15, fontWeight: 600}}>Trạng thái: </div>
                        <Select defaultValue={-1} style={{width: 200}} onChange={onChangeSelectStatus}>
                            <Option value={-1}>
                                Tất cả
                            </Option>
                            <Option value={0}>
                                Phòng trống
                            </Option>
                            <Option value={1}>
                                Phòng đã thuê
                            </Option>
                        </Select>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 6}} className='flex-row mb-5'>
                        <div className='mr-5 ml-5' style={{fontSize: 15, fontWeight: 600}}>Khu trọ: </div>
                        <Select
                            showSearch
                            value={query.idBlock}
                            style={{width: 200}}
                            placeholder="Chọn khu trọ"
                            onChange={onChangeBlocks}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                stateBlocks.map(block => (
                                    <Option key={block.id} value={block.id}>{block.nameBlock}</Option>
                                ))
                            }
                        </Select>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 7}} className='flex-row mb-5'>
                        <div className='mr-5 ml-5' style={{fontSize: 15, fontWeight: 600}}>Tìm kiếm theo tên: </div>
                        <Input.Search
                            onChange={onChangeSearch}
                            placeholder="Nhập tên phòng trọ"
                            style={{width: 200}}
                        />
                    </Col>
                </Row>
            </div>
            <Spin spinning={isLoading}>
                {showRenderRooms()}
            </Spin>
            <ViewRoomModal isOpen={isOpenModal} toggle={toggleModal} room={roomSelected} />
        </div>
    );
};

function mapStateToProps(state) {
    return {
        blocks: state.Layouts.layoutReducer.blocks
    };
}

const mapDispatchToProps = {
    layout
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);