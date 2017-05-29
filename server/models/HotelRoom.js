/**
 * Created by wython on 2017/5/28.
 */
const Sequelize = require('sequelize');

module.exports = {
    type: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    normalPrice: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    breakfast: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    wifi: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    targetHotel: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
};

