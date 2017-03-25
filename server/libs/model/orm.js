/**
 * Created by wython on 2017/3/22.
 */

const Sequelize = require('sequelize');
const requireDir = require('require-dir');

//define the static class Orm of sequelize framework
module.exports = {
    init (databaseCtx, modelDir) {
        let option = {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        };
        this._context = {};
        this._context.config = databaseCtx;
        this._context.modelDir = modelDir;
        option = databaseCtx.option || option;
        this._orm = new Sequelize(databaseCtx.name, databaseCtx.username, databaseCtx.password, option);
        this._models = null;
        return this;
    },
    getModels () {
        if (!this._models) {
            try {
                this.defineModel();
                return this._models;
            } catch (Error) {
                throw Error(Error);
            }
        }
        return this._models;
    },
    defineModel () {
        const models = requireDir(this._context.modelDir);
        this._models = {};
        for (let key in models) {
            this._models[key] = this._orm.define(key, models[key]);
        }
    }
};