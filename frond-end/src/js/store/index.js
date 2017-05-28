/**
 * Created by wython on 2017/3/25.
 */

import {createStore, combineReducers} from 'redux'
import {userData,adminUserData} from './reducers'

let store = createStore(combineReducers({
    userData: userData,
    adminUserData: adminUserData
}));

export default store;

