import React, { Component } from 'react';
import { connect } from "react-redux";
import { Fragment } from 'react';
import "./VerifyEmail.scss";
import { LANGUAGES } from '../../utils';
import { getVerifyBooking } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkVerify: false,
        }
    }
    async componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search)
        const token = urlParams.get('token')
        const doctorId = urlParams.get('doctorId')
        let res = await getVerifyBooking(token, doctorId)
        if (res && res.errCode === 0) {
            this.setState({
                checkVerify: true,
                errCode: res.errCode
            })
        } else {
            this.setState({
                checkVerify: false,
            })
        }

    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
       
    }

    render() {
        let { checkVerify } = this.state
        console.log('state: ',this.state)
        return (
            <>
                <HomeHeader />
                <div className='verify-container'>
                    {checkVerify === true ?
                        <div className='booking-ok'>
                            Xác nhận đặt lịch khám thành công !
                        </div>
                        :
                        <div className='booking-fail'>
                            Lịch khám không tồn tại hoặc đã được xác nhận !
                        </div>
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
