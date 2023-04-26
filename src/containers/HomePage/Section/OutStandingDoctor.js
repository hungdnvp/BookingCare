import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions';
import {LANGUAGES} from '../../../utils/constant';
class OutStandingDoctor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: []
        }
    }

    componentDidMount() {
        this.props.loadTopDoctor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrDoctors: this.props.topDoctors
            })
        }
    }
    render() {
        let arrDoctors = this.state.arrDoctors;
        arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors)
        let language = this.props.language
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Bác sĩ nổi bật tuần qua</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {arrDoctors && arrDoctors.length > 0
                                && arrDoctors.map((item, index) => {
                                    let imageBase64 = ''
                                    if(item.image){
                                        imageBase64 = new Buffer(item.image,"base64").toString('binary');
                                    }
                                    let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                    let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                    return (
                                        <div className='img-custome' key={index}>
                                            <div className='outer-bg'>
                                                <div className='bg-image'
                                                style={{ backgroundImage: `url(${imageBase64})` }}>
                                                </div>
                                            </div>
                                            <div className='position'>
                                                <div>
                                                    {language === LANGUAGES.VI ?nameVi:nameEn}
                                                </div>
                                                <div>Cơ Xương Khớp</div>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        topDoctors: state.admin.topDoctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
