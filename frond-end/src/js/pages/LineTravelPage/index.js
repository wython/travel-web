/**
 * Created by wython on 2017/5/22.
 */
import React from 'react';
import './line.css';
import {DatePicker} from 'antd';
import {Row, Col, Form, Input, Button} from 'antd';
const FormItem = Form.Item;

class LineTravelPage extends React.Component{
    componentWillMount () {
        console.log(this.props.params.tid);
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
                    <h1>黄果树大瀑布;荔波小七孔;西江苗塞;青岩石古镇5日游</h1>
                    <div>
                        <Row className='travel-item-row'>
                            <Col span={12}>
                                <img/>
                            </Col>
                            <Col span={12}>
                                <ul>
                                    <li>门市价: ¥<del>1499</del></li>
                                    <li>优惠价: ¥<span className="favourable">1399</span> 起</li>
                                    <li>发团日期: 5</li>
                                    <li>出发城市: 贵阳</li>
                                    <li>行程天数: 5天</li>
                                    <li>交通方式: 专车接送</li>
                                    <li>产品须知: <span className="favourable">本路线*****</span></li>
                                </ul>
                                <div className="pay-box">
                                    <Form >
                                        <FormItem {...tailFormItemLayout} label="选择日期">
                                            <DatePicker/>
                                        </FormItem>
                                        <FormItem {...tailFormItemLayout} label=' '>
                                            <Button>立即预订</Button>
                                        </FormItem>
                                    </Form>
                                </div>
                            </Col>
                        </Row>

                    </div>
                </div>
            </div>
        )
    }
}

module.exports = LineTravelPage;