// Libraries
import React, {useState, useEffect} from 'react';
import {Modal, Typography, Form, Input, Button, message} from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

// Services
import * as blockServices from 'Src/services/block';

const defaultProps = {
    title: 'Thêm mới',
    type: 'create',
    blockEdited: {}
};

const propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    blockEdited: PropTypes.object
};

// Antd
const {Text, Title} = Typography;
const {TextArea} = Input;

let BlockModal = (props) => {
    const [form] = Form.useForm();

    // Props
    const {isOpen, toggleModal,title, type, userLogin, blockEdited} = props;

    // State
    const [isShowLoading, setIsShowLoading] = useState(false);
  
    useEffect(() => {
        if (!_.isEmpty(blockEdited)) {
            form.setFieldsValue({
                nameBlock: blockEdited.nameBlock,
                address: blockEdited.address,
                descreption: blockEdited.desc
            });
        } else {
            form.setFieldsValue({
                nameBlock: '',
                address: '',
                descreption: ''
            });
        }
    },[isOpen,blockEdited]);

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
        if (_.isEmpty(blockEdited)) {
            createBlock(value);
        } else {
            updateBlock(value);
        }
    };

    const updateBlock = (block) => {
        setIsShowLoading(true);

        let updateBlock = blockServices.update({
            id: blockEdited.key,
            ...block
        });

        if (updateBlock) {
            updateBlock.then(res => {
                if (res.data && res.data.data) {
                    message.success('Cập nhật thành công!');
                    toggleModal();
                    props.callback();
                } else {
                    message.error('Cập nhật thất bại!');
                }
                setIsShowLoading(false);
            });
        }
    };

    const createBlock = (block) => {

        if (userLogin.id) {
            setIsShowLoading(true);

            let createBlock = blockServices.create({
                ...block,
                idOwner: userLogin.id
            });

            if (createBlock) {
                createBlock.then(res => {
                    if (res.data && res.data.data) {
                        message.success('Tạo khu trọ thành công!');
                        toggleModal();
                        props.callback();
                        
                    } else {
                        message.error('Tạo khu trọ thất bại! Xin vui lòng thử lại');
                    }
                    setIsShowLoading(false);
                });
            }
        }
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
            <Form {...layout} form={form} name='form-block' onFinish={onFinishForm}>
                <Form.Item
                    label='Tên khu/Tòa nhà'
                    name='nameBlock'
                    rules={[
                        {required: true, message: 'Hãy nhập tên khu trọ/căn hộ'}
                    ]}
                >
                    <Input placeholder='Nhập tên khu trọ/căn hộ' />
                </Form.Item>
                <Form.Item
                    label='Địa chỉ'
                    name='address'
                    rules={[
                        {required: true, message: 'Hãy nhập Địa chỉ khu trọ/căn hộ'}
                    ]}
                >
                    <TextArea placeholder='Hãy nhập Địa chỉ khu trọ/căn hộ' />
                </Form.Item>
                <Form.Item
                    label='Mô tả'
                    name='descreption'
                >
                    <TextArea placeholder='Hãy nhập mô tả' />
                </Form.Item>
                <Form.Item 
                    wrapperCol={{
                        md: {span: 8, offset: 16}
                    }}
                >
                    <div className='flex-row' style={{justifyContent: 'flex-end'}}>
                        <Button onClick={onClickCancel}>Hủy bỏ</Button>&nbsp;
                        <Button htmlType='submit' type='primary' loading={isShowLoading}>Lưu lại</Button> 
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

function mapStateToProps(state) {
    return {
        userLogin: state.Layouts.layoutReducer.userLogin
    };
}

BlockModal.propTypes = propTypes;
BlockModal.defaultProps = defaultProps;

export default connect(mapStateToProps)(BlockModal);