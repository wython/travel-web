/**
 * Created by wython on 2017/5/22.
 */
import React from 'react';
import '../LineTravelPage/line.css';
import {DatePicker,Rate} from 'antd';
import {Row, Col, Form , Button} from 'antd';
const FormItem = Form.Item;
import fetch from 'utils/fetcher';

class HotelMessage extends React.Component{
    state = {
        hotel: ''
    }
    componentWillMount () {
        let that = this;
        fetch.get('/api/get/hotel', {
            data: {
                id: this.props.params.hid
            }
        }).then((res) => {
            if(res.retCode === '000000') {
                that.setState({
                    hotel: res.data
                })
            } else {

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
                    <h1>{this.state.hotel.hotelName}</h1>
                    <div>
                        <Row className='travel-item-row'>
                            <Col span={12}>
                                <img src={this.state.hotel.hotelPic}/>
                            </Col>
                            <Col span={12}>
                                <ul>
                                    <li>门市价: ¥<del>{this.state.hotel.normalPrice}</del></li>
                                    <li>优惠价: ¥<span className="favourable">{this.state.hotel.price}</span> 起</li>
                                    <li>酒店地址: {this.state.hotel.hotelPosition}</li>
                                    <li>酒店星级: <Rate value={this.state.hotel.hotelGrade} disabled/></li>
                                    <li>产品须知: <span className="favourable">{
                                        this.state.hotel.descriptions
                                    }</span></li>
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

module.exports = HotelMessage;