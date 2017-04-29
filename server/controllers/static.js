/**
 * Created by wython on 2017/4/14.
 */
const send = require('koa-send');
const path = require('path');

module.exports = {
    /**
     * 获取静态文件
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async getStatic(ctx, next) {
        let {filePath} = ctx.query;
        if(!filePath) {
            ctx.body = {
                retCode: '000001',
                retMsg: '参数不完整'
            }
        } else {
            let staticPath = path.join('server', 'static', filePath);
            await send(ctx, staticPath);
        }
        await next();
    }
};
