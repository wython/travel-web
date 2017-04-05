/**
 * Created by wython on 2017/3/30.
 */

const Sequelize = require('sequelize');

module.exports = {
    name: {
        type:Sequelize.STRING(16),
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER
    },
    travelPic: {
        type: Sequelize.STRING(500)
    },
    position: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    team: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Teams',
            key: 'id'
        }
    }
};
