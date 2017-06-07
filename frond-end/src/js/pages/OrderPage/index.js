/**
 * Created by wython on 2017/6/7.
 */
import React from 'react';
import './order.css'
import {Steps, Form, DatePicker, message, Button} from 'antd';
import {hashHistory} from 'react-router'
import fetch from 'utils/fetcher';

const Step = Steps.Step;
const FormItem = Form.Item;

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
class OrderPage extends React.Component{
    state = {
        index: 0
    }
    componentWillMount() {
        let order = this.context.dispatches.getState().orderData;
        console.log(this.context.dispatches.getState());
        let that = this;
        if(!(order.name && this.context.userData.username)) {
            hashHistory.push('/')
            message.info('请先登录')
        } else {
            that.setState({
                order
            })
        }
    }
    clickStep1(e) {
        fetch.post('/api/order/create', {
            data: {
                username: this.context.userData.username,
                id: this.state.order.id,
                beginTime: this.state.order.time.format()
            }
        }).then((result) => {
            console.log('result', result);
            if(result.retCode === '000000') {

            }
        })
        this.setState({
            index: 1
        })
    }
    getComponent(index) {
        switch (index) {
            case 0:
                return (
                    <div>
                        <Form >
                            <FormItem {...formItemLayout} label="线路名称">
                                {
                                    this.state.order ? this.state.order.name : '数据异常'
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="优惠价">
                                {
                                    this.state.order ? (this.state.order.fate + ' 元') : '数据异常'
                                }

                            </FormItem>
                            <FormItem {...formItemLayout} label="出发时间">
                                {
                                    this.state.order ? <DatePicker defaultValue={this.state.order.time}/> : '数据异常'
                                }
                            </FormItem>
                            <FormItem {...formItemLayout} label="总计费用">
                                {
                                    this.state.order ? (this.state.order.fate + 100 + '元') : '数据异常'
                                }
                            </FormItem>
                        </Form>
                        <Button onClick={this.clickStep1.bind(this)}>确定</Button>
                    </div>
                )
            case 1:
                return (
                    <div>
                        <h1>收银台</h1>
                    </div>
                )
        }
    }
    render() {

        return (
            <div className="order-page">
                <Steps current={this.state.index}>
                    <Step title="支付信息确认"/>
                    <Step title="准备支付"/>
                    <Step title="支付完成"/>
                </Steps>

                <div className="order-wrapper">
                    {
                        this.getComponent(this.state.index)
                    }
                </div>
            </div>
        )
    }
}

OrderPage.contextTypes = {
    userData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};

module.exports = OrderPage;
