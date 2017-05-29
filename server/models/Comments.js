/**
 * Created by wython on 2017/5/24.
 */
const Sequelize = require('sequelize');

module.exports = {
    author: {
        type: Sequelize.STRING(16),
        allowNull: false,
        references: {
            model: 'Users',
            key: 'username'
        }
    },
    content: {
        type: Sequelize.STRING(1024),
        allowNull: false
    },
    targetTask: {
        type: Sequelize.Sequelize.STRING(20),
        allowNull: false,
        references: {
            model: 'Tasks',
            key: 'tid'
        }
    },
    targetComment: {
        type: Sequelize.INTEGER,
    }
};