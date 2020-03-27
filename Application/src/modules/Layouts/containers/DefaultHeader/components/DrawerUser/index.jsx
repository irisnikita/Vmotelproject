// Libraries
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Drawer, Form, Button, Col, Row, Input, Tabs, Checkbox, Typography, message} from 'antd';
import {connect} from 'react-redux';

// Components
import Register from 'Layouts/containers/DefaultHeader/components/Register';

// Icons
import {UserOutlined, LockOutlined} from '@ant-design/icons';

// Actions
import {layout} from 'Layouts/actions';

// Services
import * as userService from 'Src/services/User/login';

const defaultProps = {
    isOpen: false
};

const propTypes = {
    isOpen: PropTypes.bool,
    toggleDrawer: PropTypes.func.isRequired
};

const {TabPane} = Tabs;
const {Text} = Typography;

class DrawerUser extends Component {
    _isMounted = false

    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,
            activeKeyTab: '1'
        };
    }

    componentDidMount() {
        try {
            this._isMounted = true;
        } catch (error) {
            //
        }
    }

    onClose = () => {
        try {
            this.props.toggleDrawer();
        } catch (error) {
            //
        }
    }

    onFinishLogin =  (value) => {
        try {
            const {userName, pass} = value;

            this.setState({
                isShowLoading: true
            });

            let createLogin =  userService.create({
                userName,
                pass
            });

            if (createLogin) {
                createLogin.then(res => {
                    if (res.data && res.data.data) {
                        const {data} = res.data;

                        localStorage.setItem('userInfo', JSON.stringify(data));

                        this.props.layout({
                            type: 'login',
                            value: data.user
                        });
                        message.success('Đăng nhập thành công');
                    }
                    else {
                        message.error(res.data.message);
                    }
                    setTimeout(() => {
                        this.setState({isShowLoading: false}); 
                    }, 500);
                });

            }
               
        } catch (error) {
            //
        }
    }

    callbackRegister = () => {
        this.setState({
            activeKeyTab: '1'
        });
    }

    onChangeTabs = (value) => {
        if (value) {
            this.setState({
                activeKeyTab: value
            });
        }
    }

    componentWillUnmount() {
        try {
            this._isMounted = false;
        } catch (error) {
            //
        }
    }

    render() {
        const {isOpen = false} = this.props;
        const {isShowLoading, activeKeyTab} = this.state;

        return (
            <Drawer
                destroyOnClose={true}
                title='Xin chào quý khách !'
                width={300}
                onClose={this.onClose}
                visible={isOpen}
            >
                <Tabs 
                    activeKey={activeKeyTab}
                    onChange={this.onChangeTabs}>
                    <TabPane tab='Đăng nhập' key='1'> 
                        <Form onFinish={this.onFinishLogin}>
                            <Form.Item
                                style={{marginBottom: 5}}
                                label={<div style={{fontWeight: 600}}>Tên đăng nhập</div>}
                                name="userName"
                                rules={[
                                    {required: true, message: 'Xin vui lòng nhập Tên đăng nhập'}
                                ]}
                            >
                                <Input style={{width: 250}} prefix={<UserOutlined />} placeholder='Nhập tên đăng nhập' />
                            </Form.Item>
                            <Form.Item
                                label={<div style={{fontWeight: 600}}>Mật khẩu</div>}
                                name="pass"
                                rules={[
                                    {required: true, message: 'Xin vui lòng nhập mật khẩu'}
                                ]}
                            >
                                <Input.Password 
                                    style={{width: 250}}
                                    type='password'
                                    prefix={<LockOutlined />} 
                                    placeholder='Nhập mật khẩu'
                                />
                            </Form.Item>
                            <Form.Item>
                                <div className='flex-row' style={{justifyContent:'space-between'}}>
                                    <Checkbox checked={true}>
                                        Ghi nhớ
                                    </Checkbox>
                                    <Text className='forgot' underline>Quên mật khẩu?</Text>
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType='submit' block loading={isShowLoading}>
                                Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                    </TabPane>
                    <TabPane tab='Đăng ký' key='2'>
                        <Register 
                            callback={this.callbackRegister}
                        />
                    </TabPane>
                </Tabs>
            </Drawer>
        );
    }
}

DrawerUser.defaultProps = defaultProps;
DrawerUser.propTypes = propTypes;

const mapDispatchToProps = {
    layout
};

export default connect(null, mapDispatchToProps)(DrawerUser);