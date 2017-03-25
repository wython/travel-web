/**
 * Created by wython on 2017/3/21.
 */
const requireDir  = require('require-dir');
const Controllers = requireDir('../controllers');

module.exports = {
    'get /users' :  Controllers.user.login,
    'get /': Controllers.home.index,
    'get|post /good': Controllers.user.good
};
