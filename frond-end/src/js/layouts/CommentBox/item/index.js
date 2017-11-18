/**
 * Created by wython on 2017/6/9.
 */
import React from 'react';
import {Button, Input, message} from 'antd';
import fetch from 'utils/fetcher';

class CommentBox extends React.Component {
    state = {
        commentValue: '',
        inputVisible: false
    };
    inputChange(e) {
        this.setState({
            commentValue: e.target.value
        })
    }
    callback(e) {
        this.setState({
            inputVisible: !this.state.inputVisible
        })
    }
    closeInput() {
        this.setState({
            inputVisible: false
        })
    }
    render() {
        return (
            <div className="comment-item">
                <div className="comment-user-info">
                    <img className="face-img" src={this.props.item.user.headPic || require('assets/default.png')}/>
                    <span style={{fontSize: '20px'}}><bold>{this.props.item.user.username}</bold></span>
                </div>
                {
                    this.props.item.targetUser ?<p style={{padding: '40px', fontSize: '18px'}}>回复@ <span style={{color: 'blue'}}>{this.props.item.targetUser.username}</span></p> : ''
                }

                <div>
                    <p className="comment-content">
                        {
                            this.props.item.comment? this.props.item.comment.content : ''
                        }
                    </p>
                </div>
                <div style={{paddingLeft: '40px'}}>
                    <p style={{color: '#ccc'}}>发布于  <time>{this.props.item.comment.createdAt}</time>
                        <Button onClick={this.callback.bind(this)} style={{float:'right'}}>回复</Button><div style={{clear:'both'}}></div></p>
                    {
                        this.state.inputVisible ?
                            <div className="reComment-box">
                                <Input onChange={this.inputChange.bind(this)} placeholder="请输入回复" type='textarea'/>
                                <div style={{padding: '20px 20px 0', float: 'right'}}>
                                    <Button onClick={this.closeInput.bind(this)} style={{marginRight: '20px'}}>取消</Button>
                                    <Button onClick={(e) => {

                                        fetch.post('/api/post/commentRe' , {
                                            data: {
                                                username: this.context.userData.username,
                                                task: this.props.tid,
                                                targetComment: this.props.item.comment.id,
                                                content: this.state.commentValue
                                            }
                                        }).then((result) => {
                                            if(result.retCode === '000000') {
                                                message.success('回复成功')

                                            }
                                        })
                                    }
                                    }>确定</Button>
                                </div>
                                <div style={{clear:'both'}}></div>
                            </div>: ''
                    }
                </div>
            </div>
        )
    }
}
CommentBox.contextTypes = {
    userData: React.PropTypes.object
};
export default CommentBox