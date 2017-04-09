/**
 * Created by wython on 2017/3/20.
 */
const Sequelize = require('sequelize');

module.exports = {
    username: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true
    },
    name: {
        type: Sequelize.STRING(16),
        allowNull: false,
    },
    sex: {
        type: Sequelize.ENUM('0', '1', '2') //0:男 1: 女
    },
    email: {
        type: Sequelize.STRING(30)
    },
    headPic: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
};