import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';


class About extends Component {

    render() {
       
        return (
            <div className='section-about'>
                <div className='section-about-heading'>
                    Truyền thông nói gì về Chanel Booking care
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe width="100%" height="400" src="https://www.youtube.com/embed/NlbHhMZlUfw" 
                    title="Hội thảo khoa học : &quot;Hành trình bảo vệ bệnh nhân Tim mạch - Thận - Chuyển hóa, 5 năm 1 chặng đường&quot;" 
                    frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Bệnh viện, là nơi thực hiện khám và điều trị các bệnh lý về cột sống như đau lưng, đau thần kinh tọa, thoát vị đĩa đệm, viêm cột sống, vẹo cột sống, thoái hóa cột sống…phẫu thuật cột sống, chấn thương chỉnh hình Một số triệu chứng người bệnh cần khám chuyên khoa cột sống như: đau lưng, đau dai dẳng, đau lan xuống chân, đau sau chấn thương, tê bì mất cảm giác, yếu chân, phát hiện khối viêm, sưng ở lưng</p>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
