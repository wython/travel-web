/**
 * Created by wython on 2017/6/8.
 */
import React from 'react';
import fetch from 'utils/fetcher';
import './recommend.css';
import {Link} from 'react-router';

class RecommendBox extends React.Component{
    state = {
        recommendList: []
    }
    componentWillMount() {
        fetch.get('/api/get/recommendTravels', {}).then((res) => {
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
                                    <img style={{width: '100%'}} src={item.travelPic}/>
                                </div>
                                <Link to={"/t/" + item.id}>
                                    <h5>
                                        {item.name.substr(0, 28) + '...'}
                                    </h5>
                                </Link>

                                <p style={{padding: 0}}>
                                    <span className="fate"> ¥{item.fate}</span> 起
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
