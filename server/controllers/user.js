/**
 * Created by wython on 2017/3/21.
 */
const bcrypt = require('bcrypt-node');

module.exports = {
    async login(ctx, next) {

    },
    async register(ctx, next) {
        let {username, password, email, name, phone} = ctx.request.body;
        let sqlResult = await User.create({
            username,
            password: bcrypt.hashSync(password),
            email,
            name,
            phone
        });
        if(sqlResult.username) {
            ctx.body = {
                retCode: '000000',
                retMsg: '注册成功'
            }
        } else {

        }
        await next();
    },
    good (ctx) {
        ctx.body = 'good';
    }
};