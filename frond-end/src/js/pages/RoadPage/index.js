/**
 * Created by wython on 2017/5/22.
 */

import React from 'react';
import './road.css';
import {Card} from 'antd';
import fetch from 'utils/fetcher';
import {Link} from 'react-router';
class RoadPage extends React.Component{
    state = {
        travelList: []
    }
    componentWillMount() {
        let that = this;
        fetch.get('/api/get/travel').then((result) => {
            if(result.retCode === '000000') {
                console.log(result.data);
                that.setState({
                    travelList: result.data
                })
            }
        })
    }
    render() {
        return (
            <div className="travel-page-wrapper">
                <div className="recommend-travel-wrapper">
                    <h2>旅游推荐</h2>
                    <div>abc</div>
                </div>
                <div className="all-travel-wrapper">
                    <h2>所有旅游路线</h2>
                    <div className="travel-content">
                        {
                            this.state.travelList.map((item, index) => {
                                return (
                                    <div key={index} className="card-wrapper">
                                        <Link to={"/t/" + item.id}>
                                            <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                                                <div className="custom-image">
                                                    <img alt="example" width="100%" height='240px' src={item.travelPic} />
                                                </div>
                                                <div className="custom-card">
                                                    <h3>{item.name}</h3>
                                                    <p>出发城市: {item.beginCity}</p>
                                                    <p>交通方式: {item.mode}</p>
                                                    <p>原价格: <del>{item.normalPrice}</del></p>
                                                    <p>现价格: <span className="fate-color">{item.fate}</span></p>
                                                </div>
                                            </Card>
                                        </Link>
                                    </div>
                                )})
                        }
                        <div className="clear-box"></div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = RoadPage;


