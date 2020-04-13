// Libraries
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Typography, Form, Input, Button, message, Row, Col, InputNumber, Select} from 'antd';

// Services
import * as unitServices from 'Src/services/unit';
import * as serviceServices from 'Src/services/servicesMotel';

const ModalUpdate = props => {
    const [form] = Form.useForm();

    // Props
    const {isOpen, toggleModal, callback, block, service} = props;

    // State
    const [units, setUnits] = useState([]);
    const [isShowLoading, setIsShowLoading] = useState(false);

    useEffect(() => {
        getUnits();
    }, []);

    useEffect(() => {
        if (isOpen) {
            form.setFieldsValue({
                price: service.price,
                idUnit: service.idUnit,
                description: service.description
            });
        }
    }, [isOpen]);

    const getUnits = async () => {
        const getUnits = await unitServices.getList();

        if (getUnits) {
            if (getUnits.data && getUnits.data.data) {
                const {units} = getUnits.data.data;

                setUnits(units ? units : []);
            }
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

    const onFinishForm = (value) => {
        updateService(value);
    };

    const updateService = async (value) => {
        setIsShowLoading(true);

        const updateService = await serviceServices.update({
            ...value,
            id: service.key
        });

        if (updateService) {
            if (updateService.data && updateService.data.data) {
                message.success('Cập nhật dịch vụ thành công');
                toggleModal();
                callback();
            }
        }

        setIsShowLoading(false);
      
    };

    const layout = {
        labelCol: {
            xs: {span: 24},
            md: {span: 5}
        },
        wrapperCol: {
            xs: {span: 24},
            md: {span: 19}
        }
    };

    return (
        <Modal
            width={800}
            title={<div className='flex-row' style={{fontSize: 20, color: '#08979c'}}>
                <i className='icon-createmode_editedit' /> &nbsp;
                <strong >Chỉnh sửa</strong>
            </div>}
            forceRender
            destroyOnClose={false} 
            getContainer={false}
            visible={isOpen}
            onOk={onOkModal}
            onCancel={onCanceModal}
            footer={null}
        >
            <Form {...layout} name='modal-update' form={form} onFinish={onFinishForm}>
                <Form.Item
                    label='Tên khu trọ/căn hộ'
                >
                    <strong>{block ? block.nameBlock : null}</strong>
                </Form.Item>
                <Form.Item
                    label='Tên dịch vụ'
                >
                    <strong>{service ? service.nameService : null}</strong>
                </Form.Item>
                <Form.Item
                    label='Mô tả'
                    name='description'
                >
                    <Input.TextArea placeholder='Nhập mô tả' />
                </Form.Item>
                <Row>
                    <Col xs={{span:24}} md={{span: 11, offset: 1}}>
                        <Form.Item
                            label='Đơn giá'
                            name='price'
                            rules={[{required: true, message: 'Vui lòng nhập đơn giá!'}]}
                        >
                            <InputNumber 
                                placeholder='Nhập đơn giá'
                                style={{width: 200}}
                                formatter={value => `₫ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                // eslint-disable-next-line no-useless-escape
                                parser={value => value.replace(/\₫\s?|(,*)/g, '')}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={{span:24}} md={{span: 12}}>
                        <Form.Item
                            label='Đơn vị'
                            name='idUnit'
                        >
                            <Select>
                                {
                                    units.length > 0 ?
                                        units.map(unit => {
                                            return (
                                                <Select.Option key={unit.id} value={unit.id}>
                                                    {unit.name}
                                                </Select.Option>
                                            );
                                        }) : null
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
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

ModalUpdate.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    service: PropTypes.object,
    block: PropTypes.object
};

ModalUpdate.defaultProps = {
    isOpen: false,
    service: {},
    block: {}
};

export default ModalUpdate;