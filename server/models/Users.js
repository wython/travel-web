/**
 * Created by wython on 2017/3/20.
 */
const Sequelize = require('sequelize');

module.exports = {
    username: {
        type: Sequelize.STRING(16),
        allowNull: false,
        unique: true,
        primaryKey: true
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
    email: {
        type: Sequelize.STRING(30)
    },
    headPic: {
        type: Sequelize.STRING
    },
    phone: {
       type: Sequelize.STRING(12)
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
};