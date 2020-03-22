// Libraries
import React, {Component} from 'react';
import {Layout, Avatar, Typography, Badge, Divider} from 'antd';
import {connect} from 'react-redux';

// Icon
import {DingtalkOutlined, UserOutlined, MessageOutlined} from '@ant-design/icons';

// Components
import DrawerUser from './components/DrawerUser';

const {Text} = Typography;

class DefaultHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenDrawer: false
        };
    }

    onClickAvatar = () => {
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
        const {path = ''} = this.props;
        const {isOpenDrawer = false} = this.state;

        return (
            <Layout.Header 
                className='Default-header'
            >
                <div className='flex-row '>
                    <DingtalkOutlined 
                        style={{
                            fontSize: 40,
                            color: '#fff',
                            paddingRight: '5px',
                            borderRight: '3px solid #fff'
                        }} /> 
                    <div className='title-header'>Công cụ quản lý phòng trọ </div>
                   
                </div>
                <div style={{
                    fontSize: 17,
                    fontWeight: 500,
                    color: '#fff'
                }}
                >
                    {path}
                </div>
                <div className='flex-row'>
                    <div className='flex-row mr-10 shop-bag' >
                        <Text className='mr-5' style={{color: '#fff',fontSize: 15}}>Tin nhắn</Text>
                        <Badge count={1} >
                            <MessageOutlined style={{fontSize: 25, color: '#fff'}} />
                        </Badge>
                    </div>
                    <Divider type='vertical' />
                    <div className='name-user'>Truong vi</div>
                    <Avatar onClick={this.onClickAvatar} style={{cursor: 'pointer'}} size="default" icon={<UserOutlined />} />
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
        path: state.Layouts.layoutReducer.path
    };
}

export default connect(mapStateToProps)(DefaultHeader);