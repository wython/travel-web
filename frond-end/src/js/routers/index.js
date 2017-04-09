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

const getTipsPage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/TipsPage'))
    })
};

const Routers = () => {
    return (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRoute getComponents={getHomePage}/>
                <Route path="tips" getComponents={getTipsPage}/>
            </Route>
        </Router>
    )
};

export default Routers