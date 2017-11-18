/**
 * Created by wython on 2017/5/27.
 */
import React from 'react';
import fetch from 'utils/fetcher';
import {Table, Button, Modal, Select} from 'antd';
const Option = Select.Option;

const colums = [
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
                    <a href="javascript:void(0)" onClick={(e) => {}}>删除</a>
                </div>
            )
        }
    }
];

export default class AdminHotalSetting extends React.Component{
    state = {
        visible: false,
        hotelList: [],
        recommendList: []
    };
    componentWillMount() {
        fetch.get('/api/get/hotels', {}).then((res) => {
            if(res.retCode === '000000') {
                this.setState({
                    hotelList : res.data
                })
            }
        })
        //get travel list
        fetch.get('/api/get/recommendHotels', {}).then((res) => {
            if(res.retCode === '000000') {
                this.setState({
                    recommendList: res.data
                })
            }
        })
    }
    showTravel () {
        this.setState({
            visible: true
        })
    }
    closeModal () {
        this.setState({
            visible: false
        })
    }
    addRecommendTravel() {
        fetch.post('/api/add/recommendHotel', {
            data: {
                id: this.state.value
            }
        }).then((res) => {
            if(res.retCode === '000000') {
                this.setState({
                    visible: false
                })
            }
        })
    }
    selectChange(val) {
        this.setState({
            value: val
        })
    }
    render () {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>推荐酒店列表</h1>
                <Table columns={colums} dataSource={this.state.recommendList}/>
                <Button onClick={this.showTravel.bind(this)}>添加推荐酒店</Button>
                <Modal title="选择推荐路线"
                       visible={this.state.visible}
                       onCancel={this.closeModal.bind(this)}
                       onOk={this.addRecommendTravel.bind(this)}
                >
                    <Select onChange={this.selectChange.bind(this)} placeholder="请选择酒店" style={{width: '100%'}}>
                        {
                            this.state.hotelList.map((item) => {
                                return (
                                    <Option key={item.id} value={item.id.toString()}>
                                        {
                                            item.hotelName
                                        }
                                    </Option>
                                )
                            })
                        }
                    </Select>
                </Modal>
            </div>
        )
    }
}