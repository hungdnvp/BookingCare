import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import { getUser, createNewUserService, deleteUserService, editUserService } from '../../../services/userService';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}


class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listUser: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllUser();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUser !== this.props.listUser) {
            this.setState({
                listUser: this.props.listUser
            })
        }
    }

    handleDeleteUser = (id) =>{
        this.props.deleteUser(id);
    }
    handleEditUser = (user) =>{
        this.props.handleEditUserKey(user)
    }
    render() {
        let arrUser = this.state.listUser;
        return (
            <React.Fragment>
                <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUser && arrUser.length > 0 &&
                        arrUser.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}
                                        ><i className='fas fa-pencil-alt'></i></button>
                                        <button className='btn-delete'
                                            onClick={()=>this.handleDeleteUser(item.id)}>
                                            <i className='fas fa-trash'></i>
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}

                </tbody>
                </table>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUser: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllUser: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
