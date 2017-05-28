/**
 * Created by wython on 2017/5/4.
 */

module.exports = function (models) {

    let { Tasks, Comments, Users, HotelOrder, TravelOrder, Travels, Hotels } = models;
    Comments.hasMany(Comments, {
        as: 'commentList',
        foreignKey: 'target_comment'
    });


    //userTask
    Users.hasMany(Tasks, {
        as: 'UserTask',
        foreignKey: 'user'
    });

    Tasks.hasMany(Comments, {
        as: 'taskComment',
        foreignKey: 'target_blog'
    });

    Users.hasMany(Comments, {
        as: 'userComment',
        foreignKey: 'author'
    });

    Users.hasMany(HotelOrder, {
        as: 'usersOrder',
        foreignKey: 'user'
    });

    Users.hasMany(TravelOrder, {
        as: 'usersOrder',
        foreignKey: 'user'
    });


    Travels.hasMany(TravelOrder, {
        as: 'travelsOrder',
        foreignKey: 'travelId'
    });

    Hotels.hasMany(HotelOrder, {
        as: 'hotalsOrder',
        foreignKey: 'hotalId'
    })

    //定义评论点赞
    Comments.belongsToMany(Users, {
        through: 'commentLikes',
        foreignKey: 'comments_id',
        as: 'commentLikes'
    });

    Users.belongsToMany(Comments, {
        through: 'commentLikes',
        foreignKey: 'users_id',
        as: 'likeComments'
    })
};