/**
 * Created by wython on 2017/5/4.
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
    realName: {
        type: Sequelize.STRING(8)
    },
    sex: {
        type: Sequelize.ENUM('0', '1', '2') //0:男 1: 女
    },
    headPic: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
};
