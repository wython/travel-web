/**
 * Created by wython on 2017/3/25.
 */

export const SET_USER_DATA = 'SET_USER_DATA';


//action create function
export function actionSetUserData(data) {
    return {
        type: SET_USER_DATA,
        data
    }
}