/**
 * Created by wython on 2017/5/27.
 */
import React from 'react';
import TravelTips from 'layouts/TravelTips';
import fetch from 'utils/fetcher';

export default class RecommendTips extends React.Component{
    state = {
        taskList: []
    };
    componentWillMount () {
        let that = this;
        fetch.get('/api/getTasks').then((result) => {
            if(result.retCode === '000000') {
                that.setState({
                    taskList: result.data
                })
            }
        })
    }
    render() {
        return (
            <div>
                <h2>
                    <span>旅游攻略推荐</span>
                </h2>
                <div className="tips-list-wrapper">
                    {
                        this.state.taskList.length ? this.state.taskList.map((item, index) => {
                            return <TravelTips key={index} item={item}/>
                        }): '暂无数据'
                    }
                </div>
            </div>
        )
    }
}