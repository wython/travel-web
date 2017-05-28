/**
 * Created by wython on 2017/5/19.
 */
import React from 'react';
import './adminNav.css';
import { Layout, Menu, Breadcrumb, Icon, Row, Col , Dropdown} from 'antd';
import fetch from 'utils/fetcher';
import WangEditor from 'components/WangEditor';
import {Link} from 'react-router';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;




class AdminNav extends React.Component {
    state = {
        collapsed: false,
        mode: 'inline',
        defaultFace: require('assets/default.png')
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };
    logOut(e) {
        let {delAdminUserData} = this.context.dispatches;
        fetch.get('/api/admin/logout', {}).then((res) => {
            delAdminUserData();
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className="admin-nav_wrapper">
                <Layout>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo" />
                        <Menu theme="dark" mode={this.state.mode} defaultSelectedKeys={['6']}>
                            <Menu.Item key="4">
                                <span>
                                    <Icon type="schedule" />
                                    <span className="nav-text">
                                        <Link className="menu-link" to="/admin/app/content">
                                            首页内容管理
                                        </Link>
                                    </span>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <span>
                                    <Icon type="home" />
                                    <span className="nav-text">
                                        <Link className="menu-link" to="/admin/hotal">
                                            酒店管理
                                        </Link>
                                    </span>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <span>
                                    <Icon type="car" />
                                    <Link className="menu-link" to="/admin/hotal">
                                            旅游路线管理
                                    </Link>
                                </span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <span>
                                    <Icon type="user" />
                                    <span className="nav-text">
                                        <Link className="menu-link" to="/admin/hotal">
                                            用户管理
                                        </Link>
                                    </span>
                                </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0 }} >
                            <Row>
                                <Col span={18}>

                                </Col>
                                <Col span={6}>
                                    <div className="login-face-wrapper">
                                        <div>
                                            <Dropdown overlay={
                                                <Menu>
                                                    <Menu.Item>
                                                        个人中心
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        <a >退出登陆</a>
                                                    </Menu.Item>
                                                </Menu>
                                            }>
                                                <a>
                                                    <img src={this.context.adminUserData.headPic || this.state.defaultFace}/>
                                                </a>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Breadcrumb style={{ margin: '12px 0' }}>
                                <Breadcrumb.Item>User</Breadcrumb.Item>
                                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                            </Breadcrumb>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                { this.props.children }
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            在线旅游网后台管理 ©2016 Created by wython
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
AdminNav.contextTypes = {
    adminUserData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};
export default AdminNav