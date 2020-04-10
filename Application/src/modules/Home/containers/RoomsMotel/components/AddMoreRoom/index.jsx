// Libraries
import React, {useState} from 'react';
import {Modal, Typography, Form, Input, Button, message, Row, Col, InputNumber} from 'antd';
import PropTypes  from 'prop-types';
import {produce} from 'immer';

// Icon
import {PlusOutlined} from '@ant-design/icons';

const AddMoreRoom = (props) => {
    // Props
    const {isOpen, toggleModal, block} = props;

    // State
    const [forms, setForms] = useState([
        {nameRoom: '', floor: '', square: '', price: '', description: '', idBlock: block ? block.id : ''}
    ]);

    const onCanceModal = () => {
        toggleModal();
    };

    const onOkModal = () => {
        toggleModal();
    };

    const layout = {
        labelCol: {
            xs: {span: 24},
            md: {span: 9}
        },
        wrapperCol: {
            xs: {span: 24},
            md: {span: 15}
        }
    };

    const showRenderForm = () => {
        if (forms.length > 0) {
            return forms.map((form, index) => {
                return <Form key={Math.random()} {...layout} >
                    <Row>
                        <Col xs={{span: 24}} md={{span: 12}}>
                            <Form.Item
                                label='Tầng'
                                name='floor'
                            >
                                <InputNumber style={{width: 200}} placeholder='Nhập tầng ví dụ: 1, 2, 3' />
                            </Form.Item>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 12}}>
                            <Form.Item
                                label='Số phòng/tầng'
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
                                label='Số người tối đa/phòng'
                                name='maxPeople'
                                rules={[{required: true, message: 'Hãy nhập số người tối đa'}]}
                            >
                                <InputNumber style={{width: 200}} placeholder='Nhập số người tối đa' />
                            </Form.Item>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 12}}>
                            <Form.Item
                                label='Đơn giá'
                                name='price'
                                rules={[
                                    {required: true, message: 'Hãy nhập đơn giá'}
                                ]}
                            >
                                <InputNumber style={{width: 200}} placeholder='Nhập đơn giá phòng' />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        wrapperCol={{
                            md: {span: 24}
                        }}
                    >
                        <Button className='btn-add-more' htmlType='submit' type="primary" shape="circle" icon={<PlusOutlined />}  />
                    </Form.Item>
                </Form>;
            });
        }
    };

    return (
        <Modal
            width={1000}
            title={<div className='flex-row' style={{fontSize: 20, color: '#08979c'}}>
                <i className={'icon-add'} /> &nbsp;
                <strong >Thêm nhiều</strong>
            </div>}
            forceRender
            destroyOnClose={false} 
            getContainer={false}
            visible={isOpen}
            onOk={onOkModal}
            onCancel={onCanceModal}
            footer={null}
        >
            {showRenderForm()}
        </Modal>
    );
};

AddMoreRoom.propType = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
};

AddMoreRoom.defaultProps = {
    isOpen: false
};

export default AddMoreRoom;