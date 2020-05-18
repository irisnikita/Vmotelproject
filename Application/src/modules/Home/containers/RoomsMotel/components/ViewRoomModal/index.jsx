import React, {useState, useEffect} from 'react';
import {Modal, Button, Col, Carousel, Row} from 'antd';
import _ from 'lodash';
import numeral from 'numeral';

// Icons
import {AuditOutlined} from '@ant-design/icons';

// Services
import * as roomServices from 'Src/services/room';

const ViewRoomModal = (props) => {
    // Props
    const {isOpen, toggle, room} = props;

    // State
    const [images, setImages] = useState([]);

    const onOkModal = () => {
        toggle();
    };

    const onCancelModal = () => {
        toggle();
    };

    useEffect(() => {
        console.log(images);
    }, [images]);

    useEffect(() => {
        if (!_.isEmpty(room)) {
            getRoomImages(room.codeRoom);
        }
    }, [room]);

    const getRoomImages = async (codeRoom) => {
        if (codeRoom) {
            const getRoomImages = await roomServices.getImages({
                codeRoom
            });

            if (getRoomImages) {
                if (getRoomImages.data && getRoomImages.data.data) {
                    let {images} = getRoomImages.data.data;

                    images = images.map(image => ({
                        uid: image.id,
                        name: image.name,
                        status: image.status,
                        url: image.url
                    }));
                    setImages(images || []);
                }
            }
        }
    };

    return (
        <Modal 
            width={800}
            onOk={onOkModal}
            onCancel={onCancelModal}
            visible={isOpen}
            footer={null}
        >
            <div className='flex-row-center'>
                <Button type='default' shape='circle' className='flex-row-center mr-5' icon={<i className='icon-historyrestore' />} />
                <Button type='default' shape='circle' className='flex-row-center mr-5' icon={<i className='icon-createmode_editedit' />} />
                <Button type='default' shape='circle' className='flex-row-center mr-5' icon={<AuditOutlined />} />
            </div>
            <Row style={{marginTop: '20px'}} gutter={20}>
                <Col span={12}>
                    <Carousel 
                        cssEase='linear' 
                        className='carousel' 
                        autoplay
                    >
                        {images.length > 0 ? images.map(image => {
                            return <img key={image.uid} src={image.url} alt={image.name} />;
                        }) : <h5>Không có ảnh</h5>}
                    </Carousel>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={7} style={{textAlign: 'left'}}><strong>Mã phòng:</strong></Col>
                        <Col span={17}>{room.codeRoom}</Col>
                    </Row>
                    <Row >
                        <Col span={7} style={{textAlign: 'left'}}><strong>Tên phòng:</strong></Col>
                        <Col span={17}>{room.nameRoom}</Col>
                    </Row>
                    <Row>
                        <Col span={7} style={{textAlign: 'left'}}><strong>Tầng:</strong></Col>
                        <Col span={17}>{room.floor}</Col>
                    </Row>
                    <Row>
                        <Col span={7} style={{textAlign: 'left'}}><strong>Số người tối đa:</strong></Col>
                        <Col span={17}>{room.maxPeople}</Col>
                    </Row>
                    <Row>
                        <Col span={7} style={{textAlign: 'left'}}><strong>Diện tích:</strong></Col>
                        <Col span={17}>{room.square}</Col>
                    </Row>
                    <Row>
                        <Col span={7} style={{textAlign: 'left'}}><strong>Đơn giá:</strong></Col>
                        <Col span={17}>{numeral(room.price).format(0,0)} vnđ</Col>
                    </Row>
                    <Row>
                        <Col span={7} style={{textAlign: 'left'}}><strong>Mô tả:</strong></Col>
                        <Col span={17}>{room.description}</Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    );
};

export default ViewRoomModal;