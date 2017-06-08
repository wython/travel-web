/**
 * Created by wython on 2017/6/7.
 */
import React from 'react';
import './order.css'
import {Alert, Steps, Form, DatePicker, message, Button} from 'antd';
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

        let that = this;
        if(this.props.params.id) {
            fetch.get('/api/order/get/travel', {
                data: {
                    id: this.props.params.id
                }
            }).then((res) => {

                order = res.order;
                if(!this.context.userData.username) {
                    hashHistory.push('/')
                    message.info('请先登录')
                }
                this.setState({
                    orderId: this.props.params.id,
                    order: res.order,
                    index: 1
                })
            })

        } else {
            if(!(order.name && this.context.userData.username)) {
                hashHistory.push('/')
                message.info('请先登录')
            } else {
                that.setState({
                    order
                })
            }
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
            if(result.retCode === '000000') {
                this.setState({
                    orderId: result.data.id,
                    index: 1
                })
            }
        })

    }
    paySuccess(e) {
        fetch.post('/api/order/pay', {
            data: {
                id: this.state.orderId
            }
        }).then((res) => {
            if(res.retCode === '000000') {
                this.setState({
                    index: 2
                })
            }
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
                    <div className="step-2">
                        <h1>收银台</h1>
                        <p className="order-mess">
                            <ul>
                                <li><bold>订单编号:</bold> {this.state.orderId ? this.state.orderId: '数据异常'}</li>
                                <li><bold>订单订单类型:</bold> 旅游路线</li>
                            </ul>
                            <div><h4>应付金额： ¥ { this.state.order.fate + 100 }</h4></div>
                        </p>
                        <p className="pay-p">
                            <img className="weixin-pay" src={require('assets/WePayLogo.png')}/>
                            <img className="weixin-commend" src={require('assets/commend.png')}/>
                            <span className="weixin-des">亿万用户的选择</span>
                        </p>
                        <div className="pay-two-wrapper">
                            <ul>
                                <li>
                                    <img className="pay-two" src={require('assets/two.png')}/>
                                </li>
                                <li>
                                    <img className="pay-des" src={require('assets/des.png')}/>
                                </li>
                            </ul>

                        </div>
                        <p style={{width: '100%',display: 'flex', justifyContent: 'center'}}>
                            <Button onClick={this.paySuccess.bind(this)} style={{margin: 'auto'}} size="large">
                                支付完成
                            </Button>
                        </p>
                    </div>
                )
            case 2:
                return (
                    <div>
                        <Alert message="恭喜你，支付成功"
                               description="您已支付成功，可在订单中心查看"
                               style={{
                                   height: '100px'
                               }}
                               type="success" showIcon/>
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
