// Libraries
import React, {useState, useEffect} from 'react';
import {Form, Input, Button, Radio, Select, notification} from 'antd';
import axios from 'axios';
import PropTypes from 'prop-types';

// Services
import * as userServices from 'Src/services/User/register';

const {Option} = Select;

const propTypes = {
    callback: PropTypes.func.isRequired
};

const sexs = [
    {id: 'male', label: 'Nam'},
    {id: 'female', label: 'Nữ'}
];

const config = {
    SUCCESS: 'Bạn đã đăng ký thành công mời bạn đăng nhập để sử dụng ứng dụng',
    UNIQUE: 'Tên đăng nhập đã tồn tại, xin vui lòng thử tên khác hoặc đăng nhập',
    FAILL:  'Bị lỗi khi đăng ký xin vui lòng thử lại'
};

const Register = (props) => {

    const [isShowLoading, setIsShowLoading] = useState(false);
    const [provinces, setProvinces] = useState([]);

    const layout = {
        labelCol: {span: 24},
        wrapperCol: {span: 24}
    };

    // Call api when component didMount
    useEffect(() => {
        getDataProvincial();
    },[]);

    const getDataProvincial = async () => {
        const getProvincial = await axios({
            method: 'GET',
            url: 'Src/assets/Json/provincial.json'
        });
        
        if (getProvincial) {
            if (getProvincial.data) {
                const {data} = getProvincial;
        
                const newProvinces = data.map(item => ({
                    name: item.province
                }));

                setProvinces(newProvinces);
            }
        }
    };

    const onFinishForm = (values) => {
        const newUser = {
            ...values,
            role: 1
        };

        registerUser(newUser);
    };

    const registerUser = (user) => {
        const createUser = userServices.create(user);

        setIsShowLoading(true);

        if (createUser) {
            createUser.then(res => {
                if (res.data && res.data.data) {
                    notification.success({
                        message: 'Đăng ký thành công!',
                        description: config.SUCCESS
                    });

                    props.callback();
                } else if (res.data.message && res.data.message.code === 'ER_DUP_ENTRY') {
                    notification.error({
                        message: 'Đăng ký thất bại',
                        description: config.UNIQUE
                    });
                }
                else {
                    notification.error({
                        message: 'Đăng ký thất bại',
                        description: config.FAILL
                    });
                }

                setIsShowLoading(false);
            });
        }
    };

    return (
        <Form
            {...layout}
            style={{height: '70vh', overflow: 'auto', paddingRight: 5}}
            className='scroll-bar-hide'
            initialValues={{sex: 'male'}}
            onFinish={onFinishForm}
            name='register'
        >
            <Form.Item
                label={<div style={{fontWeight: 600}}>Họ và tên</div>}
                name='fullName'
                rules={[{required: true, message: 'Hãy nhập tên của bạn!'}]}
            >
                <Input placeholder='Nhập họ và tên' />
            </Form.Item>
            <Form.Item
                label={<div style={{fontWeight: 600}}>Giới tính</div>}
                name='sex'
                rules={[{required: true, message: 'Hãy Chọn giới tính'}]}
            >
                <Radio.Group >
                    {sexs.map(sex => (
                        <Radio key={sex.id} value={sex.id}>{sex.label}</Radio>
                    ))}
                </Radio.Group>
            </Form.Item>
            <Form.Item
                label={<div style={{fontWeight: 600}}>Tên đăng nhập</div>}
                name='userName'
                rules={[
                    {required: true, message: 'Hãy nhập tên đăng nhập'}
                ]}
            >
                <Input placeholder='Nhập tên đăng nhập' />
            </Form.Item>
            <Form.Item
                label={<div style={{fontWeight: 600}}>Email</div>}
                name='email'
                rules={[
                    {
                        type: 'email',
                        message: 'Email không hợp lệ'
                    },
                    {required: true, message: 'Hãy nhập địa chỉ email'}
                ]}
            >
                <Input placeholder='Nhập địa chỉ email' />
            </Form.Item>
            <Form.Item
                label={<div style={{fontWeight: 600}}>Tỉnh</div>}
                name='province'
                rules={[{required: true, message: 'Hãy chọn tỉnh thành'}]}
            >
                <Select
                    showSearch
                    placeholder='Chọn tỉnh thành'
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        provinces.map((province, key) => (
                            <Option key={key} value={province.name}>{province.name}</Option>
                        ))
                    }
                </Select>
            </Form.Item>
            <Form.Item
                label={<div style={{fontWeight: 600}}>Địa chỉ</div>}
                name='address'
                rules={[{required: true, message: 'Hãy nhập địa chỉ'}]}
            >
                <Input placeholder='Hãy nhập địa chỉ' />
            </Form.Item>
            <Form.Item
                name="pass"
                label="Mật khẩu"
                rules={[
                    {
                        required: true,
                        message: 'Hãy nhập mật khẩu!'
                    }
                ]}
                hasFeedback
            >
                <Input.Password placeholder='Hãy nhập mật khẩu' />
            </Form.Item>
            <Form.Item
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={['pass']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Hãy xác nhận mật khẩu!'
                    },
                    ({getFieldValue}) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('pass') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Mật khẩu không trùng khớp với nhau');
                        }
                    })
                ]}
            >
                <Input.Password placeholder='Hãy xác nhận mật khẩu' />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType='submit' block loading={isShowLoading}>
                    Đăng ký
                </Button>
            </Form.Item>
        </Form>
    );

};

export default Register;