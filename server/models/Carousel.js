/**
 * Created by wython on 2017/5/26.
 */
const Sequelize = require('sequelize');

module.exports = {
    title: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    href: {
        type: Sequelize.STRING(500),
        allowNull: false
    },
    imgUrl: {
        type: Sequelize.STRING(500),
        allowNull: false
    }
};
