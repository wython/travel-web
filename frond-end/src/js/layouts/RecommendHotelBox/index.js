/**
 * Created by wython on 2017/6/8.
 */
import React from 'react';
import fetch from 'utils/fetcher';
import {Rate} from 'antd';
import '../RecommendBox/recommend.css';
import {Link} from 'react-router';

class RecommendBox extends React.Component{
    state = {
        recommendList: []
    }
    componentWillMount() {
        fetch.get('/api/get/recommendHotels', {}).then((res) => {
            if(res.retCode === '000000') {
                this.setState({
                    recommendList: res.data
                })
            }
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.recommendList.map((item) => {
                        return (
                            <div className="recommend-travel-wrapper-1">
                                <div style={{width: '100%'}}>
                                    <img style={{width: '100%'}} src={item.hotelPic}/>
                                </div>
                                <Link to={"/h/" + item.id}>
                                    <h5>
                                        {item.hotelName.substr(0, 28) + '...'}
                                    </h5>
                                </Link>
                                <p style={{padding: 0}}>酒店星级:<Rate value={item.hotelGrade} disabled/></p>
                                <p style={{padding: 0}}>
                                    <span className="fate"> ¥{item.price}</span> 起
                                </p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default RecommendBox;
