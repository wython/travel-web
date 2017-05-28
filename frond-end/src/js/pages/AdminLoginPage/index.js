/**
 * Created by wython on 2017/5/17.
 */
import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import {hashHistory} from 'react-router';
import './adminLogin.css'
const FormItem = Form.Item;
import fetch from 'utils/fetcher'

class AdminLoginPage extends React.Component{
    constructor(props) {
        super(props);
    }
    handleSubmit(e) {
        e.preventDefault();
        let that = this;
        let { setAdminUserData } = this.context.dispatches;
        let { form } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch.post('/api/admin/login', { data: values }).then(function (result) {
                    if(result.retCode === '000000') {
                        setAdminUserData(result.data);
                        hashHistory.push('/admin/app');

                    } else {
                        console.log('fuck');
                        form.setFields({
                            password: {
                                value: values.password,
                                errors: [new Error(result.retMsg)]
                            }
                        })
                    }
                })
            }
        });
    }
    usernameBlur(e) {
        let { form } = this.props;
        let value = e.target.value;
        fetch.post('/api/admin/checkUsername', {
            data: {
                username: value
            }
        }).then((res) => {
            if(res.retCode === '000000') {
                form.setFields({
                    userName: {
                        value: value,
                        errors: [new Error('用户名不存在')]
                    }
                })
            }
        }).catch((err) => {
            alert(err);
        });
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="admin-login-wrapper">
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <h1>在线旅游后台管理系统</h1>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user"
                                                 style={{ fontSize: 13 }} />}
                                   onBlur={this.usernameBlur.bind(this)}
                                   placeholder="请输入用户名" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock"
                                                 style={{ fontSize: 13 }} />}
                                   type="password"
                                   placeholder="请输入密码" />
                        )}
                    </FormItem>
                    <FormItem>
                        <a className="login-form-forgot" href="">忘记密码</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}
AdminLoginPage.contextTypes = {
    adminUserData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};
AdminLoginPage = Form.create()(AdminLoginPage);
module.exports = AdminLoginPage;