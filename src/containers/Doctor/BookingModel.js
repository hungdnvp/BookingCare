import React, { Component } from 'react';
import { connect } from "react-redux";
import { Fragment } from 'react';
import "./BookingModel.scss";
import { LANGUAGES } from '../../utils';
import { Modal } from 'reactstrap';
import ProfileDoctor from './ProfileDoctor';

class BookingModel extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        let { isOpenModelProps, closeBookingModelProps, dataModelProps } = this.props
        return (
            <Modal
                isOpen={isOpenModelProps}
                className={'booking-model-container'}
                size="lg"
                centered
            >
                <div className='booking-model'>
                    <div className='booking-model-header'>
                        <span className='left'>Thông tin đặt lịch khám bệnh</span>
                        <span
                            className='right'
                            onClick={closeBookingModelProps}
                        ><i className='fas fa-times'></i></span>
                    </div>
                    <div className='booking-model-body'>
                        <div className='doctor-infor'>
                            <ProfileDoctor 
                            doctorIdProps = {dataModelProps.doctorId} 
                            isShow={false}
                            dataProps = {dataModelProps}
                            />
                        </div>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Họ tên</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Giới tính</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Số điện thoại</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ Email</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Địa chỉ liên hệ</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Đặt cho ai</label>
                                <input className='form-control' />
                            </div>
                            <div className='col-12 form-group'>
                                <label>Lí do khám</label>
                                <input className='form-control' />
                            </div>
                        </div>
                    </div>
                    <div className='booking-model-footer'>
                        <button className='confirm'>Xác nhận</button>
                        <button 
                            className='cancel'
                            onClick={closeBookingModelProps}
                        >Hủy</button>

                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
