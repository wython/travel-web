/**
 * Created by wython on 2017/5/23.
 */
import React from 'react';
import {hashHistory} from 'react-router';
import WangEditor from 'components/WangEditor';
import './publishPage.css';
import {Input, Button, message} from 'antd';
import fetch from 'utils/fetcher';

class PublishPage extends React.Component{
    state = {
        formData: {
            title: '',
            content: '',
            destination: ''
        }
    };


    setTitle = (e) => {
        this.state.formData.title = e.target.value;
    };
    setContent = (data) => {
        this.state.formData.content = data;
    };
    setDestination = (e) => {
        this.state.formData.destination = e.target.value;
    };
    handleSubmit = () => {
        this.state.formData.user = this.context.userData.username;
        console.log(this.context.userData.username);
        fetch.post('/api/publish', {
            data: this.state.formData
        }).then((res) => {
            if(res.retCode === '000000') {
                message.success('发布成功');
                hashHistory.push('tips')
            }
        })
    };
    render () {
        return (
            <div className="publish-page">
                <h1>编辑游记</h1>

                <div className="publish-title-wrapper">
                    <Input onChange={this.setTitle}
                           placeholder="请给你的游记起个名字"
                           className='publish-title_input'
                           size="large"/>
                </div>
                <div className="publish-title-wrapper">
                    <Input placeholder="目的地"
                           onChange={this.setDestination}
                           className="publish-title_input"
                           size="large"/>
                </div>
                <div className="publish-title-wrapper" >
                    <WangEditor onChange={this.setContent} id="publish-tips"/>
                    <Button size='large' onClick={this.handleSubmit} style={{ marginTop: '20px'}}>提交</Button>
                </div>
            </div>
        )
    }
}

PublishPage.contextTypes = {
    userData: React.PropTypes.object
};
module.exports = PublishPage;