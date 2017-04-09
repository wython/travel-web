/**
 * Created by wython on 2017/3/30.
 */

const Sequelize = require('sequelize');;

module.exports = {
    orderFor: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.ENUM('travel','hotel'),
        allowNull: false
    },
    beginTime: {
        type: Sequelize.DATE,
        allowNull: false
    },
    adminAction: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
};