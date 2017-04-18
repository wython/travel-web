/**
 * Created by wython on 2017/3/25.
 */
import React from 'react';
import {Row, Col, Menu, Button, Input, Modal} from 'antd';
const Search = Input.Search;
import './header.css';
import {Link} from 'react-router'

import LoginForm from '../LoginForm'
import Register from '../Register'

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formModal: false,
            type: '登陆'
        }
    }
    showLoginForm (e) {
        this.setState({
            formModal: true,
            type: '登陆'
        })
    }
    showRegisterForm (e) {
        this.setState({
            formModal: true,
            type: '注册'
        });
    }
    closeFormModal () {
        this.setState({
            formModal: false
        })
    }
    handleCancel(e) {
        this.closeFormModal();
    }
    render() {
        return (
            <header className="header">
                <Row>
                    <Col span={5}>
                        <Link id="logo">
                            <img alt="logo" src={require('assets/soul-logo.png')}/>
                            <span>在线旅游网</span>
                        </Link>
                    </Col>
                    <Col span={19}>
                        <Row>
                            <Col span={12}>
                                <Menu mode="horizontal" className="home-menu">
                                    <Menu.Item>
                                        <Link to="/">首   页</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/tips">旅游攻略</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/road">旅游路线</Link>
                                    </Menu.Item>
                                    <Menu.Item>
                                        <Link to="/hotal">酒店选择</Link>
                                    </Menu.Item>
                                </Menu>
                            </Col>
                            <Col span={12}>
                                <div className="user-status-wrapper">
                                    <div className="line-wrapper">
                                        <Row>
                                            <Col span={12}>
                                                <div className="search-wrapper">
                                                    <Search
                                                        placeholder="请输入要搜索内容"
                                                        style={{width:200}}
                                                    />
                                                </div>
                                            </Col>
                                            <Col span={12}>
                                                <div className="unlogin-wrapper">
                                                    <span className="login-span">
                                                        <a onClick={this.showLoginForm.bind(this)}>登陆</a>
                                                    </span>
                                                    <Button onClick={this.showRegisterForm.bind(this)}>注册</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>

                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal
                    visible={this.state.formModal}
                    title={this.state.type}
                    closable={true}
                    onCancel={this.handleCancel.bind(this)}
                    footer={null}
                >
                    {
                        this.state.type === '登陆'?
                            <div className="login-form-wrapper">
                                <LoginForm close={this.closeFormModal.bind(this)}/>
                            </div>:
                            <div className="register-form-wrapper">
                                <Register close={this.closeFormModal.bind(this)}/>
                            </div>
                    }
                </Modal>
            </header>
        )
    }
}