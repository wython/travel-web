/**
 * Created by wython on 2017/5/27.
 */
import React from 'react';
import './task.css';
import fetch from 'utils/fetcher';
import {Form, Input,Button, message} from 'antd';
import CommentBox from 'layouts/CommentBox';

class TipsContentPage extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        task: '',
        comments: []
    }
    componentWillMount() {
        console.log(this.props.params.tid);
        let that = this;
        fetch.get('/api/get/task', {
            data: {
                id: this.props.params.tid
            }
        }).then((res) => {
            if(res.retCode === '000000') {
                that.setState({
                    task: res.data
                })
            }
        });
        //get task
        fetch.get('/api/get/comments', {
            data: {
                id: this.props.params.tid
            }
        }).then((result) => {
            this.setState({
                comments: result.data
            })
        })
    }
    comment() {
        if(!this.context.userData.username) {
            message.info('请先登录')
        } else {
            fetch.post('/api/post/comment', {
                data: {
                    username: this.context.userData.username,
                    comment: this.state.comment,
                    task: this.props.params.tid
                }
            }).then((result) => {
                if(result.retCode === '000000') {
                    message.success('评论成功');
                    this.state.comments.unshift(result.data);
                    let list = this.state.comments;
                    this.setState({
                        comments: [...list]
                    })
                }
            })
        }
    }
    render () {
        let task = this.state.task;
        //const { getFieldDecorator } = this.props.form;
        return (
            <div className="task-content_wrapper">
                <div className="task-title">
                    <h1>
                        {task.title}
                    </h1>
                    <p className="task-mess">
                        <span>作者: {task.user}</span>
                        <span>{task.createdAt}</span>
                        <span className="task-destination">目的地: {task.destination}</span>
                    </p>
                </div>
                <p className="task-content" dangerouslySetInnerHTML={{__html: task.content}}>
                </p>
                <h1>~THE END~</h1>
                <div className="commend-box" >
                    <div className="task-content">

                        <h2 style={{fontSize: '30px'}}>评论：</h2>
                        <Form>
                            <Form.Item>
                                <Input onChange={(e) => {this.setState({ comment: e.target.value })}} type="textarea" rows={8} placeholder="请输入你的评论"/>
                            </Form.Item>
                            <Button size="large" onClick={this.comment.bind(this)}>发布评论</Button>
                        </Form>
                    </div>
                </div >
                <div className="comment-wrapper">
                    <CommentBox tid={this.props.params.tid} comments={this.state.comments}/>
                </div>

            </div>
        )
    }
}

TipsContentPage.contextTypes = {
    userData: React.PropTypes.object
};

module.exports = TipsContentPage;