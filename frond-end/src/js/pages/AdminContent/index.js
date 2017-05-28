/**
 * Created by wython on 2017/5/25.
 */

import React from 'react';
import UploadAvator from 'layouts/UploadAvator';
import {Menu} from 'antd';
import HotalSetting from './Hotal';
import PhotoSetting from './Photo';
import TravelSetting from './Travel';

class AdminContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            current: 'photo',
        }
    }
    getComponent(val) {
        switch (val) {
            case 'photo':
                return <PhotoSetting/>;
            case 'travel':
                return <TravelSetting/>;
            case 'hotal':
                return <HotalSetting/>;
        }
    }
    handleClick = (e) => {
        this.setState({
            current: e.key
        })
    };
    render () {
        return (
            <div>
                <Menu mode="horizontal"
                      selectedKeys={[this.state.current]}
                      onClick={this.handleClick}
                >
                    <Menu.Item key="photo">
                        首页轮播图
                    </Menu.Item>
                    <Menu.Item key="hotal">
                        推荐酒店路线
                    </Menu.Item>
                    <Menu.Item key="travel">
                        推荐旅游路线
                    </Menu.Item>
                </Menu>
                {
                    this.getComponent(this.state.current)
                }
            </div>
        )
    }
}

module.exports = AdminContent;
