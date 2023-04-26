import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalEditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };

        // this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
        let user = this.props.currentUser;
        this.setState({
            id: user.id,
            email: user.email,
            password: 'hardCode',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address
        })
    }
    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({ ...copyState })
    }
    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    handleSaveChanges = ()=>{
        let isValid = this.checkValidateInput();
        if(isValid === true){
            this.props.editUser(this.state);
        }
    }
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.props.toggleFromParent}
                    className={this.props.className}
                    size='lg'
                >
                    <ModalHeader toggle={this.props.toggle}>Edit user</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input disabled type='text' value={this.state.email} onChange={(event) => { this.handleOnChangeInput(event, 'email') }}></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input disabled type='password' value={this.state.password} onChange={(event) => { this.handleOnChangeInput(event, 'password') }}></input>
                            </div>
                            <div className='input-container'>
                                <label>First Name</label>
                                <input type='text' value={this.state.firstName} onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}></input>
                            </div>
                            <div className='input-container'>
                                <label>Last Name</label>
                                <input type='text' value={this.state.lastName} onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}></input>
                            </div>
                            <div className='input-container max-w'>
                                <label>Address</label>
                                <input type='text' value={this.state.address} onChange={(event) => { this.handleOnChangeInput(event, 'address') }}></input>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className='px-3' color="primary" onClick={this.handleSaveChanges}>Save changes</Button>{' '}
                        <Button className='px-3' color="secondary" onClick={this.props.toggleFromParent}>Close</Button>
                    </ModalFooter>
                </Modal>
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
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);