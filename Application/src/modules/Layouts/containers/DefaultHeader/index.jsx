// Libraries
import React, {Component} from 'react';
import {Layout, Button, Avatar, Menu, Divider, Popover, Dropdown} from 'antd';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';

// Icon
import {DingtalkOutlined, BarsOutlined} from '@ant-design/icons';

// Actions
import {layout} from 'Layouts/actions';

// Components
import DrawerUser from './components/DrawerUser';

const {SubMenu} = Menu;

const menu = [
    {
        key: 'dashboard',
        label: 'Trang Quản lý',
        icon: 'icon-dashboard',
        child: [
            {key: 'mainDash', label: 'Quản lý chung', icon: 'icon-view_list'},
            {key: 'rooms', label: 'Quản lý phòng', icon: 'icon-airline_seat_individual_suite'}
        ]
    },
    {
        key: 'finance',
        label: 'Tài chính',
        icon: 'icon-attach_money'
    },
    {
        key: 'bill',
        label: 'Hóa đơn',
        icon: 'icon-money'
    },
    {
        key: 'contract',
        label: 'Hợp đồng',
        icon: 'icon-content_paste'
    },
    {
        key: 'motel',
        label: 'Nhà trọ, căn hộ',
        icon: 'icon-apartment',
        child: [
            {key: 'blocks', label: 'Khu trọ, khu căn hộ',icon: 'icon-house'},
            {key: 'roomMotel', label: 'Phòng', icon: 'icon-airline_seat_individual_suite'},
            {key: 'service', label: 'Dịch vụ', icon: 'icon-room_service'}
        ]
    }
];

const menuHeader = (
    <Menu>
        <Menu.Item>
            <Button type='ghost' shape="round" size='large' style={{background: '#fff'}}>Trang chủ</Button>
        </Menu.Item>
        <Menu.Item>
            <Button type='ghost' shape="round" size='large' style={{background: '#fff'}}>Thông tin</Button>
        </Menu.Item>
        <Menu.Item>
            <Button type='ghost' shape="round" size='large' style={{background: '#fff'}}>Bảng giá</Button>
        </Menu.Item>
        <Menu.Item>
            <Button type='ghost' shape="round" size='large' style={{background: '#fff'}}>Giới thiệu</Button>
        </Menu.Item>
    </Menu>
);

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

    componentDidUpdate(prevProps) {
        if (this.props.isTry !== prevProps.isTry) {
            this.setState({
                isOpenDrawer: true
            });
        }
    }

    onClickItem = (path) => {
        if (path) {
            this.props.layout({
                type: 'path',
                value: path
            });
        }
    }

    showRenderMenu = () => {
        return menu.map(item => {
            if (item.child) {
                return <SubMenu key={item.key} title={
                    <span>
                        <i className={item.icon} /> &nbsp;
                        {item.label}
                    </span>
                }>
                    {item.child.map(child => (
                        <Menu.Item key={child.key} onClick={()=>this.onClickItem(child.key)}>
                            <Link to={`/${child.key}`}>
                                <i className={child.icon} /> &nbsp;
                                {child.label}
                            </Link>
                        </Menu.Item>
                    ))}
                </SubMenu>;
            } else {
                return <Menu.Item key={item.key} onClick={()=>this.onClickItem(item.key)}>
                    <i className={item.icon} /> &nbsp;
                    {item.label}
                </Menu.Item>;
            }
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

    onClickLogout = () => {
        this.props.layout({
            type: 'logout',
            value: {}
        });
        localStorage.removeItem('userInfo');
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
                <div className='flex-row' style={{marginLeft: '20px'}}>
                    <div className='flex-row logo-header'>
                        <DingtalkOutlined 
                            style={{
                                fontSize: 40,
                                color: 'black',
                                paddingRight: '5px',
                                borderRight: '3px solid #fff'
                            }} /> 
                        <div className='title-header'>Vmotel </div>
                        <Divider type='vertical' />
                    </div>
                    {
                        !_.isEmpty(userLogin) ? <Dropdown className='wrap-btn-more' overlay={<Menu selectedKeys={[this.props.path]}>
                            {this.showRenderMenu()}
                        </Menu>} trigger={['click']}>
                            <div className='btn-menu-circle'>
                                <BarsOutlined />
                            </div>
                        </Dropdown>  : null
                    }
                    <Menu mode='horizontal' className='menu-header-home' selectedKeys={[this.props.path]}>
                        { !_.isEmpty(userLogin) ? this.showRenderMenu() : null}
                    </Menu>
                </div>
                <div className='flex-row'>
                    
                    {
                        !_.isEmpty(userLogin) ? <div className='flex-row'>
                            <div style={{fontSize: 15, fontWeight: 600}}>
                                {userLogin.userName}
                            </div>
                            <Popover placement='bottomRight' content={
                                <div className='list-menu-user'>
                                    <div className='item-user'>
                                        <i className='icon-person' style={{marginRight: 5}} />
                                        Thông tin cá nhân
                                    </div>
                                    <div className='item-user'>
                                        <i className='icon-settings' style={{marginRight: 5}} />
                                        Cấu hình chung
                                    </div>
                                    <div  className='item-user'>
                                        <i className='icon-reorder' style={{marginRight: 5}} />
                                        Danh sách dịch vụ
                                    </div>
                                    <div className='item-user'>
                                        <i className='icon-build' style={{marginRight: 5}} />
                                        Công thức
                                    </div>
                                    <div className='item-user' onClick={this.onClickLogout}>
                                        <i className='icon-exit_to_app' style={{marginRight: 5}} />
                                        Đăng xuất
                                    </div>
                                </div>
                            }>
                                <Avatar  size='large' style={{marginLeft: 10, cursor: 'pointer'}} src='https://nguoinoitieng.tv/images/nnt/96/0/bber.jpg' />
                            </Popover>
                        </div> : 
                            <>
                                <div className='flex-row menu-header'>
                                    <Button type='ghost' shape="round" size='large' style={{background: '#fff'}}>Trang chủ</Button> &nbsp;
                                    <Button type='ghost' shape="round" size='large' style={{background: '#fff'}}>Thông tin</Button> &nbsp;
                                    <Button type='ghost' shape="round" size='large' style={{background: '#fff'}}>Bảng giá</Button> &nbsp;
                                    <Button type='ghost' shape="round" size='large' style={{background: '#fff'}}>Giới thiệu</Button> &nbsp;
                                </div>
                                <Dropdown className='wrap-btn-more' overlay={menuHeader} trigger={['click']}>
                                    <div className='btn-menu-circle'>
                                        <BarsOutlined />
                                    </div>
                                </Dropdown>  &nbsp;
                                <Button type='primary' shape="round" className='flex-row' size='large' onClick={this.onClickLoggin}>
                         Dùng Thử
                                </Button>
                            </>
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
        userLogin: state.Layouts.layoutReducer.userLogin,
        isTry: state.Layouts.layoutReducer.isTry
    };
}

const mapDispatchTopProps = {
    layout
};

export default connect(mapStateToProps, mapDispatchTopProps)(DefaultHeader);