import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Footer.scss';

class Footer extends Component {



    render() {

        return (
            <div className='footer-container'>
                <div className='question'>
                    <p>Cần tìm hiểu thêm? Xem câu hỏi thường gặp</p>
                </div>
                <div className='container-body'>
                    <div className='ft-container-left'>
                        <div className='header-logo'></div>
                        <h2>Công ty Cổ phần Công nghệ BookingCare</h2>
                        <p>Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</p>
                        <p>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</p>

                    </div>
                    <div className='ft-container-right'>
                        <div className='address'>
                            <div className='title-add'>Trụ sở tại Hà Nội</div>
                            <div className='content-add'>Lô B4/D21, Khu đô thị mới Cầu Giấy, Phường Dịch Vọng Hậu, Quận Cầu Giấy, Thành phố Hà Nội, Việt Nam</div>
                        </div>
                        <div className='address'>
                            <div className='title-add'>Văn phòng tại TP Hồ Chí Minh</div>
                            <div className='content-add'>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>
                            <div className='content-add'>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</div>

                        </div>
                        <div className='address'>
                            <div className='title-add'>Hỗ trợ khách hàng</div>
                            <div className='content-add'>support@bookingcare.vn (7h - 18h)</div>
                        </div>
                    </div>
                </div>
                <div className='end'>
                    <p>© 2023 BookingCare.-.Hệ thống đặt lịch khám chữa bệnh</p>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
