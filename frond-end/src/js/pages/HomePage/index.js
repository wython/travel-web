/**
 * Created by wython on 2017/3/25.
 */

import React from 'react';
import { Carousel, Button, Icon } from 'antd';
import './homepage.css';

class HomePage extends React.Component {
    render() {
        return (
            <div className="home-page">
                <div className="banner-wrapper" id="banner-wrapper">
                    <Carousel className="banner"
                              autopaly
                    >
                        <div><a><img/></a></div>
                        <div>2</div>
                        <div>3</div>
                        <div>4</div>
                    </Carousel>
                </div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

module.exports = HomePage;
