// Libraries
import React, {Component} from 'react';
import {Button, Input, Col, Row, Typography, Select, Divider} from 'antd';
import {connect} from 'react-redux';

// Actions
import {layout} from 'Layouts/actions';

// Icon
import {BankOutlined, UserOutlined, DollarCircleOutlined} from '@ant-design/icons';

const {Title, Text} = Typography;
const {Option} = Select;

class Home extends Component {

    componentDidMount() {
        try {
            this.props.layout({
                type: 'path',
                value: 'Trang chủ'
            });
        } catch (error) {
            //
        }
    }

    render() {

        return (
            <div className='home-content'>
                <div className="site-card-wrapper">
                    <Row gutter={16}>
                        <Col xs={{span: 24}} md={{span: 8}}>
                            <div className='card-info flex-row'>
                                <BankOutlined style={{fontSize: 40, color: ''}} />
                                <div style={{marginLeft: 10}} >
                                    <Title style={{color: '#53caa1'}} level={4} underline>Thông tin phòng</Title>
                                    <Text strong>Tổng số phòng: 30</Text> <br />
                                    <Text strong>Số phòng trống: 30</Text> <br />
                                    <Text strong>Số phòng đã thuê: 30</Text>
                                </div>
                            </div>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 8}}>
                            <div className='card-info violet flex-row'>
                                <UserOutlined style={{fontSize: 40, color: ''}} />
                                <div style={{marginLeft: 10}}>
                                    <Title style={{color: '#dd22c7'}} level={4} underline>Người thuê</Title>
                                    <Text strong>Tổng số người thuê: 30</Text> <br />
                                    <Text strong>Số phòng trống: 30</Text> <br />
                                    <Text strong>Số phòng đã thuê: 30</Text>
                                </div>
                            </div>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 8}}>
                            <div className='card-info orange flex-row'>
                                <DollarCircleOutlined style={{fontSize: 40, color: ''}} />
                                <div style={{marginLeft: 10}}>
                                    <Title style={{color: '#dd7322'}} level={4} underline>Chi phí</Title>
                                    <Text strong>Tiền phòng: 3,000,000 vnd/1 tháng</Text> <br />
                                    <Text strong>Tiền nước: 70,000 vnd/1 tháng</Text> <br />
                                    <Text strong>Tiền mạng: 100,000 vnd/1 tháng</Text> {' '}...
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="main-content">
                    <div className='flex-row pd-tp-10'>
                        <Select defaultValue="all" style={{width: 200}}>
                            <Option value="all">
                                Tất cả
                            </Option>
                            <Option value="empty">
                                Phòng trống
                            </Option>
                            <Option value="hired">
                                Phòng đã thuê
                            </Option>
                        </Select>
                        <Divider type='vertical' />
                        <div className='mr-5 ml-5' style={{fontSize: 15, fontWeight: 600}}>Tìm kiếm theo tên: </div>
                        <Input.Search
                            placeholder="input search text"
                            style={{width: 200}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    layout
};

export default connect(null, mapDispatchToProps)(Home);