/**
 * Purpose:Define the global setting off the app.
 * Created by wython on 2017/3/20.
 */


/**
 * setting(Object)
 *
 */
const path = require('path');
const token = require('./middlewares/token');
const body = require('./middlewares/koa-body');

module.exports = {
    keys : ['i m gaga'],
    database: {
        name: 'travel',
        username: 'root',
        password: 'root'
    },
    controllerConfig: {
        routers: path.join(__dirname, 'routers', 'index.js')
    },
    PORT: 3002,
    BASE_DIR: __dirname,
    MODEL_DIR: '/models',
    addMiddleBeforeRouter () {
        return [token.before, body];
    },
    addMiddleAfterRouter () {
        return [token.after];
    }
};