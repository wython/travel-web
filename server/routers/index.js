/**
 * Created by wython on 2017/3/21.
 */
const requireDir  = require('require-dir');
const Controllers = requireDir('../controllers');

module.exports = {
    'get /api/login' :  Controllers.user.login,
    'post /api/register': Controllers.user.register,
    'get /': Controllers.home.index,
    'get|post /good': Controllers.user.good,
    'post /api/checkUsername': Controllers.user.checkUsername
};
