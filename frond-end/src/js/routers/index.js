/**
 * Created by wython on 2017/3/25.
 */
import React from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from '../container/App';
import fetch from 'utils/fetcher';
import { actionSetUserData, actionDelUserData } from '../store/actions';

const getHomePage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/HomePage'))
    })
};

const getTipsPage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/TipsPage'))
    })
};



const Routers = (store) => {
    const onRootEnter = (nextState, replaceState, cb) => {
        fetch.post('/api/user/token', {}).then((res) => {
            if(res.retCode === '000000') {
                store.dispatch(actionSetUserData(res.data));
            } else {
                store.dispatch(actionDelUserData());
            }
        }).catch((err) => {
            console.log(err)
        });
        cb();
    };
    return () => {
        return (
            <Router history={hashHistory}>
                <Route path="/" onEnter={onRootEnter} component={App}>
                    <IndexRoute getComponents={getHomePage}/>
                    <Route path="tips" getComponents={getTipsPage}/>
                </Route>

            </Router>
        )
    };
};

export default Routers