/**
 * Created by wython on 2017/4/9.
 */

import React from 'react';
import {Input, Button, Row, Col, Icon, Card} from 'antd';
const Search = Input.Search;
import './tips.css';

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
                                发布攻略
                                </Button>
                            </Col>
                        </Row>

                    </header>
                </div>
                <div className="tips-recommdend_wrapper">

                </div>
            </div>
        )
    }
}

module.exports = Tips;