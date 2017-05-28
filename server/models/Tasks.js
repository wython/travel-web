/**
 * Created by wython on 2017/3/20.
 */
const Sequelize = require('sequelize');

module.exports = {
    tid: {
        type: Sequelize.STRING(20),
        allowNull: false,
        primaryKey: true
    },
    user: {
        type: Sequelize.STRING(16),
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
    destination: {
        type: Sequelize.STRING(10)
    },
    scope: {
        type: Sequelize.INTEGER
    }
};