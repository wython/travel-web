/**
 * Created by wython on 2017/3/22.
 */

module.exports = {
    index (ctx) {
        ctx.body = JSON.stringify({
            'abc': 'home page'
        });
    }
};