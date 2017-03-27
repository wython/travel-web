/**
 * Created by wython on 2017/3/25.
 */
import React from 'react';
import {Row, Col} from 'antd';
import './header.css';

export default class Header extends React.Component {
    render() {
        return (
            <header className="header">
                <Row>
                    <Col span={5}>
                        <a id="logo">
                            <img alt="logo" src={require('assets/soul-logo.png')}/>
                            <span>在线旅游网</span>
                        </a>
                    </Col>
                    <Col span={19}/>
                </Row>
            </header>
        )
    }
}