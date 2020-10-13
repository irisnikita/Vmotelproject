// Libraries
import React, {Component} from 'react';
import {Layout, Button, Avatar, Menu, Divider, Popover, Dropdown} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from 'lodash';
import {motion} from 'framer-motion';

// Icon
import {DingtalkOutlined, BarsOutlined} from '@ant-design/icons';

// Actions
import {layout} from 'Layouts/actions';

// Components
import DrawerUser from './components/DrawerUser';

const {SubMenu} = Menu;

const icon = {
    hidden: {
        opacity: 0,
        pathLength: 0,
        fill: 'rgba(255, 255, 255, 0)'
    },
    visible: {
        opacity: 1,
        pathLength: 1,
        fill: 'rgba(255, 255, 255, 1)'
    }
};

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
        key: 'bills',
        label: 'Hóa đơn',
        icon: 'icon-money'
    },
    {
        key: 'contracts', 
        label: 'Hợp đồng',
        icon: 'icon-content_paste'},
    {
        key: 'customers',
        label: 'Khách thuê',
        icon: 'icon-supervised_user_circle'
    },
    {
        key: 'motel',
        label: 'Nhà trọ, căn hộ',
        icon: 'icon-apartment',
        child: [
            {key: 'blocks', label: 'Khu trọ, khu căn hộ',icon: 'icon-house'},
            {key: 'rooms-motel', label: 'Phòng', icon: 'icon-airline_seat_individual_suite'},
            {key: 'services', label: 'Dịch vụ', icon: 'icon-room_service'}
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
                                <div className='flex-row' >
                                    <i className={child.icon} style={{fontSize: 15}} /> &nbsp;
                                    {child.label}
                                </div>
                            </Link>
                        </Menu.Item>
                    ))}
                </SubMenu>;
            } else {
                return <Menu.Item key={item.key} onClick={()=>this.onClickItem(item.key)}>
                    <Link to={`/${item.key}`}>
                        <i className={item.icon} /> &nbsp;
                        {item.label}
                    </Link>
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
        this.props.history.push('/');

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
                        <motion.svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 100 100"
                            className="item"
                            variants={icon}
                        >
                            <motion.path
                                d="M0 100V0l50 50 50-50v100L75 75l-25 25-25-25z"
                                initial="hidden"
                                animate="visible"
                                transition={{
                                    default: {duration: 2, ease: 'easeInOut'},
                                    fill: {duration: 2, ease: [1, 0, 0.8, 1]}
                                }}
                            />
                        </motion.svg>
                        <div className='title-header'>Vmotel </div>
                        <Divider type='vertical' />
                    </div>
                    {
                        !_.isEmpty(userLogin) ? <Dropdown className='wrap-btn-more' overlayStyle={{width: '100%'}} overlay={<Menu selectedKeys={[this.props.path]}>
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
                            <Dropdown overlay={<Menu>
                                <Menu.Item className='item-user'>
                                    <i className='icon-person' style={{marginRight: 5}} />
                                        Thông tin cá nhân
                                </Menu.Item>
                                <Menu.Item className='item-user'>
                                    <i className='icon-settings' style={{marginRight: 5}} />
                                        Cấu hình chung
                                </Menu.Item>
                                <Menu.Item  className='item-user'>
                                    <i className='icon-reorder' style={{marginRight: 5}} />
                                        Danh sách dịch vụ
                                </Menu.Item>
                                <Menu.Item className='item-user'>
                                    <i className='icon-build' style={{marginRight: 5}} />
                                        Công thức
                                </Menu.Item>
                                <Menu.Item className='item-user' onClick={this.onClickLogout}>
                                    <i className='icon-exit_to_app' style={{marginRight: 5}} />
                                        Đăng xuất
                                </Menu.Item>
                            </Menu>}>
                                <Avatar  size='large' style={{marginLeft: 10, cursor: 'pointer'}} src='https://nguoinoitieng.tv/images/nnt/96/0/bber.jpg' />
                            </Dropdown>
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

const mapDispatchToProps = {
    layout
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DefaultHeader));