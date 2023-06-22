import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllClinic } from '../../../services/userService';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';

class MedicalFacility extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataClinic: []
        }
    }
    async componentDidMount() {
        let res = await getAllClinic()
        if (res && res.errCode === 0) {
            this.setState({
                dataClinic: res.clinics
            })
        }
    }
    handleViewDetailClinic = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-clinic/${item.id}`)
        }
    }
    render() {
        let {dataClinic} = this.state
        return (
            <div className='section-share section-medical-facility'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.medical-facility-title" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-infor" /></button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            {/* {dataSpecialty && dataSpecialty.length > 0 &&
                                dataSpecialty.map((item, index) => {
                                    return (
                                        <div className='img-custome' key={index} 
                                        onClick={()=>this.handleViewDetailSpecialty(item)}
                                        >
                                            <div className='bg-image'
                                            style={{backgroundImage: `url(${item.image})`}}
                                            ></div>
                                            <span><h3>{item.name}</h3></span>
                                        </div>
                                    )
                                })
                            } */}
                            {dataClinic && dataClinic.length > 0 &&
                                dataClinic.map((item, index) => {
                                    return (
                                        <div className='img-custome' key={index} onClick={()=>this.handleViewDetailClinic(item)}>
                                            <div className='outer-bg'>
                                                <div className='bg-image' style={{"backgroundImage": `url(${item.image})`, marginLeft: "36px" }}></div>
                                                <span><h3>{item.name}</h3></span>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
