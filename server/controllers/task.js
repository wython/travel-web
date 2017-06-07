/**
 * Created by wython on 2017/5/28.
 */

const createUid = require('../utils').createUid;
module.exports = {
    async publish(ctx, next){
        let {Tasks, Users} = ctx.models;
        let tid = await createUid(8);
        let username = ctx.request.body.user;
        ctx.request.body.tid = tid;
        let result = await Tasks.create(ctx.request.body);

        ctx.body = {
            retCode: '000000'
        };
        next();
    },
    async getTasks(ctx, next) {
        let {Tasks, Users} = ctx.models;
        let tList = await Tasks.findAll();
        let resultList = [];
        for(let i in tList) {
            let user = await Users.findOne({
                where: {
                    username: tList[i].user
                }
            });
            resultList.push({
                user: {
                    username: user.username,
                    sex: user.sex,
                    headPic: user.headPic
                },
                task: tList[i]
            })
        }
        ctx.body = {
            retCode: '000000',
            data: resultList
        }
    },
    async getTask(ctx, next) {
        let tid = ctx.query.id;
        const {Tasks} = ctx.models;
        let result = await Tasks.findOne({
            where: {
                tid
            }
        });

        ctx.body = {
            retCode: '000000',
            data: result
        }
        next();
    }
};