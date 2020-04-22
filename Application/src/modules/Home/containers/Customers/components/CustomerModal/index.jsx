// Libraries
import React, {useState, useEffect} from 'react';
import PropTypes, {number} from 'prop-types';
import {Modal, Typography, Form, Input, Checkbox, Button, Radio, message, DatePicker, Row, Col, InputNumber, Select} from 'antd';
import moment from 'moment';
import _ from 'lodash';

// Services
import * as customerServices from 'Src/services/customer';

// Components
import Upload from 'Src/components/Upload/Upload.jsx';

// Utils
import {fortmatName} from 'Src/utils';

// Constant
import {appConfig} from 'Src/constant';

const DATE_FORMAT = 'DD/MM/YYYY';
const JOBS = ['Sinh viên', 'Người đi làm'];

const CustomerModal = props => {
    const [form] = Form.useForm();

    // Props
    const {isOpen, type, title, toggle, customerEdited} = props;

    // State
    const [isTempReg, setIsTempReg] = useState(false);
    const [isShowLoading, setIsShowLoading] = useState(false);
    const [images, setImages] = useState({
        avatar: '',
        identifyFront: '',
        identifyBack: ''
    });

    useEffect(() => {
        if (isOpen === true) {
            if (!_.isEmpty(customerEdited)) {
                form.setFieldsValue({
                    fullName: customerEdited.fullName,
                    dateBirth: moment(customerEdited.dateBirth),
                    email: customerEdited.email,
                    phoneNumber: customerEdited.phoneNumber,
                    sex: customerEdited.sex,
                    job: customerEdited.job,
                    workPlace: customerEdited.workPlace,
                    note: customerEdited.note
                });

                setImages({
                    avatar: customerEdited.avatar || '',
                    identifyFront: customerEdited.identifyFront || '',
                    identifyBack: customerEdited.identifyBack || ''
                });

                setIsTempReg(customerEdited.tempReg);
            } else {
                form.setFieldsValue({
                    fullName: '',
                    dateBirth: moment(new Date(), DATE_FORMAT),
                    email: '',
                    sex: appConfig.SEXS[0].id,
                    phoneNumber: '',
                    job: '',
                    workPlace: '',
                    note: ''
                });

                setImages({
                    avatar: '',
                    identifyFront:  '',
                    identifyBack: ''
                });

                setIsTempReg(false);
            }
        }
    }, [isOpen, customerEdited]);

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

    const onChangePhoneNumber = (event) => {
        let {value} = event.target;

        value = value.replace(/[^0-9]/g, '');

        form.setFieldsValue({
            phoneNumber: value
        });
    };

    const onOkModal = () => {
        toggle();
    };

    const onCanceModal = () => {
        toggle();
    };

    const onFinishForm = (value) => {
        const newUser = {
            ...value,
            dateBirth: moment(value.dateBirth).format('YYYY-MM-DD'),
            tempReg: isTempReg ? 1 : 0,
            avatar: images.avatar,
            identifyBack: images.identifyBack,
            identifyFront: images.identifyFront,
            codeUser: '#' + moment().unix()
        };

        if (_.isEmpty(customerEdited)) {
            createCustomer(newUser);
        }
        else {
            updateCustomer(newUser);
        }
    };

    const updateCustomer = async (user) => {
        setIsShowLoading(true);

        const updateCustomer = await customerServices.update({
            id: customerEdited.id,
            ...user
        });

        if (updateCustomer) {
            if (updateCustomer.data && updateCustomer.data.data) {
                message.success('Cập nhật khách hàng thành công');
                
                toggle();

                props.callback();
            } else {
                message.error('Cập nhật khách hàng thất bại');
            }
        }

        setIsShowLoading(false);
    };

    const createCustomer = async (user) => {
        setIsShowLoading(true);

        const createCustomer = await customerServices.create({
            ...user
        });

        if (createCustomer) {
            if (createCustomer.data && createCustomer.data.data) {
                message.success('Tạo khách hàng thành công');
                toggle();

                props.callback();
            } else {
                const messageRes = createCustomer.data.message;

                if (messageRes.code) {
                    switch (messageRes.code) {
                        case 'ER_DUP_ENTRY':
                            message.error('Tên khách hàng đã có, xin vui lòng thử lại!');
                            break;
                    
                        default:
                            message.error('Tạo khách hàng thất bại');
                            break;
                    }
                } else {
                    message.error('Tạo khách hàng thất bại');
                }
               
            }
        }

        setIsShowLoading(false);
    };

    const onChangeTempReg = (event) => {
        const {checked} = event.target;
        
        setIsTempReg(checked);
    };

    const callbackUpload = (urlImage, key) => {
        setImages({
            ...images,
            [key]: urlImage
        });
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
            <Form 
                form={form} {...layout} 
                name='form-customer' 
                onFinish={onFinishForm} 
                labelAlign='left'
                initialValues={{
                    dateBirth: moment(new Date(), DATE_FORMAT),
                    sex: appConfig.SEXS[0].id
                }}
            >
                <Row gutter={16}>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Tên khách thuê'
                            name='fullName'
                            rules={[
                                {required: true, message: 'Hãy nhập tên khách thuê'}
                            ]}
                        >  
                            <Input placeholder='Nhập tên khách thuê' /> 
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Số điện thoại'
                            name='phoneNumber'
                            rules={[
                                {required: true, message: 'Hãy nhập số điện thoại'}
                            ]}
                        >  
                            <Input placeholder='Nhập số điện thoại' onChange={onChangePhoneNumber} /> 
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Ngày sinh'
                            name='dateBirth'
                            rules={[
                                {required: true, message: 'Hãy chọn ngày sinh'}
                            ]}
                        >  
                            <DatePicker 
                                format={DATE_FORMAT}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Địa chỉ email'
                            name='email'
                            rules={[
                                {type: 'email', message: 'Vui lòng nhập đúng địa chỉ email'}
                            ]}
                        >  
                            <Input placeholder='Nhập địa chỉ email' /> 
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Nghề nghiệp'
                            name='job'
                        >  
                            <Radio.Group>
                                {
                                    JOBS.map(job => (
                                        <Radio key={job} value={job}>
                                            {job}
                                        </Radio>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Nơi công tác'
                            name='workPlace'
                        >  
                            <Input placeholder='Nhập nơi công tác' /> 
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Giới tính'
                            name='sex'
                        >  
                            <Radio.Group>
                                {
                                    appConfig.SEXS.map(sex => (
                                        <Radio key={sex.id} value={sex.id}>
                                            {sex.value}
                                        </Radio>
                                    ))
                                }
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                    <Col xs={{span: 24}} md={{span: 12}}>
                        <Form.Item
                            label='Đăng ký tạm trú'
                            name='tempReg'
                        >  
                            <Checkbox checked={isTempReg} onChange={onChangeTempReg}>Đăng ký</Checkbox>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    label='Ghi chú'
                    name='note'
                >
                    <Input.TextArea placeholder='Nhập ghi chú' />
                </Form.Item>
                <Row style={{marginBottom: 20}}>
                    {
                        Object.keys(images).map(key => {
                            return (
                                <Col key={key} xs={{span:24}} md={{span: 8}} className='flex-cloumn-center'>
                                    <div>{fortmatName(key)}</div>
                                    <Upload imageEdited={images[key]} callback={(urlImage) => callbackUpload(urlImage, key)} />
                                </Col>
                            );
                        })
                    }
                </Row>
                <Form.Item 
                    wrapperCol={{
                        md: {span: 8, offset: 16}
                    }}
                >
                    <div className='flex-row' style={{justifyContent: 'flex-end'}}>
                        <Button onClick={()=> {toggle()}} >Hủy bỏ</Button>&nbsp;
                        <Button htmlType='submit' type='primary' loading={isShowLoading}>Lưu lại</Button> 
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

CustomerModal.defaultProps = {
    isOpen: false,
    type: 'create',
    title: 'Tạo khách hàng mới',
    customer: {}
};

CustomerModal.propTypes = {
    
};

export default CustomerModal;