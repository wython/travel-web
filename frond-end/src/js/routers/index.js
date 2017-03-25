/**
 * Created by wython on 2017/3/25.
 */
import React from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from '../container/App';

const getHomePage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/HomePage'))
    })
};

const Routers = () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute getComponent={getHomePage}/>
            </Route>
        </Router>
    )
};

export default Routers