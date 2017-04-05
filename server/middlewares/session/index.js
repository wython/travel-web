/**
 * Created by wython on 2017/4/1.
 */
const session = require('../../libs/session');

const CONFIG = {
    key: 'uuid',
    maxAge: 10000,
    httpOnly: false,
    overwrite: true,
    signed: true
};

module.exports = function (koa) {
    return session(CONFIG, koa);
};