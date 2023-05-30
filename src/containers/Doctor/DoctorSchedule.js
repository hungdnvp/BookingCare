import React, { Component } from 'react';
import { connect } from "react-redux";
import './DoctorSchedule.scss';
import moment from 'moment';
import localization from 'moment/locale/vi';
import { getScheduleByDateService } from '../../services/userService';
class DoctorSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
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
            console.log('response: ',res)
        }
    }
    render() {
        let {allDays} = this.state
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
