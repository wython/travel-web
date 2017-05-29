/**
 * Created by wython on 2017/5/28.
 */

import React from 'react';
import {Form, Input, DatePicker, InputNumber, Button, message} from 'antd';
import {hashHistory} from 'react-router';
import './addTravel.css';
import UploadAvator from 'layouts/UploadAvator';
import WangEditor from 'components/WangEditor';
import fetch from 'utils/fetcher';

class AddTravelPage extends  React.Component{
    state = {
    };
    handleEditorChange = (val) => {
        this.props.form.setFieldsValue({
            information: val
        })
    };
    addTravel = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err) {
                console.log(values);
                fetch.post('/api/add/travel', {
                    data: values
                }).then((res) => {
                   if(res.retCode === '000000') {
                       message.success('添加路线成功');
                       hashHistory.push('/admin/app/travel');
                   }
                })
            }
        })
    };
    handleUploadDone = (result) => {
        if(result.retCode === '000000') {
            this.props.form.setFieldsValue({
                travelPic: result.url
            })
        }
    };
    render() {
        const {getFieldDecorator} = this.props.form;
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
            <div className="admin-add_new_line">
                <h1>添加新的旅游路线</h1>
                <Form onSubmit={this.addTravel} className="add-new_line_form">
                    <Form.Item {...formItemLayout} label="路线名称">
                        {
                            getFieldDecorator('name', {
                                rules: [{required: true, message: '请输入旅游路线名称'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="出发城市">
                        {
                            getFieldDecorator('beginCity', {
                                rules: [{required: true, message: '请填写出发城市'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="出发时间">
                        {
                            getFieldDecorator('startTime', {
                                rules: [{required: true, message: '请输入出发时间'}]
                            })
                            (<DatePicker/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="目的地">
                        {
                            getFieldDecorator('position',{
                                rules: [{required: true, message: '请输入目的地'}]
                        })
                            (<Input/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="交通方式">
                        {
                            getFieldDecorator('mode', {
                                rules: [{required: true, message: '请输入交通方式'}]
                            })
                            (<Input/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="路线预览图">
                        {
                            getFieldDecorator('travelPic', {
                                rules: [{required: true, message: '请上传预览图'}]
                            })
                            (<Input style={{display: 'none'}}/>)
                        }
                        <UploadAvator onDone={this.handleUploadDone}/>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="原价格">
                        {
                            getFieldDecorator('normalPrice', {
                                rules: [{required: true, message: '请填写原价格'}]
                            })
                            (<InputNumber/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="优惠价格">
                        {
                            getFieldDecorator('fate', {
                                rules: [{required: true, message: '请填写优惠价格'}]
                            })
                            (<InputNumber/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="产品详情">
                        {
                            getFieldDecorator('descriptions', {
                                rules: [{required: true, message: '请填写产品详情'}]
                            })
                            (<Input type="textarea"/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="路线详细">
                        {
                            getFieldDecorator('information', {
                                rules: [{required: true, message: '请填写产品详情'}]
                            })
                            (<Input type="textarea" style={{display: 'none'}}/>)
                        }
                        <WangEditor onChange={this.handleEditorChange} id="add-travel-editor"/>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

AddTravelPage = Form.create({})(AddTravelPage);
module.exports = AddTravelPage;