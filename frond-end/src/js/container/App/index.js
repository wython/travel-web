/**
 * Created by wython on 2017/3/25.
 */
import React from 'react'
import Header from 'layouts/Header'
import Footer from 'layouts/Footer'
import {connect} from 'react-redux';
import store from '../../store';
import { actionSetUserData,actionDelUserData, actionSetTravelOrder } from '../../store/actions'
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return {
            userData: this.props.userData,
            dispatches: this.props.dispatches
        }
    }
    componentDidMount() {
        console.log(this.store);
    }
    render() {
        return (
            <div style={{ background: '#f4f4f4' }}>
                <Header/>
                {this.props.children || 'i am app'}
                <Footer/>
            </div>
        )
    }
}
function mapStateToProps(state) {
    return {
        userData: state.userData
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatches: {
            getState (key) {
                if (key) {
                    return store.getState()[key];
                } else {
                    return store.getState();
                }
            },
            setUserData (data) {
                dispatch(actionSetUserData(data))
            },
            delUserData () {
                dispatch (actionDelUserData())
            },
            setOrder(data) {
                dispatch (actionSetTravelOrder(data))
            }
        }
    }
}
App.childContextTypes = {
    userData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
