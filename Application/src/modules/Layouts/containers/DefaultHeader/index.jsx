// Libraries
import React, {Component} from 'react';
import {Layout, Avatar, Typography, Badge, Divider, Button} from 'antd';
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
                    <Button type='dashed' className='flex-row' onClick={this.onClickLoggin}>
                        Sử dụng
                        <UserOutlined />
                    </Button> &nbsp;
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