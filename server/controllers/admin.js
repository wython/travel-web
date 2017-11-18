/**
 * Created by wython on 2017/5/19.
 */
const bcrypt = require('bcrypt-node');
const jwt = require('jsonwebtoken');
const sKeys = 'soul-keys-123';
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

module.exports = {
    async verifyToken(ctx, next) {
        let token = ctx.cookies.get('adminToken');
        let result = await verifyToken(token);
        if(!result.err) {
            ctx.body = {
                retCode: '000000',
                retMsg: 'token验证成功'
            }
        } else {
            ctx.body = {
                retCode: '000001',
                retMsg: 'token验证失败'
            }
        }
        await next();
    },
    async createUser(ctx, next) {
        let usernameList = ['wuwxc'];
        let {Admin} = ctx.models;
        for(let i in usernameList) {
            await Admin.create({
                username: usernameList[i],
                password: bcrypt.hashSync(123456)
            });
        }
        ctx.body = 'success';
        await next();
    },
    async logOut(ctx, next) {
        ctx.cookies.set('adminToken', null, {
            maxAge: 0,
            expires: new Date(0)
        });
        ctx.body = {
            retCode: '000000',
            retMsg: '退出登录成功'
        };
        await next();
    },
    async login(ctx, next) {
        let { userName, password } = ctx.request.body;
        let { Admin } = ctx.models;
        let user = await Admin.findOne({
            where: {
                username: userName
            }
        });
        if(user) {
            let isAuth = bcrypt.compareSync(password, user.password);
            if(isAuth) {
                let data = {
                    username: user.username,
                    realName: user.realName,
                    sex: user.sex,
                    headPic: user.headPic,
                };
                let token = jwt.sign(data, sKeys, {
                    expiresIn: expiredTime
                });
                ctx.cookies.set('adminToken', token);
                ctx.body = {
                    retCode: '000000',
                    retMsg: '密码验证通过',
                    data
                }
            } else {
                ctx.body = {
                    retCode: '000001',
                    retMsg: '密码不正确'
                }
            }
        } else {
            ctx.body = {
                retCode: '000002',
                retMsg: '用户不存在'
            }
        }
        await next();
    },
    async checkUsername(ctx, next) {
        let {username} = ctx.request.body;
        let {Admin} = ctx.models;
        let sqlResult = await Admin.findAll({
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
        await next();
    },
    async setHomePhoto(ctx, next) {
        let {Carousel} = ctx.models;
        let result = await Carousel.create(ctx.request.body);
        console.log(result);
        if(result.id) {
            ctx.body = {
                retCode: '000000'
            };
        } else {
            ctx.body = {
                retCode: '000001',
                retMsg: '添加失败'
            }
        }
        next();
    },
    async getHomePhoto(ctx, next) {
        let {Carousel} = ctx.models;
        let photoList = await Carousel.findAll();
        ctx.body = {
            retCode: '000000',
            data: photoList
        };
        next();
    },
    async delHomePhoto(ctx, next) {
        let { id } = ctx.request.body;
        let {Carousel} = ctx.models;
        let result = await Carousel.destroy({ where: {
            id
        }});
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
    async delTravelLine(ctx, next) {
        let { id } = ctx.request.body;
        let {Travels} = ctx.models;
        let result = await Travels.destroy({
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
    async delHotel(ctx, next) {
        let { id } = ctx.request.body;
        let {Hotels} = ctx.models;
        let result = await Hotels.destroy({
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
    /**
     * 添加旅游路线
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async addTravel(ctx, next) {
        let {Travels} = ctx.models;
        let result = await Travels.create(ctx.request.body);
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
    async addHotel(ctx, next) {
        let {Hotels} = ctx.models;
        let result = await Hotels.create(ctx.request.body);
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
    /**
     * 获取旅游路线
     * @param ctx
     * @param next
     * @returns {Promise.<void>}
     */
    async getTravelLine(ctx, next) {
        let {Travels} = ctx.models;
        let resultList = await Travels.findAll();
        ctx.body = {
            retCode: '000000',
            data: resultList
        };
        next();
    },
    async getHotels(ctx, next) {
        let {Hotels} = ctx.models;
        let resultList = await Hotels.findAll();
        ctx.body = {
            retCode: '000000',
            data: resultList
        }
        next();
    },
    async getTravelById(ctx, next) {
        let {id} = ctx.query;
        console.log(ctx.query);
        let {Travels} = ctx.models;
        let item = await Travels.findOne({
            where: {
                id
            }
        });
        if(item) {
            ctx.body = {
                retCode: '000000',
                data: item
            }
        } else {
            ctx.body = {
                retCode: '000001'
            }
        }
        next();
    },
    async getHotel(ctx, next) {
        let {id} = ctx.query;
        let {Hotels} = ctx.models;
        let item = await Hotels.findOne({
            where: {
                id
            }
        });
        if(item) {
            ctx.body = {
                retCode: '000000',
                data: item
            }
        } else {
            ctx.body = {
                retCode: '000001'
            }
        }
        next();
    },
    async addRecommendTravel(ctx, next) {
        let {id} = ctx.request.body;
        let {RecommendTravel, Travels} = ctx.models;

        let result = await RecommendTravel.create({
            targetTravel: id
        });
        let travel = await Travels.findOne({
            where: {
                id
            }
        })
        ctx.body = {
            retCode: '000000',
            data: travel
        }
        next();
    },
    async addRecommendHotel(ctx, next) {
        let {id} = ctx.request.body;
        let {RecommendHotel, Hotels} = ctx.models;

        let result = await RecommendHotel.create({
            targetHotel: id
        });
        let hotel = await Hotels.findOne({
            where: {
                id
            }
        })
        ctx.body = {
            retCode: '000000',
            data: hotel
        }
        next();
    },
    async getRecommendTravels(ctx, next) {
        let {RecommendTravel, Travels} = ctx.models;
        let travelLists = [];
        let rIdList = await RecommendTravel.findAll();
        for(let index in rIdList) {
            let travel = await Travels.findOne({
                id: rIdList[index].targetTravel
            })
            travelLists.push(travel);
        }
        ctx.body = {
            retCode: '000000',
            data: travelLists
        }
        next();
    },
    async getRecommendHotels(ctx, next) {
        let {RecommendHotel, Hotels} = ctx.models;
        let HotelLists = [];
        let rIdList = await RecommendHotel.findAll();
        for(let index in rIdList) {
            let travel = await Hotels.findOne({
                id: rIdList[index].targetHotel
            })
            HotelLists.push(travel);
        }
        ctx.body = {
            retCode: '000000',
            data: HotelLists
        }
        next();
    }
};
