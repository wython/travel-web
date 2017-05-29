/**
 * Created by wython on 2017/5/29.
 */
import React from 'react';
import {Table, Button, Icon} from 'antd';
import {Link} from 'react-router';
import fetch from 'utils/fetcher';

export default class AdminTravelTable extends React.Component{
    state ={
        travelList: []
    }
    constructor(props) {
        super(props);
        let that = this;
        this.columns = [
            {
                title: '路线名字',
                dataIndex: 'name',
                key: 'title'
            },
            {
                title: '路线预览',
                dataIndex : 'travelPic',
                key: 'travelPic',
                render: (text, record) => {
                    return (
                        <img height="50px" src={text}/>
                    )
                }
            },
            {
                title: '优惠价格',
                dataIndex: 'fate',
                key: 'fate'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => {
                    return (
                        <div>
                            <a href="javascript:void(0)" onClick={(e) => {
                                fetch.post('/api/admin/delete/travel', {
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
                            | <Link to="/admin/app/travel/add">修改</Link>
                        </div>
                    )
                }
            }
        ];
    }
    onDelete = (index) =>{
        this.setState({ travelList: [...this.state.dataSource.splice(index, 1)] });
    };
    componentWillMount() {
        let that = this;
        fetch.get('/api/get/travel').then((result) => {
            if(result.retCode === '000000') {
                console.log(result.data);
                that.setState({
                    travelList: result.data
                })
            }
        })
    }
    render () {
        return (
            <div>
                <Table dataSource={this.state.travelList} columns={this.columns}/>
                <Link to="/admin/app/travel/add">
                    <Button>
                        <Icon type="plus" />添加新路线
                    </Button>
                </Link>
            </div>
        )
    }
}