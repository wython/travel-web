/**
 * Created by wython on 2017/6/9.
 */

module.exports = {
    async postComment(ctx, next) {
        let {comment, username, task} = ctx.request.body;
        let {Comments, Users} = ctx.models;
        console.log(ctx.request.body.comment);
        let result = await Comments.create({
            author: username,
            content: comment,
            targetTask: task
        });
        let user = await Users.findOne({
            where: {
                username: username
            }
        })
        ctx.body = {
            retCode: '000000',
            data: {
                user,
                comment: result
            }
        };
        next();
    },
    async postCommentRe(ctx, next) {
        let {content, username, task, targetComment} = ctx.request.body;
        let {Comments, Users} = ctx.models;

        let result = await Comments.create({
            author: username,
            content: content,
            targetTask: task,
            targetComment
        });
        let user = await Users.findOne({
            where: {
                username: username
            }
        });
        let targetCommentItem = await Comments.findOne({
            where: {
                id: targetComment
            }
        });
        let targetUser = await Users.findOne({
            where: {
                username: targetCommentItem.author
            }
        })
        ctx.body = {
            retCode: '000000',
            data: {
                user,
                comment: result,
                targetUser
            }
        };
        next();
    },
    async getComments(ctx, next) {
        let {id} = ctx.query;
        let {Comments, Users} = ctx.models;
        let coList = [];
        let result = await Comments.findAll({
            where: {
                targetTask: id
            },
            order: "createdAt DESC"
        });
        for(let i in result) {
            let user = await Users.findOne({
                where: {
                    username: result[i].author
                }
            });
            let targetUser = null;
            if(result[i].targetComment) {
                let targetComment = await Comments.findOne({
                    where: {
                        id: result[i].targetComment
                    }
                });
                targetUser = await Users.findOne({
                    where: {
                        username: targetComment.author
                    }
                })
            }
            let r = {
                user,
                comment: result[i]
            };
            if(targetUser) {
                r.targetUser = targetUser;
            }
            coList.push(r);
        }
        ctx.body = {
            retCode: '000000',
            data: coList
        };
        next();
    }
}