import React, { Component } from 'react';
import { connect } from "react-redux";
import { Fragment } from 'react';
import "./ProfileDoctor.scss";
import { LANGUAGES } from '../../utils';
import { getProfileDoctorService } from '../../services/userService';
import _ from 'lodash';
import moment from 'moment';

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {}
        }
    }
    async componentDidMount() {
        let id = this.props.doctorIdProps;
        let data = await this.getProfileDoctor(id)
        this.setState({
            dataProfile: data
        })
    }
    getProfileDoctor = async (id) => {
        let result = {}
        if (id) {
            let res = await getProfileDoctorService(id);
            if (res && res.errCode === 0) {
                result = res.data
            }
        }
        return result
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {

    }
    renderTimeBooking = (dataTime) => {
        if(dataTime && !_.isEmpty(dataTime)){
            let date = moment.unix(+dataTime.date /1000).format('dddd - DD/MM/YYYY')
            let time = dataTime.timeTypeData.valueVI
            return (
                <>
                    <div>{time} - {date}</div>
                    <div>Miễn phí đặt lịch</div>
    
                </>
            )
        }
        return <></>
        
    }
    render() {
        let { dataProfile } = this.state;
        let { language } = this.props;
        let { isShow, dataProps } = this.props;
        let nameVi = '', nameEn = '';
        if (dataProfile && dataProfile.positionData) {
            nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
            nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        console.log('data time: ', dataProps)
        return (
            <>
                <div className='intro-doctor'>
                    <div className='content-left'
                        style={{ backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})` }}
                    >
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className='down'>
                            {isShow === true ?
                                <div className='des'>
                                    {dataProfile && dataProfile.Markdown
                                        && dataProfile.Markdown.description
                                        && <span>
                                            {dataProfile.Markdown.description}
                                        </span>}
                                </div> :
                                <>{this.renderTimeBooking(dataProps)}</>
                            }
                        </div>

                    </div>
                </div>
                <div className='price'>
                    Giá khám:
                    {dataProfile && dataProfile.Doctor_Infor &&
                        language === LANGUAGES.VI ?
                        dataProfile.Doctor_Infor.priceTypeData.valueVI + ' VND' : ''}
                    {dataProfile && dataProfile.Doctor_Infor &&
                        language === LANGUAGES.EN ?
                        dataProfile.Doctor_Infor.priceTypeData.valueEN + '$' : ''}
                </div>
            </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
