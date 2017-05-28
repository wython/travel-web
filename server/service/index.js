/**
 * 公共服务处理模块
 * Created by wython on 2017/4/29.
 */
module.exports = {
    /**
     * 验证token
     * @param ctx
     */
    verifyToken(ctx) {
        let { code } = ctx.tokenCode;
        if (code === '000000') {
            return ctx.token;
        } else {
            return false;
        }
    },
    async checkUsername(ctx, isAdmin) {
        let model = isAdmin ? ctx.models.Admin : ctx.models.Users;
        let {username} = ctx.request.body;
        let sqlResult = await model.findAll({
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
    }
};