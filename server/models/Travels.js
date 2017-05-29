/**
 * Created by wython on 2017/3/30.
 */

const Sequelize = require('sequelize');

module.exports = {
    name: {
        type:Sequelize.STRING(100),
        allowNull: false
    },
    normalPrice: {
        type: Sequelize.INTEGER,
    },
    startTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    beginCity: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    fate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    mode: {
        type: Sequelize.STRING(10),
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(100)
    },
    information: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    travelPic: {
        type: Sequelize.STRING(500)
    },
    position: {
        type: Sequelize.STRING(30),
        allowNull: false
    }
};
