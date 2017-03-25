/**
 * Created by wython on 2017/3/25.
 */
import React from 'react'
import {Row,Col} from 'antd'

export default class Header extends React.Component {
    render () {
        return (
            <header class="header">
                <Row>
                    <Col span={5}/>
                    <Col span={19}/>
                </Row>
            </header>
        )
    }
}