/**
 * Created by wython on 2017/3/30.
 */

const Sequelize = require('sequelize');

module.exports = {
    travelId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
             model: 'Travels',
             key: 'id'
        }
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
        type: Sequelize.STRING(16),
        allowNull: false,
        references: {
            model: 'Users',
            key: 'username'
        }
    }
};