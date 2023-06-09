import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getUser, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './userModal';
import { emitter } from '../../utils/emitter';
import EditUserModal from './editUserModal';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenEditModalUser:false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        // được gọi sau hàm constructor để set đặt giá trị
        // cho các state. (gọi đến backend để đưa dữ liệu vào state)
        await this.getAllUser();
    }

    getAllUser = async () => {
        let response = await getUser('ALL');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }
    handleClickAddNewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleModalUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        });
    }

    toggleEditModalUser = ()=>{
        this.setState({
            isOpenEditModalUser: !this.state.isOpenEditModalUser
        })
    }
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.getAllUser();
                this.setState({
                    isOpenModalUser: false
                })

                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleDeleteUser = async (user) => {
        try {
            let res = await deleteUserService(user.id);
            if (res && res.errCode === 0) {
                await this.getAllUser();
            } else {
                alert(res.errMessage);
            }
        } catch (e) {
            console.log(e);
        }
    }

    handleClickEditUser = (user)=>{
        this.setState({
            isOpenEditModalUser: true,
            userEdit: user
        })
    }
    handleEditUser = async (user)=>{
        try{
            let res = await editUserService(user);
            if(res && res.errCode ===0){
                this.setState({
                    isOpenEditModalUser: false
                });
                await this.getAllUser();
            }else{
                alert(res.errMessage)
            }
        }catch(e){
            console.log(e);
        }
    }
    render() {
        let arrUsers = this.state.arrUsers;
        return (
            <div className="user-container">
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleModalUser}
                    className='modal-user-container'
                    createNewUser={this.handleEditUser}
                />
                {
                    this.state.isOpenEditModalUser &&
                <EditUserModal
                    isOpen={this.state.isOpenEditModalUser}
                    toggleFromParent={this.toggleEditModalUser}
                    className='modal-user-container'
                    currentUser = {this.state.userEdit}
                    editUser = {this.handleEditUser}
                />
                }
                <div className='title text-center'>Manage Users</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={this.handleClickAddNewUser}
                    ><i className='fa fa-plus'></i>Add new user</button>
                </div>
                <div className='users-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                            {arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={()=>{this.handleClickEditUser(item)}}><i className='fas fa-pencil-alt'></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
