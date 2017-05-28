/**
 * Created by wython on 2017/4/9.
 */

import React from 'react';
import {hashHistory} from 'react-router';
import {Input, Button, Row, Col, Icon, Card} from 'antd';
const Search = Input.Search;
import './tips.css';
import RecommendTips from 'layouts/RecommendTips';

class Tips extends React.Component{
    constructor(props) {
        super(props)
    }
    toPublish(e) {
        hashHistory.push('/publish');
    }
    render() {
        return (
            <div className="tips-page">
                <div className="margin-fix">
                    <header className="tips-page_header">
                        <Row type='flex' align='middle' className="tips-row">
                            <Col className="tips-col" span={12}/>
                            <Col className="tips-col" span={8}>
                                <Search className="tips-search"/>
                            </Col>
                            <Col className="tips-col" span={4}>
                                <Button type="primary" className="tips-publish_button" onClick={this.toPublish.bind(this)}>
                                    <Icon type="edit" />
                                编写攻略
                                </Button>
                            </Col>
                        </Row>

                    </header>
                </div>
                <div className="tips-recommdend_wrapper">
                    {
                        this.props.children ? this.props.children : <RecommendTips/>
                    }

                </div>
            </div>
        )
    }
}

module.exports = Tips;