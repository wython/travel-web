/**
 * Purpose: to create database and table with model。
 * Created by wython on 2017/3/24.
 */

const app = require('./libs/app');

if (!app) {
    console.log('> the app server is not start!!');
    return;
} else {
    console.log(app);
    app.orm.sync().then(function () {
        console.log('成功');
    }).catch(function () {
        console.log('失败');
    })
}




