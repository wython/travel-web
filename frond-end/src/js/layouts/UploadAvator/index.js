/**
 * Created by wython on 2017/5/25.
 */
import { Upload, Icon, message } from 'antd';
import React from 'react';
import './uploadAvator.css';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

export default class Avatar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange = (info) => {
        let that = this;
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
            that.props.onDone && that.props.onDone(info.file.response);
        }
    };

    render() {
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                className="avatar-uploader"
                name="avatar"
                showUploadList={false}
                action="/api/upload"
                multipart={false}
                onChange={this.handleChange}
            >
                {
                    imageUrl ?
                        <img src={imageUrl} alt="" className="avatar" /> :
                        <Icon type="plus" className="avatar-uploader-trigger" />
                }
            </Upload>
        );
    }
}
