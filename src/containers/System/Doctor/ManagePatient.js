import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { toast } from 'react-toastify';
import DatePicker from '../../../components/Input/DatePicker';
import { getAllPatientBooking, examine_success } from '../../../services/userService';
import moment from 'moment';
import { Button, Space, Table, Tag } from "antd";
import LoadingOverlay from 'react-loading-overlay';

const _ = require('lodash');


class ManagePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isShowLoading: false
        }
    }
    async componentDidMount() {

        await this.getDataPatient()
    }
    getDataPatient = async () => {
        let { user } = this.props
        let { currentDate } = this.state
        let formatDate = new Date(currentDate).getTime()
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
        }, async () => {
            await this.getDataPatient()
        })
    }
    handleConfirm = async (item) => {
        // console.log(item)
        this.setState({
            isShowLoading: true
        })
        let data = {
            bookingId: item.id,
            email: item.patientData.email,
            firstName: item.patientData.firstName
        }

        let res = await examine_success(data)
        this.setState({
            isShowLoading: false
        })
        if (res && res.errCode === 0) {
            toast.success('Xác nhận khám thành công')
            await this.getDataPatient()
        } else {
            toast.error('Xác nhận khám không thành công')
        }

    }




    render() {


        const columns = [
            {
                title: 'Name',
                dataIndex: 'statusId',
                render: (statusId, _) =>
                    <Tag color={statusId === 'S2' ? 'geekblue' : 'green'}> {statusId === 'S2' ? 'CHỜ KHÁM' : 'KHÁM XONG'}
                    </Tag>

            },
            {
                title: 'Thoi gian',
                render: (_, item) => {
                    return <> {item.timeTypeDataBooking.valueVI}
                    </>
                },

            },
            {
                title: 'Họ tên',
                render: (_, item) => {
                    return <> {item.patientData.firstName}
                    </>
                },
            },
            {
                title: 'Email',
                render: (_, item) => {
                    return <> {item.patientData.email}
                    </>
                },
            },
            {
                title: 'Giới tính',
                render: (_, item) => {
                    return <> {item.patientData.genderData.valueVI}
                    </>
                },
            },
            {
                title: 'Actions',
                render: (_, item) =>
                    <Button type='primary' disabled={item.statusId !== 'S2'} onClick={() => this.handleConfirm(item)}>Xác nhận khám</Button>

            },
        ];

        let { dataPatient } = this.state
        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loadding'
                >
                    <div className='manage-patient-container'>
                        <div className='mp-titiel'>
                            Quản lí bệnh nhân khám bệnh
                        </div>

                        {/* <div className='manage-patient-body'> */}
                        <div className='manage-patient-body'>
                            {/* <div className='col-4 form-group'> */}
                            <div className='form-date'>
                                <Space style={{ paddingRight: 8 }}>Chọn ngày khám:</Space>
                                <div>
                                    <DatePicker
                                        className="form-control"
                                        onChange={this.handleOnChangeDatePicker}
                                        value={this.state.currentDate}
                                    // minDate={yesterday}
                                    />
                                </div>
                            </div>

                            <Table dataSource={dataPatient} columns={columns} />

                        </div>

                    </div>
                </LoadingOverlay>
            </>

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
