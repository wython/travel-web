/**
 * Created by wython on 2017/3/20.
 */
const Koa = require('koa');
const path = require('path');
const Orm = require('./model');
const Controller = require('./controller');


class App {
    constructor(settings) {
        // 参数校验
        if (!settings && !(typeof settings == 'object')) {
            throw TypeError('Settings must be a object!');
        }
        let database = settings.database;
        let modelDir = '/models';
        modelDir = settings.MODEL_DIR || modelDir;

        // 数据库初始化
        this.orm = Orm.init(database, path.join(settings.BASE_DIR, modelDir));

        //define all the model for sequelize
        this.orm.defineModel(settings.projectName);

        // koa-controller
        this.controller = new Controller(settings.controllerConfig.routers);
        this.controller.defineRouter();
        this.router = this.controller.getRouter();
        //init the data
        this.settings = settings;
        this.app = new Koa();


        this.app.keys = settings.keys || []; //secret keys for cookie
    }

    setOrmMiddlewares () {
        let models = this.orm.getModels();
        const that = this;
        this.app.use(async function (ctx, next) {
            ctx.settings = that.settings;
            ctx.models = models;
            await next();
        })
    }

    /**
     * 添加中间件
     * @param {Array} middleArr 中间件数组
     */
    addMiddlewares(middleArr) {
        if(!Array.isArray(middleArr)) {
            throw TypeError('Middleware in settings is not type Array!');
        }
        for (let index in middleArr) {
            this.app.use(middleArr[index](this.app));
        }
    }

    /**
     * Start the application with all middleware and orm support, and return a app object.
     *
     * @returns {Object}
     */
    start() {
        // 初始化 orm 中间件
        this.setOrmMiddlewares();

        // this.app.use(async (ctx, next) => {
        //     console.log(ctx.method, ctx.header.host + ctx.url);
        //     await next();
        // })

        // 路由之前的中间件
        let getMiddleFun  = this.settings.addMiddleBeforeRouter;
        getMiddleFun && this.addMiddlewares(getMiddleFun());

        // 设置路由
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());

        // 路由之后的中间件
        getMiddleFun = this.settings.addMiddleAfterRouter;
        getMiddleFun && this.addMiddlewares(getMiddleFun());
        // 开启服务
        this.app.listen(this.settings.PORT || 3000);
        // eslint-disable-next-line
        console.log('Start server at port :' + this.settings.PORT || 3000);

        return this;
    }

    use() {
        return this.app.use.apply(this.app, arguments);
    }
}

// 保证app唯一。
function AppManager() {
    return new AppManager.prototype.init();
}

AppManager.prototype = {
    init: function () {
        this.app = null;
        return this
    },
    getApp (settings) {
        if (this.app) {
            return this.app;
        } else {
            let that = this;
            return function (settings) {
                that.app = new App(settings);
                return that.app;
            };
        }
    }
};

AppManager.prototype.init.prototype = AppManager.prototype; //保证能够不用new调用

let appManager = AppManager();

module.exports = appManager.getApp();
