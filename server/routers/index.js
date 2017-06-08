/**
 * Created by wython on 2017/3/21.
 */
const requireDir  = require('require-dir');
const Controllers = requireDir('../controllers');

module.exports = {
     //user
    'post /api/user/token': Controllers.user.verifyLogin,
    'post /api/login' :  Controllers.user.login,
    'post /api/register': Controllers.user.register,
    'get /api/logout': Controllers.user.logOut,

    //tisks
    'post /api/publish': Controllers.task.publish,
    'get /api/getTasks': Controllers.task.getTasks,
    'get /api/get/task': Controllers.task.getTask,

    'get /api/static': Controllers.static.getStatic,
    'get /': Controllers.home.index,
    'get|post /good': Controllers.user.good,
    'post /api/checkUsername': Controllers.user.checkUsername,

    //travel
    'post /api/order/create': Controllers.order.createOrder,
    'post /api/order/pay': Controllers.order.pay,
    'get /api/order/getTravelOrders': Controllers.order.getTravelOrder,
    'get /api/order/get/travel' : Controllers.order.getTravelOrderById,

    //admin
    'get /api/admin/createUser': Controllers.admin.createUser,
    'post /api/admin/checkUsername': Controllers.admin.checkUsername,
    'post /api/admin/login': Controllers.admin.login,
    'post /api/admin/verifyToken': Controllers.admin.verifyToken,
    'get /api/admin/homePhoto': Controllers.admin.getHomePhoto,
    'post /api/admin/setPhoto': Controllers.admin.setHomePhoto,
    'post /api/admin/delete/photo': Controllers.admin.delHomePhoto,
    'post|get /api/admin/logout': Controllers.admin.logOut,
    'post /api/add/travel': Controllers.admin.addTravel,
    'post /api/add/hotel': Controllers.admin.addHotel,
    'get /api/get/travel': Controllers.admin.getTravelLine,
    'get /api/get/hotels': Controllers.admin.getHotels,
    'get /api/get/hotel': Controllers.admin.getHotel,
    'post /api/admin/delete/travel': Controllers.admin.delTravelLine,
    'get /api/get/line': Controllers.admin.getTravelById,
    //upload
    'put|post /api/upload': Controllers.file.upload
};
