/**
 * Created by wython on 2017/5/27.
 */
import React from 'react';
import {Table, Button, Icon, Modal, Form, Input, message} from 'antd';
const FormItem = Form.Item;
import './photo.css';
import fetch from 'utils/fetcher';
import UploadAvator from 'layouts/UploadAvator';



class AdminPhotoSetting extends React.Component{
    constructor(props) {
        super(props);
        let that = this;
        this.columns = [
            {
                title: '标题',
                dataIndex: 'title',
                key: 'title'
            },
            {
                title: '展示图',
                dataIndex : 'imgUrl',
                key: 'imgUrl',
                render: (text, record) => {
                    return (
                        <img className="admin-table-img" src={text}/>
                    )
                }
            },
            {
                title: '跳转链接',
                dataIndex: 'href',
                key: 'href'
            },
            {
                title: '操作',
                key: 'action',
                render: (text, record, index) => {
                    return (
                        <a href="javascript:void(0)" onClick={(e) => {
                            fetch.post('/api/admin/delete/photo', {
                                data: {
                                    id: record.id
                                }
                            }).then((res) => {
                                console.log(res);
                                if(res.retCode === '000000') {
                                    console.log('delect success');
                                    that.onDelete(index);
                                }
                            })
                        }}>删除</a>
                    )
                }
            }
        ];
    }
    state = {
        visible: false,
        reset: true
    };
    getPhoto = () => {
        let that = this;
        fetch.get('/api/admin/homePhoto', { data: {}}).then((result) => {
            if(result.retCode === '000000') {
                that.setState({
                    dataSource: result.data
                })
            } else {

            }
        })
    };
    componentWillMount () {
        this.getPhoto();
    }
    componentWillUpdate () {
        console.log('update');
    }
    addPhoto (e) {
        this.showModal();
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleUploadDone = (res) => {
        let that = this;
        if(res.retCode === '000000') {
            that.props.form.setFieldsValue({
                imgUrl: res.url
            })
        }
    };
    onDelete = (index) => {
        const dataSource = [...this.state.dataSource];
        dataSource.splice(index, 1);
        this.setState({ dataSource });

    };
    closeModal = () => {
        this.setState({
            visible: false
        })
    };
    submitAddPhoto = (e) => {
        e.preventDefault();
        let that = this;
        this.props.form.validateFields((err, values) => {
            if(!err) {
                fetch.post('/api/admin/setPhoto', { data: values }).then((res) => {
                    if(res.retCode === '000000') {
                        message.info('添加成功');
                        that.closeModal();
                        that.getPhoto();
                        that.props.form.resetFields();
                        that.setState({
                            reset: false
                        })
                        that.setState({
                            reset: true
                        })
                    }
                })
            }
        })
    };
    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <div className="admin-Photo_setting">
                <h1>首页轮播图</h1>
                <Table columns={this.columns} dataSource={this.state.dataSource}/>
                <Button onClick={this.addPhoto.bind(this)}>
                    <Icon type="plus" />
                    添加新轮播图
                </Button>
                <Modal title="添加轮播图"
                       visible={this.state.visible}
                       onOk={this.submitAddPhoto}
                       okText="增加"
                       onCancel={() => { this.setState({visible: false}) }}
                >
                    <Form onSubmit={this.submitAddPhoto}>
                        <FormItem label="标题">
                            {
                                getFieldDecorator('title', {
                                    rules: [{required: true, message: '请输入标题'}]
                                })(<Input placeholder="请输入标题"/>)
                            }
                        </FormItem>
                        <FormItem label="图片">
                            { this.state.reset ? <UploadAvator onDone={this.handleUploadDone}/> : null }
                            {
                                getFieldDecorator('imgUrl', {
                                    rules: [{required: true, message: '请上传图片'}]
                                })(<Input style={{ display: 'none' }}/>)
                            }
                        </FormItem>
                        <FormItem label="跳转链接">
                            {
                                getFieldDecorator('href', {
                                    rules: [{required: true, message: '请填写上传链接'}]
                                })(<Input/>)
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(AdminPhotoSetting);