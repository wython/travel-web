/**
 * Created by wython on 2017/5/27.
 */
import React from 'react';
import fetch from 'utils/fetcher';
import {Table, Button, Modal, Select} from 'antd';
const Option = Select.Option;
export default class AdminHotalSetting extends React.Component{
    state = {
        visible: false,
        travelList: []
    }
    componentWillMount() {
        fetch.get('/api/get/travel', {}).then((res) => {
            if(res.retCode === '000000') {
                this.setState({
                    travelList : res.data
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
                <Table/>
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