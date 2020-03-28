// Libraries
import React, {Component} from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import {Row, Col, Typography} from 'antd';
import CountUp from 'react-countup';

// img
import hero_right from 'Src/assets/images/hero/hero_right.png';

const {Title} = Typography;

class Introduce extends Component {
    isMounted = false

    state = {
        isLoadingHome: true,
        isShowCountUp: false
    }

    componentDidMount() {
        window.addEventListener('scroll',() => {
            if (this.refRow.offsetTop < window.scrollY) {
                this.setState({isShowCountUp: true});
            }
        });

        this.isMounted = true;
        setTimeout(() => {
            if (this.isMounted === true) {
                this.setState({
                    isLoadingHome: false
                });
            }
        }, 3000);
    }
 
    componentWillUnmount() {
        this.isMounted = false;
    }

    render() {
        const {isLoadingHome, isShowCountUp} = this.state;

        return (
            <div className='intro-page'>
                <Row style={{display: 'flex', alignItems: 'center'}}>
                    <Col xs={{span: 24, offset: 0}} md={{span: 8, offset: 4}} >
                        <ScrollAnimation animateIn='fadeInLeft'>
                            <Title>
                            Vmotel <br /> Manager Tool
                            </Title>
                            <div className='text-grey'>
                            Vmotel là ứng dụng quản lý khu căn hộ nhà trọ tiện lợi đa dụng 
                            và dễ dàng sử dụng. Giải quyết vấn đề khó khăn chủ trọ gặp phải.<br />
                            Thiết kế đơn giản, dể dàng sử dụng, tối đa chi phí.
                            </div>
                            <br />
                            <div className='button-intro animated infinite tada slow'>
                            Dùng thử miễn phí
                            </div>
                            
                        </ScrollAnimation>
                    </Col>
                    <Col xs={{span: 24, offset: 0}} md={{span: 8, offset: 2}}>
                        <ScrollAnimation animateIn='fadeInRight'>
                            <img src={hero_right} width='500px' />
                        </ScrollAnimation>
                    </Col>
                </Row>
                <ScrollAnimation animateIn='bounceInLeft' >
                    <Row style={{marginTop: 100, alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
                        <Title>Bạn đang kinh doanh nhà trọ, căn hộ dịch vụ?</Title>
                        <Col xs={{span: 24, offset: 0}} md={{span: 18}}>
                            <div className='text-grey' style={{textAlign: 'center'}} >
                    Cho thuê nhà trọ, căn hộ là loại hình kinh doanh khá hấp dẫn vì có tiềm năng lớn, nhu cầu cao, doanh thu ổn định và an toàn. Tuy nhiên, lĩnh vực kinh doanh này cũng có khá nhiều khó khăn khiến không ít chủ trọ,
                     chủ căn hộ phải đối mặt với nhiều rủi ro về tài chính cũng như hiệu quả quản lý.
                            </div>
                        </Col>
                    </Row>
                </ScrollAnimation>
                <ScrollAnimation animateIn='fadeInUp' duration={1} >
                    <Row style={{marginTop: '20px'}}>
                        <Col xs={{span: 24, offset: 0}} md={{span: 6, offset: 2}}>
                            <div className='item-problem' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <i style={{fontSize: '40px'}} className='icon-access_timequery_builderschedule' />
                                <Title level={4} style={{marginTop: '10px'}}>Thời gian</Title>
                                <div className='text-grey' style={{textAlign: 'center', marginTop: '10px'}}>
                            Bạn tốn nhiều thời gian cho việc giám sát, quản lý cơ sở, khách thuê, chi phí.
                                </div>
                            </div>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 6, offset: 1}} >
                            <div className='item-problem' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <i style={{fontSize: '40px'}} className='icon-attach_money' />
                                <Title level={4} style={{marginTop: '10px'}}>Chi phí</Title>
                                <div className='text-grey' style={{textAlign: 'center', marginTop: '10px'}}>
                            Bạn đau đầu vì có quá nhiều chi phí phát sinh trong quá trình kinh doanh.
                                </div>
                            </div>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 6, offset: 1}} >
                            <div className='item-problem' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <i style={{fontSize: '40px'}} className='icon-person' />
                                <Title level={4} style={{marginTop: '10px'}}>Công tác Quản lý</Title>
                                <div className='text-grey' style={{textAlign: 'center', marginTop: '10px'}}>
                            Bạn đau đầu khi suốt ngày phải đi xử lý sự cố, hợp đồng, các thủ tục pháp lý, hóa đơn.
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '20px'}}>
                        <Col xs={{span: 24, offset: 0}} md={{span: 6, offset: 2}}>
                            
                            <div className='item-problem' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <i style={{fontSize: '40px'}} className='icon-fingerprint' />
                                <Title level={4} style={{marginTop: '10px'}}>Rủi ro quản lý</Title>
                                <div className='text-grey' style={{textAlign: 'center', marginTop: '10px'}}>
                            Tình trạng khó khăn trong việc quản lý các khoản hóa đơn, có thể thất thoát tiền bạc trong việc tính toán.
                                </div>
                            </div>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 6, offset: 1}} >
                            <div className='item-problem' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <i style={{fontSize: '40px'}} className='icon-extension' />
                                <Title level={4} style={{marginTop: '10px'}}>Khách thuê</Title>
                                <div className='text-grey' style={{textAlign: 'center', marginTop: '10px'}}>
                            Bạn cần có một quy trình quản lý khách thuê chuyên nghiệp, hiệu quả để tạo mối quan hệ lâu dài với họ.
                                </div>
                            </div>
                        </Col>
                        <Col xs={{span: 24}} md={{span: 6, offset: 1}} >
                            <div className='item-problem' style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <i style={{fontSize: '40px'}} className='icon-business_center' />
                                <Title level={4} style={{marginTop: '10px'}}>Hiệu quả Kinh doanh</Title>
                                <div className='text-grey' style={{textAlign: 'center', marginTop: '10px'}}>
                            Công việc quản lý đảm bảo tính chính xác, hiệu quả để đảm bảo quyền lợi cả hai bên và tối ưu hóa được doanh thu.
                                </div>
                            </div>
                        </Col>
                    </Row>
                </ScrollAnimation>
                <ScrollAnimation animateIn='fadeIn' duration={2}>
                    <Row style={{paddingTop: '50px'}}>
                        <Col xs={{span: 24, offset: 0}} md={{span: 18, offset: 3}} className='flex-cloumn'>
                            <Title>Phần mềm Quản lý Nhà Trọ - Căn hộ tối ưu</Title>
                            <div className='text-grey' style={{textAlign: 'center'}} >
                        Giải quyết 90% lo lắng của chủ trọ trong việc quản lý và vận hành nhà trọ với chi phí tiết kiệm tối đa. Cắt giảm 50% thời gian tính toán thu chi với giao diện đơn giản nhất. Đội ngũ tư vấn khách hàng luôn sẵn sàng để hỗ trợ tận tình 24/7, đồng hành cùng việc quản lý nhà trọ của bạn.
                            </div>
                        </Col>
                    </Row>
                </ScrollAnimation>
                <ScrollAnimation animateIn='fadeInRight'>
                    <div ref={e => this.refRow = e}>
                        <Row id='row-info-number' className='row-info-number' gutter={16}>
                            <Col xs={{span: 12}} md={{span: 6}} className='flex-cloumn style-info-number' style={{justifyContent: 'center'}}>
                                {isShowCountUp && <CountUp start={0} end={1620} duration={5} />}
                                <div >Chủ trọ sử dụng</div>
                            </Col>
                            <Col xs={{span: 12}} md={{span: 6}} className='flex-cloumn style-info-number' style={{justifyContent: 'center'}}>
                                {isShowCountUp && <CountUp start={0} end={90} duration={5} />}
                                <div>Chủ trọ hài lòng</div>
                            </Col>
                            <Col xs={{span: 12}} md={{span: 6}} className='flex-cloumn style-info-number' style={{justifyContent: 'center'}}>
                                {isShowCountUp && <CountUp start={0} end={10} duration={5} />}
                                <div>Đăng ký mỗi ngày</div>
                            </Col>
                            <Col xs={{span: 12}} md={{span: 6}} className='flex-cloumn style-info-number' style={{justifyContent: 'center'}}>
                                {isShowCountUp && <CountUp start={0} end={33} duration={5} />}
                                <div>Tỉnh thành đã có mặt</div>
                            </Col>
                        </Row>
                    </div>
                </ScrollAnimation>
            </div>
        );
    }
}

export default Introduce;