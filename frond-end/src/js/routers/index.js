/**
 * Created by wython on 2017/3/25.
 */
import React from 'react'
import {Router, Route, hashHistory, IndexRoute} from 'react-router'
import App from '../container/App';
import Admin from '../container/Admin';

import fetch from 'utils/fetcher';
import { actionSetUserData, actionDelUserData } from '../store/actions';
import {message} from 'antd';
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

const getAdminLoginPage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/AdminLoginPage'))
    })
};

const getAdminApp = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/AdminAppPage'))
    })
};

const getRoadPage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/RoadPage'))
    })
};

const getHotalPage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/HotalPage'))
    })
};
const getPublishPage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/PublishPage'))
    })
};
const getAdminContentPage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/AdminContent'))
    })
};

const getLineTravelPage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/LineTravelPage'))
    })
};

const getTipsContentPage = (location, cb) => {
    require.ensure([], (require) => {
        cb(null, require('../pages/TipsContentPage'))
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
    const onAdminEnter = (nextState, replaceState, cb) => {
        fetch.post('/api/admin/verifyToken', {}).then((res) => {
            if(res.retCode === '000000') {
                cb();
            } else {
                hashHistory.push('/admin/login')
            }
        })
    };
    const isLogin = (nextState, replaceState, cb) => {
        console.log(store.getState());
        if(!store.getState().userData.username) {
            hashHistory.push('/tips');
            message.info('请登录后在发布文章');
        } else {
            cb();
        }
    };

    return () => {
        return (
            <Router history={hashHistory}>
                <Route path="/" onEnter={onRootEnter} component={App}>
                    <IndexRoute getComponents={getHomePage}/>
                    <Route path="tips" getComponent={getTipsPage}>
                        <Route path='t/:tid' getComponent={getTipsContentPage}/>
                    </Route>
                    <Route path="publish" onEnter={isLogin} getComponent={getPublishPage}/>
                    <Route path="road" getComponent={getRoadPage}/>
                    <Route path="hotal" getComponent={getHotalPage}/>
                    <Route path="t/:tid" getComponent={getLineTravelPage}/>
                </Route>
                <Route path="/admin" component={Admin}>
                    <Route path="login" getComponent={getAdminLoginPage}/>
                    <Route path="app" getComponent={getAdminApp} onEnter={onAdminEnter}>
                        <Route path="content" getComponent={getAdminContentPage}/>
                    </Route>
                </Route>
            </Router>
        )
    };
};

export default Routers