/**
 * Created by wython on 2017/5/27.
 */
import React from 'react';
import fetch from 'utils/fetcher';
import {Table, Button, Modal, Select} from 'antd';
const Option = Select.Option;

const colums = [
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
                    }}>删除</a>
                </div>
            )
        }
    }
];
export default class AdminTravelSetting extends React.Component{
    state = {
        visible: false,
        travelList: [],
        recommendList: []
    };
    componentWillMount() {
        fetch.get('/api/get/travel', {}).then((res) => {
            if(res.retCode === '000000') {
                this.setState({
                    travelList : res.data
                })
            }
        })
        //get travel list
        fetch.get('/api/get/recommendTravels', {}).then((res) => {
            if(res.retCode === '000000') {
                console.log(res);
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
        fetch.post('/api/add/recommendTravel', {
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
                <h1 style={{ textAlign: 'center' }}>推荐旅游路线列表</h1>
                <Table columns={colums} dataSource={this.state.recommendList}/>
                <Button onClick={this.showTravel.bind(this)}>添加推荐路线</Button>
                <Modal title="选择推荐路线"
                       visible={this.state.visible}
                       onCancel={this.closeModal.bind(this)}
                       onOk={this.addRecommendTravel.bind(this)}
                >
                    <Select onChange={this.selectChange.bind(this)} placeholder="请选择路线" style={{width: '100%'}}>
                        {
                            this.state.travelList.map((item) => {
                                return (
                                    <Option key={item.id} value={item.id.toString()}>
                                        {
                                            item.name
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