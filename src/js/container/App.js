import Header from '../component/header'
import Footer from  '../component/footer'
import { connect } from 'react-redux'
import React from 'react'

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}