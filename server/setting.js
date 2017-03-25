/**
 * Purpose:Define the global setting off the app.
 * Created by wython on 2017/3/20.
 */


/**
 * setting(Object)
 *
 */
const path = require('path');

module.exports = {
    database: {
        name: 'soul',
        username: 'root',
        password: 'root'
    },
    controllerConfig: {
        routers: path.join(__dirname, 'routers', 'index.js')
    },
    PORT: 3001,
    BASE_DIR: __dirname,
    MODEL_DIR: '/models'
};