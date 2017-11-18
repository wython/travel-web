/**
 * Created by wython on 2017/5/28.
 */

import React from 'react';
import {Table} from 'antd';
import fetch from 'utils/fetcher';

function getSex(sex) {
    switch (sex) {
        case 0:
            return '男'
        case 1:
            return '女'
        default:
            return '未定义'
    }
}
const adminCol = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: '头像',
        dataIndex : 'headPic',
        key: 'headPic',
        render: (text, record) => {
            return (
                <img height="50px" src={text ? text: require('assets/default.png')}/>
            )
        }
    }
]
const col = [
    {
        title: '用户名',
        dataIndex: 'username',
        key: 'username'
    },
    {
        title: '头像',
        dataIndex : 'headPic',
        key: 'headPic',
        render: (text, record) => {
            return (
                <img height="50px" src={text ? text: require('assets/default.png')}/>
            )
        }
    },
    {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: (text, record) => {
            return (
                getSex(text)
            )
        }
    },
    {
        title: '邮件',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone'
    }
];
class AdminUsersPage extends  React.Component{
    state = {
        users: [],
        admins: []
    }
    componentWillMount() {
        fetch.get('api/get/all/users', {}).then((res) => {
            if(res.retCode === '000000') {
                this.setState({
                    users: res.users,
                    admins: res.admins
                })
            }
        })
    }
    render() {
        return (
            <div>
                <h1>普通用户</h1>
                <div>
                    <Table columns={col} dataSource={this.state.users}/>
                </div>
                <h1>超级用户</h1>
                <div>
                    <Table columns={adminCol} dataSource={this.state.admins}/>
                </div>
            </div>
        )
    }
}

module.exports = AdminUsersPage;