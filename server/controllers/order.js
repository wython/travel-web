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
            adminAction: false,
            user: username
        });
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
    },
    async pay(ctx, next) {
        let {TravelOrder} = ctx.models;
        let {id} = ctx.request.body;

        let result = TravelOrder.update({
            adminAction: true
        }, {
            where: {
                id
            }
        });
        if(result) {
            ctx.body = {
                retCode: '000000'
            }
        } else {
            ctx.body = {
                retCode: '000001'
            }
        }
        next();
    },
    async getTravelOrder(ctx, next) {
        let {TravelOrder} = ctx.models;
        let {username} = ctx.query;
        let results = await TravelOrder.findAll({
            where: {
                user: username
            }
        });
        if(results) {
            ctx.body = {
                retCode: '000000',
                data: results
            }
        } else {
            ctx.body = {
                retCode: '000001'
            }
        }
        next();
    },
    async getTravelOrderById(ctx, next) {
        let {id} = ctx.query;
        let {TravelOrder, Travels} = ctx.models;
        let result = await TravelOrder.findOne({
            where: {
                id
            }
        });
        let travel = await Travels.findOne({
            where: {
                id: result.travelId
            }
        });
        if(result ) {
            ctx.body = {
                retCode: '000000',
                data: result,
                order: travel
            }
        }
    }
};
