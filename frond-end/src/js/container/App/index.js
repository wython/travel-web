/**
 * Created by wython on 2017/3/25.
 */
import React from 'react'
import Header from 'layouts/Header'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children || 'i am app'}
            </div>
        )
    }
}
