import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';


class Specialty extends Component {

    render() {
       
        return (
            <div className='section-share section-specialty'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Chuyên khoa phổ biến</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='img-custome'>
                                <div className='bg-image'></div>
                                <span><h3>Cơ xương khớp 1</h3></span>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image'></div>
                                <span><h3>Cơ xương khớp 2</h3></span>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image'></div>
                                <span><h3>Cơ xương khớp 3</h3></span>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image'></div>
                                <span><h3>Cơ xương khớp 4</h3></span>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image'></div>
                                <span><h3>Cơ xương khớp 5</h3></span>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image'></div>
                                <span><h3>Cơ xương khớp 6</h3></span>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image'></div>
                                <span><h3>Cơ xương khớp 7</h3></span>
                            </div>
                            <div className='img-custome'>
                                <div className='bg-image'></div>
                                <span><h3>Cơ xương khớp 8</h3></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
