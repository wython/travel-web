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
    },
    normalPrice: {
        type: Sequelize.INTEGER
    },
    hotelType: {
        /**
         * long: '长住型'
         * travel: '度假型'
         * car: '汽车型'
         * center: '市中心区酒店'
         * plane: '机场酒店'
         * business: '商务酒店'
         */
        type: Sequelize.ENUM('long', 'travel', 'car', 'center', 'plane', 'business'),
        allowNull: false
    }
};