// Libraries
import React, {Component} from 'react';
import {Layout, Typography, Button, Avatar} from 'antd';
import {connect} from 'react-redux';
import _ from 'lodash';

// Icon
import {DingtalkOutlined, UserOutlined, MessageOutlined} from '@ant-design/icons';

// Components
import DrawerUser from './components/DrawerUser';

const {Text} = Typography;

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDrawer: false,
            isHideHeader: false
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', () => {
            this.setState({
                isHideHeader: window.scrollY > 200 ? true : false
            });
            
        });
    }

    onClickLoggin = () => {
        try {
            this.setState({
                isOpenDrawer: true
            });
        } catch (error) {
            //
        }
    }

    toggleDrawer = () => {
        try {
            this.setState({
                isOpenDrawer: !this.state.isOpenDrawer
            });       
                 
        } catch (error) {
            //
        }
    }

    render() {
        const {isOpenDrawer = false, isHideHeader = false} = this.state;
        const {userLogin} = this.props;

        return (
            <Layout.Header 
                className='Default-header'
                style={{boxShadow: isHideHeader ? '0px 2px 3px rgb(212, 212, 212)' : null}}
            >
                <div className='flex-row '>
                    <DingtalkOutlined 
                        style={{
                            fontSize: 40,
                            color: 'black',
                            paddingRight: '5px',
                            borderRight: '3px solid #fff'
                        }} /> 
                    <div className='title-header'>Vmotel </div>
                   
                </div>
                <div className='flex-row'>
                    <Button type='ghost' shape="round" size='large'>Trang chủ</Button> &nbsp;
                    <Button type='ghost' shape="round" size='large'>Thông tin</Button> &nbsp;
                    <Button type='ghost' shape="round" size='large'>Bảng giá</Button> &nbsp;
                    <Button type='ghost' shape="round" size='large'>Giới thiệu</Button> &nbsp;
                    {
                        !_.isEmpty(userLogin) ? <div className='flex-row'>
                            <div style={{fontSize: 15, fontWeight: 600}}>
                                {userLogin.userName}
                            </div>
                            <Avatar  size='large' style={{marginLeft: 10, cursor: 'pointer'}} src='https://nguoinoitieng.tv/images/nnt/96/0/bber.jpg' />
                        </div> : 
                            <Button type='primary' shape="round" className='flex-row' size='large' onClick={this.onClickLoggin}>
                         Dùng Thử
                            </Button>
                    }
                </div>
                <DrawerUser
                    isOpen={isOpenDrawer}
                    toggleDrawer={this.toggleDrawer}
                /> 
            </Layout.Header>
        );
    }
}

function mapStateToProps (state) {
    return {
        path: state.Layouts.layoutReducer.path,
        userLogin: state.Layouts.layoutReducer.userLogin
    };
}

export default connect(mapStateToProps)(DefaultHeader);