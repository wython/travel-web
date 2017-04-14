/**
 * Purpose: Entry file of the app server
 * Created by wython on 2017/3/20.
 */
require('babel-register');
const App = require('./server/libs/app');

const setting = require('./server/setting');

let app = App(setting);
app.start();



