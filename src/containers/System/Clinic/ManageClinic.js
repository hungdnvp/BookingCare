import React from 'react';
import { connect } from 'react-redux';
import './ManageClinic.scss';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import CommonUtils from "../../../utils/CommonUtils";
import { toast } from 'react-toastify';
import { createClinic } from '../../../services/userService';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: ''
        };

    }

    componentDidMount() {

    }
    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state }
        stateCopy[id] = event.target.value;
        this.setState({ ...stateCopy })
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }
    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            })
        }
    }
    handleSaveClinic = async () => {
        let res = await createClinic(this.state)
        if (res.errCode === 0) {
            toast.success('Thêm chuyên khoa thành công !')
            this.setState({
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            })
        } else {
            toast.error('Thêm chuyên khoa không thành công')
        }
    }
    render() {
        return (
            <div className='manage-specialty-container'>
                <div className='ms-title'>Quản lý phòng khám</div>
                <div className='add-new-specialty'>
                    <div className='col-6 form-group'>
                        <label>Tên phòng khám</label>
                        <input
                            className='form-control'
                            value={this.state.name}
                            onChange={(event) => this.handleOnChangeInput(event, 'name')}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Địa chỉ phòng khám</label>
                        <input
                            className='form-control'
                            value={this.state.address}
                            onChange={(event) => this.handleOnChangeInput(event, 'address')}
                        ></input>
                    </div>
                    <div className='col-6 form-group'>
                        <label>Ảnh phòng khám</label>
                        <input
                            className='form-control-file' type='file'
                            onChange={(event) => this.handleOnChangeImage(event)}
                        ></input>
                    </div>
                    <div className='col-12'>
                        <MdEditor style={{ height: '500px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                    <div className='col-12'>
                        <button className='btn-save'
                            onClick={this.handleSaveClinic}
                        >Save</button>
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);