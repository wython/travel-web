/**
 * Created by wython on 2017/3/25.
 */
import React from 'react'
import Header from 'layouts/Header'
import Footer from 'layouts/Footer'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        console.log(this.props.children);
    }
    render() {
        return (
            <div>
                <Header/>
                {this.props.children || 'i am app'}
                <Footer/>
            </div>
        )
    }
}
