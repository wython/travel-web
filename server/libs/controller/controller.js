/**
 * Purpose: Create the Suppose to write handle function in /controller
 * Created by wython on 2017/3/22.
 */
const Router = require('../router');  //copy from koa-router@7.1
const requireDir = require('require-dir');
const parser = require('./parse');
function Controller(routerPath) {
    if (!this) {
        return new Controller()
    }
    this._router = new Router();
    this._routerPath = routerPath;
}
/**
 * define the handle function and register to koa-router.
 */
Controller.prototype.defineRouter = function () {
    const routes = require(this._routerPath);
    for (let key in routes) {
        let method = parser.methods(key);
        let path = parser.path(key);
        if (Array.isArray(method)) {
            for (let index in method) {
                this.registerRoute(path, method[index], routes[key])
            }
        } else {
            this.registerRoute(path, method, routes[key])
        }
    }
};

/**
 * register the handle function to koa-router.
 *
 * @param {string} path
 * @param {string} method
 * @param {function | array[function]} fns
 *
 */
Controller.prototype.registerRoute = function (path, method, fns) {
    let argums = [path];
    if (Array.isArray(fns)) {
        for (const fn of fns) {
            if (typeof fn !== 'function') throw new TypeError('Controller function must be composed of functions!');
            argums.push(fn);
        }
    } else {
        let fn = fns;
        if (typeof fn !== 'function') throw new TypeError('Controller function must be composed of functions!');
        argums.push(fn);
    }
    this._router[method].apply(this._router, argums);
};

/**
 * get the router object of koa-router.
 *
 * @return {object}
 */
Controller.prototype.getRouter = function () {
    return this._router;
};

module.exports = Controller;