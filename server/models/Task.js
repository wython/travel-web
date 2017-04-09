/**
 * Created by wython on 2017/3/20.
 */
const Sequelize = require('sequelize');

module.exports = {
    username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        references: {
            model: 'Users',
            key: 'username'
        }
    },
    title: {
        type: Sequelize.STRING(255),
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
};