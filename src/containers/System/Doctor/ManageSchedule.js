import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils/constant';
import DatePicker from '../../../components/Input/DatePicker';
import { toast } from 'react-toastify';
import { saveBulkSchedule } from '../../../services/userService';
const _ = require('lodash');


class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDoctors: [],
            selectedDoctor: {},
            currentDate: "",
            rangeTime: []
        }
    }
    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleTime();

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildOption(this.props.allDoctors);
            this.setState({
                allDoctors: dataSelect
            })
        }
        if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
            let data = this.props.allScheduleTime
            if (data && data.length > 0) {
                data = data.map(item => ({ ...item, isSelected: false }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }
    buildOption = (inputData) => {
        let result = []
        let { language } = this.props;
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {

                let obj = {};
                let labeVi = `${item.lastName} ${item.firstName}`;
                let labeEn = `${item.firstName} ${item.lastName}`;

                obj.label = (language === LANGUAGES.VI ? labeVi : labeEn);
                obj.value = item.id;
                result.push(obj)
                if (item.id === this.props.idDoctor) {
                    this.setState({
                        selectedDoctor: obj
                    })
                }
            })
        }
        return result;
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedDoctor: selectedOption });
    }
    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0]
        })
    }
    handleClickBtnTime = (item) => {
        let { rangeTime } = this.state
        if (rangeTime && rangeTime.length > 0) {
            let time = rangeTime.find((check) => check.id === item.id)
            time.isSelected = !time.isSelected
            this.setState({
                rangeTime: rangeTime
            })
        }
    }

    handleSaveSchedule = async () => {
        let { rangeTime, selectedDoctor, currentDate } = this.state
        if (!currentDate) {
            toast.error('Invalid date')
            return;
        }
        if (!selectedDoctor || _.isEmpty(selectedDoctor)) {
            toast.error('Invalid doctor')
            return;
        }
        let result = []
        let formatDate = new Date(currentDate).getTime();
        if (rangeTime && rangeTime.length > 0) {
            let selectedTime = rangeTime.filter(item => item.isSelected === true)
            if (selectedTime && selectedTime.length > 0) {
                selectedTime.map(time => {
                    let obj = {};
                    obj.doctorId = selectedDoctor.value;
                    obj.date = '' + formatDate
                    obj.timeType = time.keyMap;
                    result.push(obj);
                })
            } else {
                toast.error('invalid selected time')
                return;
            }
        }

        let res = await saveBulkSchedule(result)
        if (res && res.errCode === 0) {
            toast.success('Save successfully')
        } else {
            toast.error('invalid selected time')
        }
    }
    render() {
        let { selectedDoctor } = this.state
        let { rangeTime } = this.state;
        let { language } = this.props;
        let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
        return (
            <React.Fragment>
                <div className='manage-schedule-container'>
                    <div className='m-s-title'>
                        <FormattedMessage id="manage-schedule.title" />
                    </div>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                <input
                                    readOnly
                                    className='form-control'
                                    value={selectedDoctor.label}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                                <DatePicker
                                    className="form-control"
                                    onChange={this.handleOnChangeDatePicker}
                                    value={this.state.currentDate}
                                    minDate={yesterday}
                                />
                            </div>
                            <div className='middle-content'>
                                <span>Chọn thời gian khám bệnh</span>
                            </div>
                            <div className='col-12 pick-hour-container'>
                                {rangeTime && rangeTime.length > 0 &&
                                    rangeTime.map((item, index) => {
                                        return (
                                            <button
                                                className={item.isSelected === true ?
                                                    'btn btn-schedule active' : 'btn btn-schedule'}
                                                key={index}
                                                onClick={() => this.handleClickBtnTime(item)}

                                            >
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </button>
                                        )
                                    })
                                }
                            </div>
                            <div className='col-12'>
                                <button
                                    className='btn btn-primary btn-save-schedule'
                                    onClick={this.handleSaveSchedule}

                                ><FormattedMessage id="manage-schedule.save" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        allDoctors: state.admin.alldoctors,
        allScheduleTime: state.admin.allScheduleTime,
        idDoctor: state.user.userInfo.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
