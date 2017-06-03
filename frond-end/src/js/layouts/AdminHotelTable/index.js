/**
 * Created by wython on 2017/5/29.
 */
import React from 'react';
import {Table, Button, Icon} from 'antd';
import {Link} from 'react-router';
import fetch from 'utils/fetcher';

export default class AdminTravelTable extends React.Component{
    state ={
        hotelList: []
    };
    constructor(props) {
        super(props);
        let that = this;
        this.columns = [
            {
                title: '酒店名字',
                dataIndex: 'hotelName',
                key: 'title'
            },
            {
                title: '酒店预览',
                dataIndex : 'hotelPic',
                key: 'hotelPic',
                render: (text, record) => {
                    return (
                        <img height="50px" src={text}/>
                    )
                }
            },
            {
                title: '优惠价格',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => {
                    return (
                        <div>
                            <a href="javascript:void(0)" onClick={(e) => {
                                fetch.post('/api/admin/delete/hotel', {
                                    data: {
                                        id: record.id
                                    }
                                }).then((res) => {
                                    if(res.retCode === '000000') {
                                        console.log('delect success');
                                        that.onDelete(index);
                                    }
                                })
                            }}>删除</a>
                            | <Link to="/admin/app/hotel/add">修改</Link>
                        </div>
                    )
                }
            }
        ];
    }
    onDelete = (index) =>{
        const dataSource = [...this.state.hotelList];
        dataSource.splice(index, 1);
        this.setState({ hotelList: dataSource });
    };
    componentWillMount() {
        let that = this;
        fetch.get('/api/get/hotels').then((result) => {
            if(result.retCode === '000000') {
                console.log(result.data);
                that.setState({
                    hotelList: result.data
                })
            }
        })
    }
    render () {
        return (
            <div>
                <Table dataSource={this.state.hotelList} columns={this.columns}/>
                <Link to="/admin/app/hotel/add">
                    <Button>
                        <Icon type="plus" />添加新酒店
                    </Button>
                </Link>
            </div>
        )
    }
}