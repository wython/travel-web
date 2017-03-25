/**
 * Created by wython on 2017/3/21.
 */
let models = require('../libs/model').getModels();

module.exports = {
    login: [
        function (ctx, next) {
            ctx.router = 'login';
            next()
        },
        function (ctx) {
            ctx.body = ctx.router;
        }
    ],
    good (ctx) {
        ctx.body = 'good';
    }
};