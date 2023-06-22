import React, { Component } from 'react';
import { connect } from "react-redux";
import { Fragment } from 'react';
import "./BookingModel.scss";
import { LANGUAGES } from '../../utils';
import { Modal } from 'reactstrap';
import ProfileDoctor from './ProfileDoctor';
import DatePicker from '../../components/Input/DatePicker';
import * as actions from '../..//store/actions';
import Select from 'react-select';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { postPatientBookAppointment } from '../../services/userService';
import LoadingOverlay from 'react-loading-overlay';

class BookingModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowLoading: false,
            fullName: '',
            phomeNumber: '',
            email: '',
            address: '',
            genders: '',
            selectedGender: '',
            doctorId: '',
            birthday: '',
            reason: '',
            timeType: '',
            date: '',
            timeTypeData: ''
        }
    }
    async componentDidMount() {
        this.props.fetchGenderStart()
    }
    buldDataGender = (data) => {
        let result = []
        if (data && data.length > 0) {
            data.map(item => {
                let obj = {};
                obj.label = item.valueVI
                obj.value = item.keyMap
                result.push(obj)
            })
        }
        return result;

    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.genderRedux !== prevProps.genderRedux) {

            this.setState({
                genders: this.buldDataGender(this.props.genderRedux)
            })
        }
        if (this.props.dataModelProps !== prevProps.dataModelProps) {
            if (this.props.dataModelProps && !_.isEmpty(this.props.dataModelProps)) {
                let dataProp = this.props.dataModelProps
                console.log('update model; ', dataProp)
                let doctorId = dataProp.doctorId
                let timeType = dataProp.timeType
                let date = dataProp.date
                let timeTypeData = dataProp.timeTypeData.valueVI
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType,
                    date: date,
                    timeTypeData: timeTypeData
                })

            }
        }
    }
    handleOnChangeInput = (event, id) => {
        let valueInput = event.target.value;
        let stateCoppy = { ...this.state };
        stateCoppy[id] = valueInput;
        this.setState({
            ...stateCoppy
        })
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedGender: selectedOption })
    }
    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true
        })
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phomeNumber: this.state.phomeNumber,
            email: this.state.email,
            address: this.state.address,
            gender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            date: this.state.date,
            reason: this.state.reason,
            timeTypeData: this.state.timeTypeData
        })
        this.setState({
            isShowLoading: false
        })
        if (res && res.errCode === 0) {
            toast.success('Booking a new appointment succeed')
            this.props.closeBookingModelProps()
        } else {
            toast.error(res.errMessage || 'Booking a new appointment error')
        }
    }
    render() {
        let { isOpenModelProps, closeBookingModelProps, dataModelProps } = this.props
        return (
            <LoadingOverlay
                active={this.state.isShowLoading}
                spinner
                text='Loadding'
            >
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
                                    doctorIdProps={dataModelProps.doctorId}
                                    isShow={false}
                                    dataProps={dataModelProps}
                                />
                            </div>
                            <div className='row'>
                                <div className='col-6 form-group'>
                                    <label>Họ tên</label>
                                    <input
                                        className='form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Giới tính</label>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelect}
                                        options={this.state.genders}
                                        placeholder={'Chọn giới tính'}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Số điện thoại</label>
                                    <input className='form-control'
                                        value={this.state.phomeNumber}
                                        onChange={(event) => this.handleOnChangeInput(event, 'phomeNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ Email</label>
                                    <input className='form-control'
                                        value={this.state.email}
                                        onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Địa chỉ liên hệ</label>
                                    <input className='form-control'
                                        value={this.state.address}
                                        onChange={(event) => this.handleOnChangeInput(event, 'address')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>Ngày sinh</label>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.birthday}

                                    />
                                </div>
                                <div className='col-12 form-group'>
                                    <label>Lí do khám</label>
                                    <input
                                        className='form-control'
                                        value={this.state.reason}
                                        onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='booking-model-footer'>
                            <button
                                className='confirm'
                                onClick={this.handleConfirmBooking}
                            >Xác nhận</button>
                            <button
                                className='cancel'
                                onClick={closeBookingModelProps}
                            >Hủy</button>

                        </div>
                    </div>
                </Modal>
            </LoadingOverlay>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModel);
