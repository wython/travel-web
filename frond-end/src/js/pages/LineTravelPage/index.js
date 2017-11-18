/**
 * Created by wython on 2017/5/22.
 */
import React from 'react';
import './line.css';
import {hashHistory} from 'react-router';
import {DatePicker, Tabs, message} from 'antd';
const TabPane = Tabs.TabPane;
import {Row, Col, Form, Input, Button} from 'antd';
const FormItem = Form.Item;
import fetch from 'utils/fetcher';

class LineTravelPage extends React.Component{
    state = {
        line: ''
    };
    componentWillMount () {
        let that = this;
        fetch.get('/api/get/line', {
            data: {
                id: this.props.params.tid
            }
        }).then((res) => {
            if(res.retCode === '000000') {
                that.setState({
                    line: res.data
                })
            } else {

            }
        })
    }
    goBug (e) {
        if(!(this.state.order && this.state.order.time)) {
            message.info('请选择时间')
        } else {
            this.context.dispatches.setOrder(this.state.order);
            hashHistory.push('order')
        }
    }
    dateChange(value) {
        this.setState({
            order: {
                id: this.state.line.id,
                name: this.state.line.name,
                fate: this.state.line.fate,
                time: value
            }
        })
    }
    render() {
        const tailFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return (
            <div>
                <div className="travel-item-box">
                    <h1>{this.state.line.name}</h1>
                    <div>
                        <Row className='travel-item-row'>
                            <Col span={12}>
                                <img src={this.state.line.travelPic}/>
                            </Col>
                            <Col span={12}>
                                <ul>
                                    <li>门市价: ¥<del>{this.state.line.normalPrice}</del></li>
                                    <li>优惠价: ¥<span className="favourable">{this.state.line.fate}</span> 起</li>
                                    <li>发团日期: {this.state.line.startTime}</li>
                                    <li>出发城市: {this.state.line.beginCity}</li>
                                    <li>行程天数: 5天</li>
                                    <li>交通方式: {this.state.line.mode}</li>
                                    <li>产品须知: <span className="favourable">{
                                        this.state.line.descriptions
                                    }</span></li>
                                </ul>
                                <div className="pay-box">
                                    <Form >
                                        <FormItem {...tailFormItemLayout} label="选择日期">
                                            <DatePicker onChange={this.dateChange.bind(this)}/>
                                        </FormItem>
                                        <FormItem {...tailFormItemLayout} label=' '>
                                            <Button onClick={this.goBug.bind(this)}>立即预订</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Col>
                        </Row>

                    </div>
                </div>
                <div className="travel-item-box" >
                    <Tabs>
                        <TabPane key="1" tab="路程详解">
                            <div dangerouslySetInnerHTML={{__html: this.state.line.information}}>

                            </div>
                        </TabPane>
                        <TabPane key="2" tab="在线"></TabPane>
                    </Tabs>
                </div>

            </div>
        )
    }
}

LineTravelPage.contextTypes = {
    userData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};

module.exports = LineTravelPage;