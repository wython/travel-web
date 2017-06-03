/**
 * Created by wython on 2017/5/28.
 */

import React from 'react';
import {Form, Input, Rate, InputNumber, Button, message, Select} from 'antd';
import {hashHistory} from 'react-router';
import './addHotel.css';
import UploadAvator from 'layouts/UploadAvator';
import fetch from 'utils/fetcher';
const Option = Select.Option;

class AddHotelPage extends  React.Component{
    state = {
    };
    addTravel = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err) {
                console.log(values);
                fetch.post('/api/add/hotel', {
                    data: values
                }).then((res) => {
                   if(res.retCode === '000000') {
                       message.success('添加路线成功');
                       hashHistory.push('/admin/app/hotel');
                   }
                })
            }
        })
    };
    handleUploadDone = (result) => {
        if(result.retCode === '000000') {
            this.props.form.setFieldsValue({
                hotelPic: result.url
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
                <h1>添加新的酒店</h1>
                <Form onSubmit={this.addTravel} className="add-new_line_form">
                    <Form.Item {...formItemLayout} label="酒店名称">
                        {
                            getFieldDecorator('hotelName', {
                                rules: [{required: true, message: '请输入酒店名称'}]
                            })(<Input/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="酒店星级">
                        {
                            getFieldDecorator('hotelGrade',{
                                rules: [{required: true, message: '酒店星级'}]
                        })
                            (<Rate/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="酒店地址">
                        {
                            getFieldDecorator('hotelPosition', {
                                rules: [{required: true, message: '酒店地址'}]
                            })
                            (<Input/>)
                        }
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="酒店预览图">
                        {
                            getFieldDecorator('hotelPic', {
                                rules: [{required: true, message: '请上传预览图'}]
                            })
                            (<Input style={{display: 'none'}}/>)
                        }
                        <UploadAvator onDone={this.handleUploadDone}/>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="酒店类型">
                        {
                            getFieldDecorator('hotelType', {
                                rules: [{required: true, message: '请填写酒店类型'}]
                            })
                            (<Select showSearch placeholder="请选择酒店类型">
                                <Option key="long" value='long'>长住型</Option>
                                <Option key="travel" value='travel'>度假型</Option>
                                <Option key="car" value='car'>汽车型</Option>
                                <Option key="center" value='center'>市中心区酒店</Option>
                                <Option key="plane" value='plane'>机场酒店</Option>
                                <Option key="business" value='business'>商务酒店</Option>
                            </Select>)
                        }
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
                            getFieldDecorator('price', {
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
                    <Form.Item {...tailFormItemLayout}>
                        <Button htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

AddHotelPage = Form.create({})(AddHotelPage);
module.exports = AddHotelPage;