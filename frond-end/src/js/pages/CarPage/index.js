/**
 * Created by wython on 2017/6/8.
 */
import React from 'react';
import './car.css';
import { Tabs, Table } from 'antd';
import fetch from 'utils/fetcher';
import {Link} from 'react-router'

const TabPane = Tabs.TabPane;

const colums = [
    {
        title: '订单编号',
        dataIndex: 'id',
        key: 'id'
    },
    {
        title: '支付状态',
        dataIndex : 'adminAction',
        key: 'adminAction',
        render: (text, record) => {
            return (
                text ? '已支付' : '待支付'
            )
        }
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
            return (
                <div>
                    {
                        record.adminAction ?
                            '你已支付完成' : <Link to={'o/' + record.id}>马上支付</Link>
                    }

                </div>
            )
        }
    }
];
class CarPage extends React.Component {
    state = {
        orderList : []
    };
    componentWillMount() {

        fetch.get('/api/order/getTravelOrders', {
            data: {
                username: this.context.userData.username
            }
        }).then((res) => {
            if(res.retCode === '000000') {
                this.setState({
                    orderList: res.data
                })
            }
        })
    }
    tabsChange() {

    }
    render() {
        return (
            <div className="order-center">
                <h1>订单中心</h1>
                <p>
                    <Tabs onChange={this.tabsChange.bind(this)}>
                        <TabPane tab="旅游路线订单" key="1">
                            <div className="order-table">
                                <Table key="id" columns={colums} dataSource={this.state.orderList}/>
                            </div>
                        </TabPane>
                        <TabPane tab="酒店订单" key="2">
                            <div className="order-table">

                            </div>
                        </TabPane>
                    </Tabs>
                </p>
            </div>
        )
    }
}

CarPage.contextTypes = {
    userData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};

module.exports = CarPage;
