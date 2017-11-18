/**
 * Created by wython on 2017/3/25.
 */

import React from 'react';
import { Carousel, Button, Icon } from 'antd';
import './homepage.css';
import fetch from 'utils/fetcher'
import RecommendBox from 'layouts/RecommendBox';
import RecommendHotelBox from 'layouts/RecommendHotelBox';
import RecommendTips from "layouts/RecommendTips";

class HomePage extends React.Component {
    state = {
        dataSource: []
    }
    getPhoto = () => {
        let that = this;
        fetch.get('/api/admin/homePhoto', { data: {}}).then((result) => {
            if(result.retCode === '000000') {
                that.setState({
                    dataSource: result.data
                })
            } else {

            }
        })
    };
    componentWillMount() {
        this.getPhoto()
    }

    render() {
        return (
            <div className="home-page">
                <div className="banner-wrapper" id="banner-wrapper">
                    <Carousel className="banner"
                              autoplay={true}
                    >
                        {
                            this.state.dataSource.length ?
                                this.state.dataSource.map((item) =>
                                    (<div>
                                        <a href={item.href}>
                                            <img style={{ margin: 'auto' }} width="100%" height='340px' className="home-img" src={item.imgUrl}/>
                                        </a>
                                    </div>)):
                                <div><h1>暂无数据</h1></div>
                        }
                    </Carousel>
                </div>
                <div className="home-content_wrapper">
                    <div className="commend-wrapper">
                        <h1>
                            <span className="commend-title">旅游路线推荐</span>
                        </h1>
                        <p><RecommendBox/></p>
                    </div>
                    <div className="commend-wrapper">
                        <h1>
                            <span className="commend-title">酒店推荐</span>
                        </h1>
                        <p><RecommendHotelBox/></p>
                    </div>
                    <div className="commend-wrapper last_commend">
                        <p>
                            <RecommendTips/>
                        </p>
                    </div>
                </div>

            </div>
        )
    }
}

module.exports = HomePage;
