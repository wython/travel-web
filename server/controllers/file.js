/**
 * Created by wython on 2017/5/23.
 */
const path = require('path');
const mult = require('../utils/mult2');
const addUrlParams = require('../utils').addUrlParam;
module.exports = {
    async upload(ctx, next) {
        let pathname = path.join(ctx.settings.BASE_DIR, 'static', 'upload');
        console.log(pathname);
        let file = await mult(ctx.req, {}, pathname);
        let url = addUrlParams('/api/static', { filePath: path.join('upload', file.tmpName) });
        ctx.body = {
            retCode: '000000',
            url
        };
        await next();
    }
};