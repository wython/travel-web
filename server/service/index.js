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
    }
};