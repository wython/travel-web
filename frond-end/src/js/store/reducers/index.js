/**
 * Created by wython on 2017/3/25.
 */

import {SET_USER_DATA, DET_USER_DATA, SET_ADMIN_USER_DATA, DET_ADMIN_USER_DATA,
    SET_TRAVEL_ORDER
} from '../actions'

export function orderData(state = {}, action) {
    switch (action.type) {
        case SET_TRAVEL_ORDER:
            return Object.assign({}, state, action.data);
        default:
            return state
    }
}

export function userData(state = {}, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return Object.assign({}, state, action.data);
        case DET_USER_DATA:
            return {};
        default:
            return state;
    }
}

export function adminUserData(state = {}, action) {
    switch (action.type) {
        case SET_ADMIN_USER_DATA:
            return Object.assign({}, state, action.data);
        case DET_ADMIN_USER_DATA:
            return {};
        default:
            return state;
    }
}
