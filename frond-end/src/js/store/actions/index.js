/**
 * Created by wython on 2017/3/25.
 */

export const SET_USER_DATA = 'SET_USER_DATA';
export const DET_USER_DATA = 'DEL_USER_DATA';
export const SET_ADMIN_USER_DATA = 'SET_ADMIN_USER_DATA';
export const DET_ADMIN_USER_DATA = 'DEL_ADMIN_USER_DATA';
export const SET_TRAVEL_ORDER = 'SET_TRAVEL_ORDER';

export function actionSetTravelOrder(data) {
    return {
        type: SET_TRAVEL_ORDER,
        data
    }
}

//action create function
export function actionSetUserData(data) {
    return {
        type: SET_USER_DATA,
        data
    }
}

export function actionDelUserData() {
    return {
        type: DET_USER_DATA
    }
}

//action for admin

export function actionSetAdminUserData(data) {
    return {
        type: SET_ADMIN_USER_DATA,
        data
    }
}


export function actionDelAdminUserData() {
    return {
        type: DET_ADMIN_USER_DATA
    }
}