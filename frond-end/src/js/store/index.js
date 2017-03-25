/**
 * Created by wython on 2017/3/25.
 */

import {createStore, combineReducers} from 'redux'
import {setUserData} from './reducers'

let store = createStore(combineReducers({
    userData: setUserData
}));

export default store;

