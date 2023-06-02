import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleByDateService } from '../../services/userService';
import { LANGUAGES } from '../../utils';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: []
        }
    }
    async componentDidMount() {
        this.setArrDays()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    setArrDays = ()=>{
        let allDays = []
        for(let i=0;i<7;i++){
            let obj = {}
            obj.label = moment(new Date()).add(i,'days').format('dddd - DD/MM')
            obj.value = moment(new Date()).add(i,'days').startOf('day').valueOf()

            allDays.push(obj)
        }

        this.setState({
            allDays: allDays
        })
    }

    handleOnChangeSelect = async (event)=>{
        if (this.props.doctorIdProps && this.props.doctorIdProps !== -1) {
            let doctorId = this.props.doctorIdProps
            let date = event.target.value
            let res = await getScheduleByDateService(doctorId,date)
            if(res && res.errCode === 0){
                this.setState({
                    allAvailableTime: res.data
                })
            }
        }
    }
    render() {
        let {allDays, allAvailableTime} = this.state
        let {language} = this.props
        return(
            <div className='doctor-schedule-container'>
                <div className='all-schedule'>
                    <select onChange={(event)=>this.handleOnChangeSelect(event)}>
                        {allDays && allDays.length >0 &&
                        allDays.map((item,index)=>{
                            return (
                                <option
                                 key={index}
                                 value={item.value}
                                 >{item.label}
                                 </option>
                            )
                        })
                        }
                    </select>
                </div>
                <div className='all-available-time'>
                    <div className='text-calendar'>
                        <span><i className='fas fa-calendar-alt'></i>Lịch khám</span>
                    </div>
                    <div className='time-content'>
                        {allAvailableTime && allAvailableTime.length >0 ?
                            allAvailableTime.map((item,index)=>{
                                let timeDisplay = language === LANGUAGES.VI?
                                item.timeTypeData.valueVI : item.timeTypeData.valueEN
                                return (
                                    <button key={index}>{timeDisplay}</button>

                                )
                            })
                            : <div>Không có lịch khám trong khoảng thời gian này, vui lòng chọn thời gian khác</div>
                        }

                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
