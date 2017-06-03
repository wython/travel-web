/**
 * Created by wython on 2017/5/22.
 */

import React from 'react';
import './road.css';
import {Card, Rate} from 'antd';
import fetch from 'utils/fetcher';
import {Link} from 'react-router';

class HotelPage extends React.Component{
    state = {
        hotelList: []
    };
    componentWillMount() {
        let that = this;
        fetch.get('/api/get/hotels').then((result) => {
            if(result.retCode === '000000') {
                that.setState({
                    hotelList: result.data
                })
            }
        })
    }
    render() {
        return (
            <div className="travel-page-wrapper">
                <div className="recommend-travel-wrapper">
                    <h2>酒店推荐</h2>
                    <div>abc</div>
                </div>
                <div className="all-travel-wrapper">
                    <h2>所有酒店</h2>
                    <div className="travel-content">
                        {
                            this.state.hotelList.length ? this.state.hotelList.map((item, index) => {
                                return (
                                    <div key={index} className="card-wrapper">
                                        <Link to={"/h/" + item.id}>
                                            <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                                                <div className="custom-image">
                                                    <img alt="example" width="100%" height='240px' src={item.hotelPic} />
                                                </div>
                                                <div className="custom-card">
                                                    <h3>{item.hotelName}</h3>
                                                    <p>酒店星级:<Rate value={item.hotelGrade} disabled/></p>
                                                    <p>酒店地址: {item.hotelPosition}</p>
                                                    <p>原价格: <del>{item.nomalPrice}</del></p>
                                                    <p>现价格: <span className="fate-color">{item.price}</span></p>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                )}) : '暂无数据'
                        }
                        <div className="clear-box"></div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = HotelPage;


