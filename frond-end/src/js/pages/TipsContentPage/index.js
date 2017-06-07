/**
 * Created by wython on 2017/5/27.
 */
import React from 'react';
import './task.css';
import fetch from 'utils/fetcher';
import {Form, Input,Button} from 'antd';

class TipsContentPage extends React.Component{
    constructor(props) {
        super(props);
    }
    state = {
        task: ''
    }
    componentWillMount() {
        console.log(this.props.params.tid);
        let that = this;
        fetch.get('/api/get/task', {
            data: {
                id: this.props.params.tid
            }
        }).then((res) => {
            console.log(res);
            if(res.retCode === '000000') {
                that.setState({
                    task: res.data
                })
            }
        })
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
                                <Input type="textarea" rows={8} placeholder="请输入你的评论"/>
                            </Form.Item>
                            <Button size="large">发布评论</Button>
                        </Form>
                    </div>
                </div >

            </div>
        )
    }
}


module.exports = TipsContentPage;