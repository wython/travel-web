/**
 * Created by wython on 2017/5/4.
 */

module.exports = function (models) {

    let { RecommendHotel, RecommendTravel ,
        HotelRoom, Tasks, Comments, Users,
        HotelOrder, TravelOrder, Travels, Hotels } = models;
    Comments.hasMany(Comments, {
        as: 'commentList',
        foreignKey: 'targetComment'
    });


    //userTask
    Users.hasMany(Tasks, {
        as: 'UserTask',
        foreignKey: 'user'
    });

    Tasks.hasMany(Comments, {
        as: 'taskComment',
        foreignKey: 'targetTask'
    });

    Users.hasMany(Comments, {
        as: 'userComment',
        foreignKey: 'author'
    });

    Users.hasMany(HotelOrder, {
        as: 'usersOrder',
        foreignKey: 'user'
    });

    Users.belongsToMany(Travels, {
        through: 'TravelOrder',
        as: 'usersOrder',
        foreignKey: 'user'
    });


    Travels.belongsToMany(Users, {
        through: 'TravelOrder',
        as: 'travelsOrder',
        foreignKey: 'travelId'
    });

    Hotels.hasMany(HotelOrder, {
        as: 'hotelsOrder',
        foreignKey: 'hotalId'
    });

    //定义评论点赞
    Comments.belongsToMany(Users, {
        through: 'CommentLikes',
        foreignKey: 'comments_id',
        as: 'commentLikes'
    });

    Users.belongsToMany(Comments, {
        through: 'CommentLikes',
        foreignKey: 'users_id',
        as: 'likeComments'
    });

    //酒店房间
    Hotels.hasMany(HotelRoom, {
        as: 'hotelsRoom',
        foreignKey: 'targetHotel'
    });

    //推荐酒店
    Hotels.hasMany(RecommendHotel, {
        as: 'recommendHotel',
        foreignKey: 'targetHotel'
    });

    Travels.hasMany(RecommendTravel, {
        as: 'recommendTravel',
        foreignKey: 'targetTravel'
    })
};