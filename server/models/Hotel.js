/**
 * Created by wython on 2017/3/30.
 */

const Sequelize = require('sequelize');

module.exports = {
    hotelName: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true
    },
    hotelGrade: {
        type: Sequelize.ENUM('1' ,'2', '3', '4', '5'),
        allowNull: false
    },
    descriptions: {
        type: Sequelize.STRING(255),
    },
    hotelPosition: {
        type: Sequelize.STRING(100),
        allowNull: false
    },
    hotelPic: {
        type: Sequelize.STRING(500)
    },
    price: {
        type: Sequelize.INTEGER
    }
};