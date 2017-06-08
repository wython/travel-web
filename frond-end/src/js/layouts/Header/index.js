/**
 * Created by wython on 2017/3/25.
 */
import React from 'react';
import {Dropdown, Row, Col, Menu, Button, Input, Modal, Popover} from 'antd';
const Search = Input.Search;
import fetch from 'utils/fetcher';
import './header.css';
import {Link, hashHistory} from 'react-router'

import LoginForm from '../LoginForm'
import Register from '../Register'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formModal: false,
            type: '登陆',
            defaultFace: require('assets/default.png')
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
    logOut(e) {
        let {delUserData} = this.context.dispatches;
        fetch.get('/api/logout', {}).then((res) => {
            delUserData();
            hashHistory.push('/')
        }).catch((err) => {
            console.log(err);
        })
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
                                                {
                                                    this.context.userData.username ?
                                                        <div className="login-face-wrapper">
                                                            <Dropdown overlay={
                                                                <Menu>
                                                                    <Menu.Item>
                                                                        <Link to="car">
                                                                            订单中心
                                                                        </Link>
                                                                    </Menu.Item>
                                                                    <Menu.Item>
                                                                        <Link to="user">
                                                                            个人中心
                                                                        </Link>
                                                                    </Menu.Item>
                                                                    <Menu.Item>
                                                                        <a onClick={this.logOut.bind(this)}>退出登陆</a>
                                                                    </Menu.Item>
                                                                </Menu>
                                                            }>
                                                                <a>
                                                                    <img src={this.context.userData.headPic || this.state.defaultFace}/>
                                                                </a>
                                                            </Dropdown>
                                                        </div>
                                                        :
                                                        <div className="unlogin-wrapper">
                                                            <span className="login-span">
                                                                <a onClick={this.showLoginForm.bind(this)}>
                                                                    登陆
                                                                </a>
                                                            </span>
                                                            <Button onClick={this.showRegisterForm.bind(this)}>
                                                                注册
                                                            </Button>
                                                        </div>
                                                }

                                                <div>

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

Header.contextTypes = {
    userData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};
export default Header;