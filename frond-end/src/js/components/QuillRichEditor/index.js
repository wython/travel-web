/**
 * Created by wython on 2017/5/23.
 */
import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
export default class QuillRichEditor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            text: 'fuck',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline','strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image'],
                    ['clean']
                ],
                formats: [
                    'header',
                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                    'list', 'bullet', 'indent',
                    'link', 'image'
                ]
            }
        }
    }
    handleChange(value) {
        this.setState({ text: value })
    }
    render() {
        return (
            <ReactQuill value={this.state.text}
                        onChange={this.handleChange}
                        modules = {this.state.modules}
                        formats = {this.state.formats}
            />

        )
    }
}



