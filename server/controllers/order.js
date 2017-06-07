/**
 * Created by wython on 2017/6/7.
 */
module.exports = {
    async createOrder(ctx, next) {
        let {username, id , beginTime} = ctx.request.body;
        console.log(ctx.request.body);
        let {TravelOrder} = ctx.models;
        let result = await TravelOrder.create({
            travelId: id,
            beginTime,
            user: username
        })
        if(result) {
             ctx.body = {
                 retCode: '000000',
                 data: result
             }
        } else {
            ctx.body = {
                retCode: '000001'
            }
        }
        next();
    }
}
