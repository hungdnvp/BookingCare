import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CRUD_ACTION, LANGUAGES, manageActions } from '../../../utils/constant';
import * as actions from "../../../store/actions";
import CommonUtils from "../../../utils/CommonUtils";
import './UserRedux.scss';
import { forEach } from 'lodash';
import TableManageUser from './TableManageUser';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewUrl: '',

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',

            action: '',
            userIdEdit: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let newGenderArr = this.props.genderRedux;
            this.setState({
                genderArr: newGenderArr,
                gender: newGenderArr && newGenderArr.length > 0 ? newGenderArr[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let newPositionRedux = this.props.positionRedux;
            this.setState({
                positionArr: newPositionRedux,
                position: newPositionRedux && newPositionRedux.length > 0 ? newPositionRedux[0].key : ''
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let newRoleRedux = this.props.roleRedux;
            this.setState({
                roleArr: newRoleRedux,
                role: newRoleRedux && newRoleRedux.length > 0 ? newRoleRedux[0].key : ''
            })
        }
        if (prevProps.listUser !== this.props.listUser) {
            let newGenderArr = this.props.genderRedux;
            let newPositionRedux = this.props.positionRedux;
            let newRoleRedux = this.props.roleRedux;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: newGenderArr && newGenderArr.length > 0 ? newGenderArr[0].key : '',
                role: newRoleRedux && newRoleRedux.length > 0 ? newRoleRedux[0].key : '',
                position: newPositionRedux && newPositionRedux.length > 0 ? newPositionRedux[0].key : '',
                avatar: '',
                previewUrl: '',
                action: CRUD_ACTION.CREATE
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewUrl: objectURL,
                avatar: base64
            })
        }
    }
    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    checkInputValid = () => {
        let checks = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
        let isValid = true;
        for (let i = 0; i < checks.length; i++) {
            let item = checks[i]
            if (!this.state[item]) {
                isValid = false;
                alert(`${item} is required`);
                break;
            }
        }
        return isValid;
    }
    handleSaveUser = () => {
        if(this.state.action == CRUD_ACTION.CREATE){

            let check = this.checkInputValid();
            if (check === false) return;
            this.props.createUserStart({
                id: this.state.userIdEdit,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                role: this.state.role,
                position: this.state.position,
                avatar: this.state.avatar
            })
        }
        if(this.state.action == CRUD_ACTION.EDIT){
            let avatarNew = '';
            if(this.state.avatar){
                avatarNew = this.state.avatar;
            }
            this.props.editUser({
                id: this.state.userIdEdit,
                email: this.state.email,
                firstName : this.state.firstName,
                lastName : this.state.lastName,
                address : this.state.address,
                phonenumber : this.state.phoneNumber,
                gender : this.state.gender,
                position : this.state.position,
                roleId : this.state.role,
                avatar: avatarNew
            })
        }
    }
    handleEditUserBase = (user) => {
        let imageBase64 = '';
        if(user.image){
            imageBase64 = new Buffer(user.image,"base64").toString('binary');
        }
        this.setState({
            email: user.email,
            password: 'UNDEFINE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phonenumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            position: user.positionId,
            avatar: '',
            previewUrl: imageBase64,
            action: CRUD_ACTION.EDIT,
            userIdEdit: user.id
        })
        console.log(this.state)
    }
    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;

        let { email, password, firstName, lastName, phoneNumber,
            address, gender, role, position, avatar } = this.state
        console.log(genders)
        return (
            <div className='user-redux-container'>
                <div className="title" >User Redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' value={email}
                                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                    disabled= {this.state.action === CRUD_ACTION.EDIT ? true : false} 
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password' value={password}
                                    onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                    disabled= {this.state.action === CRUD_ACTION.EDIT ? true : false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' value={firstName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'firstName')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text' value={lastName}
                                    onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='text' value={phoneNumber}
                                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' value={address}
                                    onChange={(event) => this.handleOnChangeInput(event, 'address')} />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                    value={gender}
                                >
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return (
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVI : item.valueEN}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'role')}
                                    value={role}
                                >
                                    {roles && roles.length > 0 && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select className="form-control"
                                    onChange={(event) => this.handleOnChangeInput(event, 'position')}
                                    value={position}
                                >
                                    {positions && positions.length > 0 && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.keyMap}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewImga' type='file' hidden
                                        onChange={(event) => this.handleOnChangeImage(event)} />
                                    <label htmlFor='previewImga' className='label-upload'>Tải ảnh<i className='fas fa-upload'></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewUrl})` }}></div>
                                </div>
                            </div>
                            <div className='col-12' style={{ color: "red" }}>{isLoadingGender === true ? 'Loading genders' : ''} </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTION.EDIT ? 'btn btn-warning' :'btn btn-primary'} 
                                onClick={() => this.handleSaveUser()}>
                                    {this.state.action === CRUD_ACTION.EDIT ? <FormattedMessage id="manage-user.edit" />
                                     :<FormattedMessage id="manage-user.save" />
                                    }
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserKey={this.handleEditUserBase}
                                    action = {this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoadingGender,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        listUser: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createUserStart: (userInput) => dispatch(actions.createUserStart(userInput)),
        fetchAllUser: () => dispatch(actions.fetchAllUserStart()),
        editUser: (userEdit) => dispatch(actions.editUserStart(userEdit)),

        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
