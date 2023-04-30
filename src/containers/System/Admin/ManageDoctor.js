import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
//import { getUser, createNewUserService, deleteUserService, editUserService } from '../../../services/userService';
import * as actions from "../../../store/actions";
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: '',
            description: '',
            allDoctors: []
        }
    }

    async componentDidMount() {
        this.props.fetchAllDoctor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect = this.buildOption(this.props.allDoctors);
            this.setState({
                allDoctors: dataSelect
            })
        }
        


    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        })
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };
    handleSaveEditDoctor = () => {
        this.props.saveDoctor({
            contentHTML: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            doctorId: this.state.selectedOption.value
        })
    }
    handleChangeDesc = (event) => {
        this.setState({
            description: event.target.value
        })
    }
    buildOption = (inputData)=>{
        let result = []
        if(inputData && inputData.length >0){
            inputData.map((item,index)=>{
                let obj = {};
                obj.label = `${item.lastName} ${item.firstName}`;
                obj.value = item.id;
                result.push(obj)

            })
        }
        return result;
    }
    render() {
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Thêm thông tin bác sĩ
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            defaultValue={this.state.selectedOption}
                            onChange={this.handleChange}
                            options={this.state.allDoctors}
                        />
                    </div>
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows='4'
                            onChange={(event) => this.handleChangeDesc(event)}
                            value={this.state.description}
                        >
                        </textarea>
                    </div>
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange} />
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
        allDoctors: state.admin.alldoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
        saveDoctor: (inforDoctor) => dispatch(actions.saveInforDoctorAction(inforDoctor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
