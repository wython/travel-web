/**
 * Created by wython on 2017/4/9.
 */

import React from 'react';
import {Input, Button, Row, Col, Icon, Card} from 'antd';
const Search = Input.Search;
import './tips.css';
import TravelTips from 'layouts/TravelTips';

class Tips extends React.Component{
    render() {
        return (
            <div className="tips-page">
                <div className="margin-fix">
                    <header className="tips-page_header">
                        <Row type='flex' align='middle' className="tips-row">
                            <Col className="tips-col" span={12}></Col>
                            <Col className="tips-col" span={8}>
                                <Search className="tips-search"/>
                            </Col>
                            <Col className="tips-col" span={4}>
                                <Button type="primary" className="tips-publish_button">
                                    <Icon type="edit" />
                                编写攻略
                                </Button>
                            </Col>
                        </Row>

                    </header>
                </div>
                <div className="tips-recommdend_wrapper">
                    <h2>
                        <span>旅游攻略推荐</span>
                    </h2>
                    <div className="tips-list-wrapper">
                        <TravelTips/>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = Tips;