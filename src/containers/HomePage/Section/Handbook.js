import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';


class HandBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: {
                dots: false,
                infinite: true,
                speed: 500,
                slidesToShow: 2,
                slidesToScroll: 1
            }
        }
    }

    render() {
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.state.settings}>
                            <div className='img-custome'>
                                <div className='bg-image ig4'></div>
                                <div className='des-handbook'>
                                    <span><h3>Review Kích thích từ trường (TMS) trị trầm cảm tại Trung tâm Y khoa Vạn Hạnh</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image'></div>
                                <div className='des-handbook'>
                                    <span><h3>5 địa chỉ bọc răng sứ uy tín tại TP.HCM</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image ig2'></div>
                                <div className='des-handbook'>
                                    <span><h3>Top 5 địa chỉ trồng răng chất lượng cao tại TP.HCM</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image ig3'></div>
                                <div className='des-handbook'>
                                    <span><h3>Top 5 địa chỉ bọc răng sứ được phản hồi tốt tại Hà Nội</h3></span>
                                </div>
                            </div>

                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
