/**
 * Created by wython on 2017/5/17.
 */
import React from 'react';
import './admin.css';
import {connect} from 'react-redux';
import store from '../../store';
import { actionSetAdminUserData, actionDelAdminUserData } from '../../store/actions'

class Admin extends React.Component{
    constructor(props) {
        super(props);
    }
    getChildContext() {
        return {
            adminUserData: this.props.adminUserData,
            dispatches: this.props.dispatches
        }
    }
    render () {
        return (
            <div className="admin-app">
                { this.props.children }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        adminUserData: state.adminUserData
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
            setAdminUserData (data) {
                dispatch(actionSetAdminUserData(data))
            },
            delAdminUserData () {
                dispatch (actionDelAdminUserData())
            }
        }
    }
}

Admin.childContextTypes = {
    adminUserData: React.PropTypes.object,
    dispatches: React.PropTypes.object
};
export default connect(mapStateToProps, mapDispatchToProps)(Admin);