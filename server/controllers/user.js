/**
 * Created by wython on 2017/3/21.
 */
const bcrypt = require('bcrypt-node');

module.exports = {
    async login(ctx, next) {

    },
    async checkUsername(ctx, next) {
        let {username} = ctx.request.body;
        console.log(username);
        let {Users} = ctx.models;
        let sqlResult = await Users.findAll({
            where: {
                username
            }
        });
        if(sqlResult.length != 0) {
            ctx.body = {
                retCode: '000001',
                retMsg: '用户已存在'
            }
        } else {
            ctx.body = {
                retCode: '000000',
                retMsg: '用户不存在'
            }
        }
        await next();
    },
    async register(ctx, next) {
        let {username, password, email, name, phone} = ctx.request.body;
        let {Users} = ctx.models;
        let sqlResult = await Users.create({
            username,
            password: bcrypt.hashSync(password),
            email,
            name,
            phone
        });
        if(sqlResult.username) {
            ctx.body = {
                retCode: '000000',
                retMsg: '注册成功',
                data: {
                    username: sqlResult.username,
                    name: sqlResult.name,
                    realName: sqlResult.realName,
                    sex: sqlResult.sex,
                    email: sqlResult.email,
                    headPic: sqlResult.headPic,
                    phone: sqlResult.phone
                }
            }
        } else {
            ctx.body = {
                retCode: '000001',
                retMsg: '注册失败'
            }
        }
        await next();
    },
    good (ctx) {
        ctx.body = 'good';
    }
};