/**
 * Created by wython on 2017/3/25.
 */

import {SET_USER_DATA, actionSetUserData} from '../actions'

export function setUserData(state = {}, type) {
    switch (type) {
        case SET_USER_DATA:
            return type.data;
        default:
            return {};
    }
}
