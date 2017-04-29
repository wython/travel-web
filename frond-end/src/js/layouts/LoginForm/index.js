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
        let that = this;
        let {setUserData} = this.context.dispatches;
        let { form } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                fetch.post('/api/login', { data: values }).then(function (result) {
                    if(result.retCode === '000000') {
                        setUserData(result.data);
                        that.props.close();
                    } else {
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
        fetch.post('/api/checkUsername', {
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
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem >
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input onBlur={this.usernameBlur.bind(this)}
                               prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                               placeholder="请输入用户名" />
                    )}
                </FormItem>
                <FormItem >
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                               type="password"
                               placeholder="请输入密码" />
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

LoginForm.contextTypes = {
    userData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};
export default Form.create({})(LoginForm);
