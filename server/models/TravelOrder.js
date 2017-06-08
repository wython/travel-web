/**
 * Created by wython on 2017/3/30.
 */

const Sequelize = require('sequelize');

module.exports = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        uniqueKey: true,
        autoIncrement: true
    },
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
        allowNull: false
    }
};