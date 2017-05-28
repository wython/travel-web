/**
 * Created by wython on 2017/5/23.
 */
import React from 'react';
const wangEditor = require('wangeditor');

export default class Editor extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            style: {
                width: '100%',
                height: '400px'
            }
        }
    }
    // 编辑器样式
    render() {
        return (
            <div>
                <div id={this.props.id} style={this.state.style} contentEditable="true">

                </div>
            </div>
        );
    }
    componentDidMount () {
        var id = this.props.id;
        this.editor = new wangEditor(id);
        this.editor.config.uploadImgUrl = '/api/upload';
        this.editor.create();
        let editor = this.editor;
        this.editor.config.uploadImgFns.onload = (res, xhr) => {
            console.log(res);
            let result = JSON.parse(res);
            if(result.retCode === '000000') {
                editor.command(null, 'insertHtml', '<img src="' + result.url + '" style="max-width:100%;"/>')
            }
        };
        let that = this;
        editor.onchange = () => {
            that.props.onChange && that.props.onChange(editor.$txt.html());
        }
    }
};
