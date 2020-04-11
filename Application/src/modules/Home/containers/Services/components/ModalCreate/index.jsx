// Libraries
import React, {memo, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Modal, Typography, Form, Input, Button, message, Row, Col, InputNumber, Checkbox} from 'antd';

// Services
import * as defaultServicesServices from 'Src/services/defaultServices';
import * as serviceServices from 'Src/services/servicesMotel';

const ModalCreate = memo((props) => {
    // Props
    const {isOpen, toggleModal, block, blockServices, callback} = props;

    // State
    const [defaultServices, setDefaultServices] = useState([]);
    const [services, setServices] = useState([]);
    const [isShowLoading, setIsShowLoading] = useState(false);

    useEffect(() => {
        getDefaultServices();
    },[]);

    useEffect(() => {
        const newServices = defaultServices.filter(service => {
            if (!blockServices.some(bService => bService.nameService === service.nameService)) {
                return service;
            }
        });

        setServices(newServices);

    },[blockServices]);

    const onOkModal = () => {
        toggleModal();
    };

    const onCanceModal = () => {
        toggleModal();
    };

    const onClickCancel = () => {
        toggleModal();
    };

    const layout = {
        labelCol: {
            xs: {span: 24},
            md: {span: 4}
        },
        wrapperCol: {
            xs: {span: 24},
            md: {span: 20}
        }
    };

    const getDefaultServices = async() => {
        const getDS = await defaultServicesServices.getList();

        if (getDS) {
            if (getDS.data && getDS.data.data) {
                const {defaultServices} = getDS.data.data;

                setDefaultServices(defaultServices ? defaultServices : []);

            }
        }
    };

    const onFinishForm = (value) => {
        if (defaultServices.length > 0) {
            const {services} = value;

            const newService = defaultServices.filter(dService =>(services.some(service => service === dService.id)));

            const draftService = newService.map(dService => ({
                nameService: dService.nameService,
                price: dService.price,
                idUnit: dService.idUnit,
                description: dService.description,
                idBlock: block.id
            }));

            createServices(draftService);
        }

    };

    const createServices = async(services) => {
        if (services && typeof services === 'object') {
            setIsShowLoading(true);

            const createServices = await serviceServices.create({
                services
            });

            if (createServices) {
                if (createServices.data && createServices.data.data) {
                    message.success('Thêm Dịch vụ thành công!');
                    toggleModal();
                    callback();
                }
                else {
                    message.error('Thêm dịch vụ thất bại');
                }
            }

            setIsShowLoading(false);
        }
      
    };

    return (
        <Modal
            width={800}
            title={<div className='flex-row' style={{fontSize: 20, color: '#08979c'}}>
                <i className='icon-add' /> &nbsp;
                <strong >Thêm mới</strong>
            </div>}
            forceRender
            destroyOnClose={false} 
            getContainer={false}
            visible={isOpen}
            onOk={onOkModal}
            onCancel={onCanceModal}
            footer={null}
        >
            <Form 
                onFinish={onFinishForm}
                name='services-create' 
                {...layout}
                initialValues={{
                    ['services']: [1,2]
                }}
            >
                <Form.Item
                    label='Khu trọ/căn hộ'
                    name='nameBlock'
                >
                    <strong>{block ? block.nameBlock : null}</strong>
                </Form.Item>
                <Form.Item
                    label='Dịch vụ'
                    name='services'
                >
                    <Checkbox.Group style={{width: '50%'}}>
                        <Row>
                            {
                                services.length > 0 ?
                                    services.map(service => {
                                        return (
                                            <Col span={8} key={service.id}>
                                                <Checkbox value={service.id} style={{lineHeight: '32px'}}>
                                                    {service.nameService}
                                                </Checkbox>
                                            </Col>
                                        );
                                    }) : 'Không có dịch vụ nào hiện tại'
                            }
                        </Row>
                    </Checkbox.Group>
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
});

ModalCreate.propTypes = {
    callback: PropTypes.func
};

export default ModalCreate;