import React from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss';
import { toast } from 'react-toastify';
import HomeHeader from '../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getDetailSpecailty } from '../../services/userService';
import _ from 'lodash';

class DetailSpecialty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctorId: [],
            dataDetailSpecialty: {}
        };

    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailSpecailty(id);
            if (res && res.errCode === 0) {
                let arrDoctorId = []
                let data = res.data
                if (data && !_.isEmpty(data)) {
                    let arr = data.doctorSpecialty
                    if (arr && arr.length > 0) {
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId)
                        })
                    }
                }
                this.setState({
                    dataDetailSpecialty: res.data,
                    arrDoctorId: arrDoctorId
                })
            }
        }
    }

    render() {
        console.log('state',this.state)
        let { arrDoctorId, dataDetailSpecialty } = this.state
        return (
            <div className='container-detail-specialty'>
                <HomeHeader />

                <div className='specialty-body'>
                    <div className='description'>
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty)
                            && <div contentEditable='false' dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML }}></div>}
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) => {
                            return (
                                <div className='doctor' key={index}>
                                    <div className='dt-content-left'>
                                        <ProfileDoctor
                                            doctorIdProps={item}
                                            isShow={true}
                                        // dataProps={dataModelProps}
                                        />
                                        <div className='more-infor-d'><a href={'/detail-doctor/'+item}>Xem thêm</a></div>
                                    </div>
                                    <div className='dt-content-right'>
                                        <div className='schedule'>
                                            <DoctorSchedule
                                                doctorIdProps={item}
                                            />
                                        </div>
                                        <div className='extra'>
                                            <DoctorExtraInfor
                                                doctorIdProps={item}
                                            />
                                        </div>

                                    </div>
                                </div>

                            )
                        })
                    }
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
export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);