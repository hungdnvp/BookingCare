import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant';
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientBooking } from '../../../services/userService';
import moment from 'moment';


const _ = require('lodash');


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: []
        }
    }
    async componentDidMount() {
        let { user } = this.props
        let { currentDate } = this.state
        let formatDate = new Date(currentDate).getTime()
        await this.getDataPatient(user, formatDate)
    }
    getDataPatient = async (user, formatDate) => {
        let res = await getAllPatientBooking(user.id, formatDate)
        console.log('res: ', res)
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        }, () => {
            let { user } = this.props
            let { currentDate } = this.state
            let formatDate = new Date(currentDate).getTime()
            this.getDataPatient(user, formatDate)
        })
    }
    handleConfirm = ()=>{

    }
    handleSendBill = ()=>{
        
    }
    render() {
        let { dataPatient } = this.state
        return (
            <div className='manage-patient-container'>
                <div className='mp-titiel'>
                    Quản lí bệnh nhân khám bệnh
                </div>
                <div className='manage-patient-body'>
                    <div className='col-4 form-group'>
                        <label>Chọn ngày khám</label>
                        <DatePicker
                            className="form-control"
                            onChange={this.handleOnChangeDatePicker}
                            value={this.state.currentDate}
                        // minDate={yesterday}
                        />
                    </div>
                    <div className='col-12'>
                        <table style={{ width: "100%" }} className='table-manage-patient'>
                            <tbody>
                                <tr>
                                    <th>STT</th>
                                    <th>Thời gian</th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Giới tính</th>
                                    <th>Actions</th>
                                </tr>
                                {dataPatient && dataPatient.length > 0 ?
                                    dataPatient.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.timeTypeDataBooking.valueVI}</td>
                                                <td>{item.patientData.firstName}</td>
                                                <td>{item.patientData.email}</td>
                                                <td>{item.patientData.genderData.valueVI}</td>
                                                <td>
                                                    <button className='mp-btn-confirm' onClick={()=>this.handleConfirm()}>Xác nhận</button>
                                                    <button className='mp-btn-send-bill' onClick={()=>this.handleSendBill()}>Gửi hóa đơn</button>
                                                </td>
                                            </tr>
                                        )
                                    }) :
                                    <tr>
                                        không có lịch hẹn của bệnh nhân
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        user: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
