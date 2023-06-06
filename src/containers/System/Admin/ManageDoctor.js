import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
//import { getUser, createNewUserService, deleteUserService, editUserService } from '../../../services/userService';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInforDoctor } from "../../../services/userService";
import { LANGUAGES } from '../../../utils/constant';
import { FormattedMessage } from 'react-intl';


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            //Markdown Table
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            allDoctors: [],
            action: '',
            // save to doctor_infor Table
            resPrice: [],
            resPayment: [],
            resProvince: [],

            selectedPrice: '',
            selectedPayment: '',
            selectedProvince: '',
            nameClinic: '',
            addressClinic: '',
            note: ''
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.getRequireDoctorInfor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let dataSelect = this.buildOption(this.props.allDoctors, 'doctor');
            this.setState({
                allDoctors: dataSelect
            })
        }
        if (prevProps.language !== this.props.language) {
            let { resPrice, resPayment, resProvince } = this.props.allRequireDoctorInfor
            let dataSelect = this.buildOption(this.props.allDoctors, 'doctor')
            let dataSelectPrice = this.buildOption(resPrice, 'price')
            let dataSelectPayment = this.buildOption(resPayment, 'payment')
            let dataSelectProvince = this.buildOption(resProvince, 'province')
            this.setState({
                allDoctors: dataSelect,
                resPrice: dataSelectPrice,
                resPayment: dataSelectPayment,
                resProvince: dataSelectProvince,
            })
        }
        if (prevProps.allRequireDoctorInfor !== this.props.allRequireDoctorInfor) {
            let { resPrice, resPayment, resProvince } = this.props.allRequireDoctorInfor
            let dataSelectPrice = this.buildOption(resPrice, 'price')
            let dataSelectPayment = this.buildOption(resPayment, 'payment')
            let dataSelectProvince = this.buildOption(resProvince, 'province')

            this.setState({
                resPrice: dataSelectPrice,
                resPayment: dataSelectPayment,
                resProvince: dataSelectProvince,
            })

        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleChange = async (selectedOption) => {
        this.setState({ selectedOption });

        let detailDoctor = await getDetailInforDoctor(selectedOption.value);
        let nameClinic = '', addressClinic = '', note = '', selectedPrice='',
        selectedPayment = '', selectedProvince = ''
        if (detailDoctor.data.Doctor_Infor) {
            let inforExtra = detailDoctor.data.Doctor_Infor
            nameClinic = inforExtra.nameClinic
            addressClinic = inforExtra.addressClinic
            note = inforExtra.note
            selectedPrice = inforExtra.priceTypeData ? {label: inforExtra.priceTypeData.valueVI + ' VND', value: inforExtra.priceId} : ''
            selectedPayment = inforExtra.paymentTypeData ? {label: inforExtra.paymentTypeData.valueVI , value: inforExtra.paymentId} : ''
            selectedProvince = inforExtra.provinceTypeData ? {label: inforExtra.provinceTypeData.valueVI , value: inforExtra.provinceId} : ''

        }
        if (detailDoctor && detailDoctor.data && detailDoctor.data.Markdown) {
            let markdown = detailDoctor.data.Markdown;
                this.setState({
                    nameClinic : nameClinic,
                    addressClinic : addressClinic,
                    note : note,
                    selectedPrice: selectedPrice,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince,
                    contentHTML: markdown.contentHTML,
                    contentMarkdown: markdown.contentMarkdown,
                    description: markdown.description,
                    action: 'UPDATE'
                })
            } else {
                this.setState({
                    nameClinic : nameClinic,
                    addressClinic : addressClinic,
                    note : note,
                    selectedPrice: selectedPrice,
                    selectedPayment: selectedPayment,
                    selectedProvince: selectedProvince,
                    contentHTML: "",
                    contentMarkdown: "",
                    description: "",
                    action: 'CREATE'
                })
            }
            console.log('state: ',this.state)
        }
        handleChangeExtraInfor = (selectedOption, name) => {
            console.log('slect: ',selectedOption)
            let stateName = name.name
            let stateCopy = { ...this.state }
            stateCopy[stateName] = selectedOption
            this.setState({
                ...stateCopy
            })
        }
        handleSaveEditDoctor = () => {
            this.props.saveDoctor({
                contentHTML: this.state.contentHTML,
                contentMarkdown: this.state.contentMarkdown,
                description: this.state.description,
                doctorId: this.state.selectedOption.value,
                action: this.state.action,

                selectedPrice: this.state.selectedPrice.value,
                selectedPayment: this.state.selectedPayment.value,
                selectedProvince: this.state.selectedProvince.value,
                nameClinic: this.state.nameClinic,
                addressClinic: this.state.addressClinic,
                note: this.state.note
            })
        }
        handleChangeDesc = (event, id) => {
            let stateCopy = { ...this.state };
            stateCopy[id] = event.target.value;
            this.setState({
                ...stateCopy
            })
        }
        buildOption = (inputData, type) => {
            let result = []
            let { language } = this.props;
            if (inputData && inputData.length > 0) {
                if (type === 'doctor') {

                    inputData.map((item, index) => {
                        let obj = {};
                        let labeVi = `${item.lastName} ${item.firstName}`;
                        let labeEn = `${item.firstName} ${item.lastName}`;

                        obj.label = (language === LANGUAGES.VI ? labeVi : labeEn);
                        obj.value = item.id;
                        result.push(obj)

                    })
                } else if (type === 'price') {
                    inputData.map((item, index) => {
                        let obj = {};
                        let labeVi = `${item.valueVI} VND`;
                        let labeEn = `${item.valueEN} USD`;

                        obj.label = (language === LANGUAGES.VI ? labeVi : labeEn);
                        obj.value = item.keyMap;
                        result.push(obj)

                    })
                } else {
                    inputData.map((item, index) => {
                        let obj = {};
                        let labeVi = `${item.valueVI}`;
                        let labeEn = `${item.valueEN}`;

                        obj.label = (language === LANGUAGES.VI ? labeVi : labeEn);
                        obj.value = item.keyMap;
                        result.push(obj)

                    })
                }
            }
            return result;
        }
        render() {

            return (
                <div className='manage-doctor-container'>
                    <div className='manage-doctor-title'>
                        <FormattedMessage id="manage-doctor.title" />
                    </div>
                    <div className='more-infor'>
                        <div className='content-left form-group'>
                            <label><FormattedMessage id="manage-doctor.select-doctor" /></label>
                            <Select
                                defaultValue={this.state.selectedOption}
                                onChange={this.handleChange}
                                options={this.state.allDoctors}
                                placeholder={'Chọn bác sĩ'}
                            />
                        </div>
                        <div className='content-right'>
                            <label><FormattedMessage id="manage-doctor.infor-introduce" /></label>
                            <textarea className='form-control' rows='4'
                                onChange={(event) => this.handleChangeDesc(event, 'description')}
                                value={this.state.description}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className='more-infor-extra row'>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-doctor.price" /></label>
                            <Select
                                defaultValue={this.state.selectedPrice}
                                onChange={this.handleChangeExtraInfor}
                                options={this.state.resPrice}
                                placeholder={'Chọn giá'}
                                name={"selectedPrice"}
                                value={this.state.selectedPrice}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-doctor.payment" /></label>
                            <Select
                                defaultValue={this.state.selectedPayment}
                                onChange={this.handleChangeExtraInfor}
                                options={this.state.resPayment}
                                placeholder={'Chọn phương thức thanh toán'}
                                name={"selectedPayment"}
                                value={this.state.selectedPayment}

                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-doctor.province" /></label>
                            <Select
                                defaultValue={this.state.selectedProvince}
                                onChange={this.handleChangeExtraInfor}
                                options={this.state.resProvince}
                                placeholder={'Chọn tỉnh thành'}
                                name={"selectedProvince"}
                                value={this.state.selectedProvince}

                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-doctor.name-clinic" /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleChangeDesc(event, 'nameClinic')}
                                value={this.state.nameClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-doctor.address-clinic" /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleChangeDesc(event, 'addressClinic')}
                                value={this.state.addressClinic}
                            />
                        </div>
                        <div className='col-4 form-group'>
                            <label><FormattedMessage id="manage-doctor.note" /></label>
                            <input className='form-control'
                                onChange={(event) => this.handleChangeDesc(event, 'note')}
                                value={this.state.note}
                            />
                        </div>
                    </div>

                    <div className='manage-doctor-editor'>
                        <MdEditor style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.contentMarkdown}
                        />
                    </div>
                    <button
                        className='save-content-doctor'
                        onClick={() => this.handleSaveEditDoctor()}
                    >
                        Lưu thông tin
                    </button>
                </div>
            );
        }

    }

    const mapStateToProps = state => {
        return {
            language: state.app.language,
            allDoctors: state.admin.alldoctors,
            allRequireDoctorInfor: state.admin.allRequireDoctorInfor,
        };
    };

    const mapDispatchToProps = dispatch => {
        return {
            getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
            fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
            saveDoctor: (inforDoctor) => dispatch(actions.saveInforDoctorAction(inforDoctor))
        };
    };

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
