/**
 * Created by wython on 2017/6/5.
 */
import React from 'react'
import './user.css';
import {Menu, Form, Button, message} from 'antd';
import {hashHistory} from 'react-router';
const FormItem = Form.Item;

class UserPage extends React.Component{
    state = {
        realName: '',
        sex: '',
        email: '',
        phone: '',
        nickName: '',
        headPic: ''
    };
    componentWillMount() {
        if(!this.context.userData.username) {
            hashHistory.push('/')
            message.info('请新登录')
        } else {
            console.log(this.context.userData)
            this.setState(this.context.userData);
        }
    }
    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 6,
                },
            },
        };
        return (
            <div className="user-page">
                <h1>个人中心</h1>
                <div className="user-wrapper">
                    <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                        <Menu.Item key="1">
                            个人头像
                        </Menu.Item>
                    </Menu>
                    <div className="user-content">
                        <span>
                            <img src={this.state.headPic || require('assets/default.png')}/>
                        </span>

                    </div>
                </div>
                <div className="user-wrapper">
                    <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
                        <Menu.Item key="1">
                            基本资料
                        </Menu.Item>
                    </Menu>
                    <div className="user-content">
                        <Form>
                            <FormItem {...formItemLayout} label="真实姓名">
                                {
                                    this.state.realName ? this.state.realName : '未设置'
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="性别">
                                {
                                    this.state.sex ? this.state.sex : '未设置'
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="邮箱">
                                {
                                    this.state.email ? this.state.email : '未设置'
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="手机号码">
                                {
                                    this.state.phone ? this.state.phone: '未设置'
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="昵称">
                                {
                                    this.state.name ? this.state.name : '未设置'
                                }
                            </FormItem>
                            <Button>编辑</Button>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

UserPage.contextTypes = {
    userData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};
module.exports = UserPage;