
import React from 'react';
import {Row, Col, Menu} from 'antd';
import './footer.css';
import {Link} from 'react-router'


export default class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer-content">
                    <span>Copyright 2013-2016 wython</span>
                </div>
                <div className="footer-float">
                    <div className="footer-power">POWERED BY</div>
                    <span className="footer-power-name">WYTHON</span>
                </div>
            </footer>
        )
    }
}