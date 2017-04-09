/**
 * Created by wython on 2017/3/20.
 */
const Koa = require('koa');
const path = require('path');
const Orm = require('./model');
const Controller = require('./controller');

class App {
    constructor(settings) {
        if (!settings && !(typeof settings == 'object')) {
            throw TypeError('Settings must be a object!');
        }
        let database = settings.database;
        let modelDir = '/models';
        modelDir = settings.MODEL_DIR || modelDir;
        this.orm = Orm.init(database, path.join(settings.BASE_DIR, modelDir));

        //define all the model for sequelize
        this.orm.defineModel();

        this.controller = new Controller(settings.controllerConfig.routers);
        this.controller.defineRouter();
        this.router = this.controller.getRouter();
        //init the data
        this.settings = settings;
        this.app = new Koa();
        this.app.keys = settings.keys || []; //secret keys for cookie
    }

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
        let getMiddleFun  = this.settings.addMiddleBeforeRouter;
        getMiddleFun && this.addMiddlewares(getMiddleFun());

        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());

        getMiddleFun = this.settings.addMiddleAfterRouter;
        getMiddleFun && this.addMiddlewares(getMiddleFun());
        this.app.listen(this.settings.PORT || 3000);
        console.log('Start server at port :' + this.settings.PORT || 3000);
        return this;
    }

    use() {
        return this.app.use.apply(this.app, arguments);
    }
}

//保证app唯一。
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
async function a() {
    
}

module.exports = appManager.getApp();