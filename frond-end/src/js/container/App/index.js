/**
 * Created by wython on 2017/3/25.
 */
import React from 'react'

export default class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children || 'i am app'}
            </div>
        )
    }
}
