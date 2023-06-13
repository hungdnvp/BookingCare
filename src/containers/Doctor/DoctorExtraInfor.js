import React, { Component } from 'react';
import { connect } from "react-redux";
import { Fragment } from 'react';
import "./DoctorExtraInfor.scss";
import { LANGUAGES } from '../../utils';
import { getDetailDoctorExtra } from '../../services/userService';

class DoctorExtraInfor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfor: true,
            extraInfor: {}
        }
    }
    async componentDidMount() {
        let data = await getDetailDoctorExtra(this.props.doctorIdProps)
        if (data) {
            this.setState({
                extraInfor: data
            })
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.doctorIdProps !== prevProps.doctorIdProps) {
            let data = await getDetailDoctorExtra(this.props.doctorIdProps)
            if (data) {
                this.setState({
                    extraInfor: data
                })
            }
        }
    }
    showHideDetailInfor = (status) => {
        this.setState({
            isShowDetailInfor: status
        })
    }
    render() {
        let { isShowDetailInfor, extraInfor } = this.state;
        return (
            <div className='doctor-extra-infor-container'>
                <div className='content-up'>
                    <div className='text-address'>Địa Chỉ Khám</div>
                    <div className='name-clinic'>{extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ''}</div>
                    <div className='detail-address'>{extraInfor && extraInfor.addressClinic ? extraInfor.addressClinic : ''}</div>
                </div>
                <div className='content-down'>
                    {isShowDetailInfor === false ?
                        <div>Giá Khám: {extraInfor && extraInfor.priceTypeData ? extraInfor.priceTypeData.valueVI : ''}
                            <span className='show' onClick={() => this.showHideDetailInfor(true)}> xem chi tiet</span>
                        </div>
                        :
                        <>
                            <div className='title-price'>Giá khám</div>
                            <div className='content-price'>
                                <div className='price'>
                                    <span className='left'>Giá khám</span>
                                    <span className='right'>{extraInfor && extraInfor.priceTypeData ? extraInfor.priceTypeData.valueVI : ''}</span>
                                </div>
                                <div className='note'>
                                    {extraInfor && extraInfor.note ? extraInfor.note : ''}
                                </div>
                            </div>
                            <div className='payment'>Người bệnh có thể thanh toán chi phí bằng hình thức {extraInfor && extraInfor.paymentTypeData ? extraInfor.paymentTypeData.valueVI : ''}</div>
                            <div className='hide-price'>
                                <span onClick={() => this.showHideDetailInfor(false)}>Ẩn bảng giá</span>
                            </div>
                        </>
                    }

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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
