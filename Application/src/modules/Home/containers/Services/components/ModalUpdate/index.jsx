import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Typography, Form, Input, Button, message, Row, Col, InputNumber} from 'antd';
import {services} from '../../../../../../services/services';

const ModalUpdate = props => {
    // Props
    const {isOpen, toggleModal, callback, block, service} = props;

    const onOkModal = () => {
        toggleModal();
    };

    const onCanceModal = () => {
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
            <Form {...layout} name='modal-update'>
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
                <Row>
                    <Col xs={{span:24}} md={{span: 12}}>
                        <Form.Item
                            label='Tên khu trọ/căn hộ'
                        >
                            <strong>{block ? block.nameBlock : null}</strong>
                        </Form.Item>
                    </Col>
                    <Col xs={{span:24}} md={{span: 12}} />
                </Row>
            </Form>
        </Modal>
    );
};

ModalUpdate.propTypes = {
    
};

export default ModalUpdate;