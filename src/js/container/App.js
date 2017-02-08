import Header from '../component/header'
import Footer from  '../component/footer'
import { connect } from 'react-redux'

import React from 'react'
class App extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div>
                <Header/>
                {this.props.test}
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        test:state.test
    }
}

export default connect(mapStateToProps)(App);