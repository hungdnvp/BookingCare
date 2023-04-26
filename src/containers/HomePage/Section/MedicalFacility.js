import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss';
import Slider from 'react-slick';

class MedicalFacility extends Component {

    render() {
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cơ sở y tế nổi bật</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-custome'>
                                <div className='outer-bg'>
                                    <div className='bg-image' style={{"marginLeft":"36px"}}></div>
                                    <span><h3>Hệ thống y tế Việt Đức 1</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='outer-bg'>
                                    <div className='bg-image'></div>
                                    <span><h3>Hệ thống y tế Việt Đức 2</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='outer-bg'>
                                    <div className='bg-image'></div>
                                    <span><h3>Hệ thống y tế Việt Đức 3</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='outer-bg'>
                                    <div className='bg-image'></div>
                                    <span><h3>Hệ thống y tế Việt Đức 4</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='outer-bg'>
                                    <div className='bg-image'></div>
                                    <span><h3>Hệ thống y tế Việt Đức 5</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='outer-bg'>
                                    <div className='bg-image'></div>
                                    <span><h3>Hệ thống y tế Việt Đức 6</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='outer-bg'>
                                    <div className='bg-image'></div>
                                    <span><h3>Hệ thống y tế Việt Đức 7</h3></span>
                                </div>
                            </div>
                            <div className='img-custome'>
                                <div className='outer-bg'>
                                    <div className='bg-image'></div>
                                    <span><h3>Hệ thống y tế Việt Đức 8</h3></span>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
