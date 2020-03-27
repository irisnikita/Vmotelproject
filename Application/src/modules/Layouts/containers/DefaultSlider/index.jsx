// Libraries
import React, {Component} from 'react';
import {Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';

// Icon
import {HomeOutlined, UnorderedListOutlined} from '@ant-design/icons';

const {SubMenu} = Menu;

class DefaultSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
            menuSelected: ['home']
        };
    }

    onSelectMenuItem = (value) => {
        try {
            const {key} = value;
            
            if (key) {
                let {menuSelected} = this.state;
    
                menuSelected = [key];
    
                this.setState({menuSelected});
            }

        } catch (error) {
            //
        }
    }

    render() {
        const {menuSelected} = this.state;

        return (
            <Layout.Sider className='default-slider' >
                <Menu
                    onSelect={this.onSelectMenuItem}
                    selectedKeys={menuSelected}
                    mode='inline'
                    style={{height: '100%'}}
                >
                    <div 
                        className='flex-row slider-title'
                    >
                        Danh mục
                    </div>
                    <Menu.Item key='home' >
                        <Link to='/home'>
                            <HomeOutlined style={{fontSize: 20}} /> &nbsp;
                            Trang chủ
                        </Link>
                    </Menu.Item>
                    <SubMenu key='subRooms'
                        title = {
                            <div className='flex-row'>
                                <i className='icon-hotellocal_hotel' style={{fontSize: 22}} /> &nbsp;
                                Danh mục phòng
                            </div>
                        }
                    >
                        <Menu.Item key='rooms'>
                            <Link to='/rooms'>
                                <UnorderedListOutlined /> &nbsp;
                            Danh sách phòng
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Layout.Sider>
        );
    }
}

export default DefaultSlider;