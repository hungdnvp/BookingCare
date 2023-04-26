import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };

        // this.toggle = this.toggle.bind(this);
        this.listenEmitter();
    }

    listenEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address: '',
            })
        })
    }
    handleOnChangeInput = (event, type) => {
        let copyState = { ...this.state };
        copyState[type] = event.target.value;
        this.setState({ ...copyState })
    }
    handleAddNew = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            this.props.createNewUser(this.state);
        }
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

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.props.toggleFromParent}
                    className={this.props.className}
                    size='lg'
                >
                    <ModalHeader toggle={this.props.toggle}>Create new user</ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input type='text' value={this.state.email} onChange={(event) => { this.handleOnChangeInput(event, 'email') }}></input>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password' value={this.state.password} onChange={(event) => { this.handleOnChangeInput(event, 'password') }}></input>
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
                        <Button className='px-3' color="primary" onClick={this.handleAddNew}>Add new</Button>{' '}
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
export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);