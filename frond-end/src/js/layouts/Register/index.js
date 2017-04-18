/**
 * Created by wython on 2017/4/5.
 */
import React from 'react'
import { Form, Input, Tooltip, Icon,  Select, Checkbox, Button } from 'antd';
import fetch from 'utils/fetcher';
import {hashHistory} from 'react-router'
const FormItem = Form.Item;
const Option = Select.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const close = this.props.close;
        let {setUserData} = this.context.dispatches;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                fetch.post('/api/register', { data: values }).then(function (result) {
                    if(result.retCode === '000000') {
                        setUserData(result.data);
                        close();
                    } else {

                    }
                }).catch(function (err) {
                    alert(err);
                })
            }
        });
    };
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('请确认两个密码相同!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };
    usernameBlur(e) {
        let username = e.target.value;
        let that = this;
        fetch.post('/api/checkUsername', { data:{ username } }, function (result) {
            if(result.retCode !== '000000') {
                that.props.form.setFields({
                    username: {
                        value: username,
                        errors: [new Error('用户名已存在')]
                    }
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
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
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector" style={{ width: 65 }}>
                <Option value="86">+86</Option>
            </Select>
        );
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="用户名"
                    hasFeedback
                >
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user"
                                             style={{ fontSize: 13 }} />}
                               placeholder="请输入用户名"
                               onBlur={this.usernameBlur.bind(this)}
                        />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="邮箱地址"
                    hasFeedback
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: '请输入正确邮箱!',
                        }, {
                            required: true, message: '请输入邮箱!',
                        }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="密码"
                    hasFeedback
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入密码!',
                        }, {
                            validator: this.checkConfirm,
                        }],
                    })(
                        <Input type="password" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="确认密码"
                    hasFeedback
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请确认你的密码!',
                        }, {
                            validator: this.checkPassword,
                        }],
                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={(
                        <span>
                            昵称&nbsp;
                            <Tooltip title="您希望别人怎么称呼您?">
                            <Icon type="question-circle-o" />
                            </Tooltip>
                        </span>
                    )}
                    hasFeedback
                >
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="手机"
                >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: '请输入你的手机号码!' }],
                    })(
                        <Input addonBefore={prefixSelector} />
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                    {getFieldDecorator('agreement', {
                        valuePropName: 'checked',
                    })(
                        <Checkbox>我同意--<a>协议内容</a></Checkbox>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">开始注册</Button>
                </FormItem>
            </Form>
        );
    }
}
RegistrationForm.contextTypes = {
    dispatches: React.PropTypes.object
};
export default Form.create({})(RegistrationForm);
