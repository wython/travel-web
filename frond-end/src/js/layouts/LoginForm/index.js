/**
 * Created by wython on 2017/4/5.
 */
import React from 'react'
import {Form, Input ,Button, Icon, Checkbox} from 'antd'
import './login.css'
import fetch from 'utils/fetcher'


const FormItem = Form.Item;
class LoginForm extends React.Component{
    constructor(props) {
        super(props);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch.post('/api/login', { data: values }).then(function (result) {
                    console.log(result);
                })
            }
        });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住我</Checkbox>
                    )}
                    <a className="login-form-forgot">忘记密码</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                    </Button>
                    或者 <a>马上注册!</a>
                </FormItem>
            </Form>
        )
    }
}

export default Form.create({})(LoginForm);
