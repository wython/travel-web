/**
 * Purpose: 封装符合koa的token处理中间件
 * Created by wython on 2017/4/5.
 */
const jwt = require('jsonwebtoken');

const sKeys = 'soul-keys-123';
export const tokenCode = {
    TOKEN_SUCCESS: {
        code: '000000',
        msg: 'token检查成功'
    },
    TOKEN_FORBID: {
        code: '000001',
        msg: 'token检查有误'
    },
    TOKEN_EXPIRED: {
        code: '000002',
        msg: 'token过期'
    },
    TOKEN_NOT_FIND: {
        code: '000003',
        msg: '未找到token'
    },
    TOKEN_UNKNOW_ERROR: {
        code: '000004',
        msg: '未知错误'
    }
};

const expiredTime = 60 * 30;  //30min

const verifyToken = function (token) {
    return new Promise(function (resolve, reject) {
        try {
            jwt.verify(token, sKeys, function (err, decode) {
                resolve({err, decode})
            })
        } catch (err) {
            reject({err, decode: null})
        }
    })
};

const Token = {
    //中间件函数，暴露给koa
    async tokenBeforeRouter (ctx, next) {
        let token = ctx.cookies.get('token');
        ctx.token = {};
        if (!token) {
            ctx.tokenCode = tokenCode.TOKEN_NOT_FIND;
        } else {
            let result = await verifyToken(token);
            if (!result.err) {
                ctx.token = result.decode;
                ctx.tokenCode = tokenCode.TOKEN_SUCCESS;
            } else {
                switch (result.err && result.err.message) {
                    case 'jwt expired':
                        ctx.tokenCode = tokenCode.TOKEN_EXPIRED;
                        break;
                    case 'jwt malformed':
                        ctx.tokenCode = tokenCode.TOKEN_FORBID;
                        break;
                    default:
                        ctx.tokenCode = tokenCode.TOKEN_UNKNOW_ERROR;
                        break
                }
            }
        }
        await next();
    },
    tokenAfterRouter (ctx, next) {
        if (ctx.payload && Object.keys(ctx.payload).length) {
            let token = jwt.sign(ctx.payload, sKeys, {expiresIn: expiredTime});
            ctx.cookies.set('token', token);
        }
        next();
    },
};

module.exports = Token;
