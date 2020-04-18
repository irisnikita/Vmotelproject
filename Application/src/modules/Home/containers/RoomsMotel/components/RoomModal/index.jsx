// Libraries
import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Modal, Typography, Form, Input, Button, message, Row, Col, InputNumber} from 'antd';
import {connect} from 'react-redux';
import _ from 'lodash';

// Components
import UploadImage from 'Src/components/UploadImage';

// Antd
const {TextArea} = Input;

// Constanst
import {appConfig} from 'Src/constant';

// Services
import * as roomServices from 'Src/services/room';
import moment from 'moment';

const RoomsMotel = props => {
    const [form] = Form.useForm();

    // props
    const {isOpen, toggleModal, roomEdited, callback, type, title, block} = props;

    // State
    const [isShowLoading, setIsShowLoading] = useState(false);
    const [imagesEdited, setImagesEdited] = useState([]);
    const [images, setImages] = useState([]);

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

    useEffect(() => {
        if (!_.isEmpty(roomEdited)) {
            if (roomEdited.codeRoom) {
                getRoomImages(roomEdited.codeRoom);
            }
        } else {
            setImagesEdited([]);
        }
    }, [roomEdited]);

    useEffect(() => {
        if (isOpen === true) {
            if (!_.isEmpty(roomEdited)) {
                form.setFieldsValue({
                    nameRoom: roomEdited.nameRoom,
                    maxPeople: roomEdited.maxPeople,
                    description: roomEdited.description,
                    floor: roomEdited.floor,
                    square: roomEdited.square,
                    price: roomEdited.price
                });
            } else {
                form.setFieldsValue({
                    nameRoom: '',
                    maxPeople: '',
                    description: '',
                    floor: '',
                    square: '',
                    price: ''
                });
            }
        }
    }, [isOpen, roomEdited]);

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
                    setImagesEdited(images || []);
                }
            }
        }
    };

    const onFinishForm = (value) =>{
        if (_.isEmpty(roomEdited)) {
            createRoom(value);
        } else {
            updateRoom(value);
        }
    };

    const updateRoom = async (room) => {
        setIsShowLoading(true);

        const updateRoom = await roomServices.update({
            ...room,
            id: roomEdited.key
        });

        if (updateRoom) {
            if (updateRoom.data && updateRoom.data.data) {
                const delImages = await roomServices.delAllImage({
                    codeRoom: roomEdited.codeRoom
                });

                if (delImages) {
                    if (delImages.data && delImages.data.data) {
                        const newImages = images.map(image => ({
                            name: image.response ? image.response.filename : image.name,
                            url: image.response ? `${appConfig.API}/${image.response.path}` : image.url,
                            status: image.status,
                            codeRoom: roomEdited.codeRoom
                        }));
        
                        if (newImages.length > 0) {
                            await roomServices.uploadImage({
                                roomImages: newImages || []
                            });
                        }
                    }
                }
               
                message.success('Cập nhật phòng thành công');
                toggleModal();
                callback();
               
            } else {
                message.error('Cập nhật phòng thất bại');
            }
            setIsShowLoading(false);
        }
    };

    const createRoom = async (room) => {
        const codeRoom = moment().unix();

        let draftRoom = {
            ...room,
            nameBlock: '',
            idBlock: block.id,
            codeRoom,
            status: 0
        };

        setIsShowLoading(true);

        const createRoom = await roomServices.create({
            ...draftRoom
        });

        if (createRoom) {
            if (createRoom.data && createRoom.data.data) {
                const newImages = images.map(image => ({
                    name: image.response ? image.response.filename : image.name,
                    url: image.response ? `${appConfig.API}/${image.response.path}` : image.url,
                    status: image.status,
                    codeRoom
                }));

                if (newImages.length > 0) {
                    await roomServices.uploadImage({
                        roomImages: newImages
                    });
    
                    // if (uploadImage) {
                    //     if (uploadImage.data && uploadImage.data.data) {
                    //         //
                    //     }
                    // }
                }

                message.success('Tạo phòng thành công');
                toggleModal();
                callback();
            }
            else {
                message.error('Tạo phòng thất bại');
            }

            setIsShowLoading(false);
        } 

    };

    const onOkModal = () => {
        toggleModal();
    };

    const onCanceModal = () => {
        toggleModal();
    };

    const onClickCancel = () => {
        toggleModal();
    };

    const callbackUploadImage = (listImages) => {
        setImages(listImages);
    };

    return (
        <Modal
            width={700}
            title={<div className='flex-row' style={{fontSize: 20, color: '#08979c'}}>
                <i className={type === 'create' ? 'icon-add' : 'icon-createmode_editedit'} /> &nbsp;
                <strong >{title}</strong>
            </div>}
            forceRender
            destroyOnClose={false} 
            getContainer={false}
            visible={isOpen}
            onOk={onOkModal}
            onCancel={onCanceModal}
            footer={null}
        >
            <Form form={form} {...layout} name='form-block' onFinish={onFinishForm} labelAlign='left'>
                <Row>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Khu/Tòa nhà'
                            name='nameBlock'
                        >
                            <strong>
                                {block ? block.nameBlock : null}
                            </strong>
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Tên phòng'
                            name='nameRoom'
                            rules={[
                                {required: true, message: 'Hãy nhập tên phòng'}
                            ]}
                        >
                            <Input style={{width: 200}} placeholder='Nhập tên phòng' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Số người tối đa'
                            name='maxPeople'
                            rules={[
                                {required: true, message: 'Hãy nhập số người tối đa'}
                            ]}
                        >
                            <InputNumber style={{width: 200}} min={1} max={10} placeholder='Nhập số người tối đa' />
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Tầng'
                            name='floor'
                            rules={[
                                {required: true, message: 'Hãy nhập tầng'}
                            ]}
                        >
                            <InputNumber  style={{width: 200}} placeholder='Nhập tầng' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Diện tích'
                            name='square'
                            rules={[
                                {required: true, message: 'Hãy nhập diện tích(m2)'}
                            ]}
                        >
                            <InputNumber  style={{width: 200}} min={1} max={100} placeholder='Nhập diện tích' />
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Đơn giá'
                            name='price'
                            rules={[
                                {required: true, message: 'Hãy nhập giá phòng'}
                            ]}
                        >
                            <InputNumber 
                                style={{width: 200}}
                                formatter={value => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                // eslint-disable-next-line no-useless-escape
                                parser={value => value.replace(/\₫\s?|(,*)/g, '')}
                                placeholder='Nhập số tiền' />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Form.Item
                            label='Mô tả'
                            name='description'
                        >
                            <TextArea placeholder='Hãy nhập mô tả' />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label='Tải ảnh phòng'
                >
                    <UploadImage callback={callbackUploadImage} imagesEdited={imagesEdited} isOpen={isOpen} />
                </Form.Item>
                <Form.Item 
                    wrapperCol={{
                        md: {span: 8, offset: 16}
                    }}
                >
                    <div className='flex-row' style={{justifyContent: 'flex-end'}}>
                        <Button onClick={onClickCancel} >Hủy bỏ</Button>&nbsp;
                        <Button htmlType='submit' type='primary' loading={isShowLoading}>Lưu lại</Button> 
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

RoomsMotel.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
};

RoomsMotel.defaultProps = {
    title: 'Thêm mới',
    type: 'create',
    roomEdited: {}
};

export default RoomsMotel;