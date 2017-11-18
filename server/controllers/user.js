/**
 * Created by wython on 2017/3/21.
 */
const bcrypt = require('bcrypt-node');

module.exports = {
    async verifyLogin (ctx, next) {
        ctx.body = {
            retCode: ctx.tokenCode.code,
            retMsg: ctx.tokenCode.msg,
            data: ctx.token
        };
        await next();
    },
    async login(ctx, next) {
        let { userName, password } = ctx.request.body;
        let { Users } = ctx.models;
        let user = await Users.findOne({
            where: {
                username: userName
            }
        });
        if(user) {
            let isAuth = bcrypt.compareSync(password, user.password);
            if(isAuth) {
                let data = {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    realName: user.realName,
                    sex: user.sex,
                    headPic: user.headPic,
                    name: user.name
                };
                ctx.payload = data;
                ctx.body = {
                    retCode: '000000',
                    retMsg: '密码验证通过',
                    data
                }
            } else {
                ctx.body = {
                    retCode: '000001',
                    retMsg: '密码不正确'
                }
            }
        } else {
            ctx.body = {
                retCode: '000002',
                retMsg: '用户不存在'
            }
        }
        await next();
    },
    async checkUsername(ctx, next) {
        let {username} = ctx.request.body;
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
    async logOut(ctx, next) {
        ctx.cookies.set('token', null, {
            maxAge: 0,
            expires: new Date(0)
        });
        ctx.body = {
            retCode: '000000',
            retMsg: '退出登录成功'
        }
    },
    good (ctx) {
        ctx.body = 'good';
    },
    async getAllUsers(ctx, next) {
        let {Users, Admin} = ctx.models;
        let userList = await Users.findAll();
        let adminList = await Admin.findAll();

        ctx.body = {
            retCode: '000000',
            users: userList,
            admins: adminList
        }
    }
};