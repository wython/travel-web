/**
 * Created by wython on 2017/3/30.
 */
const Sequelize = require('sequelize');

module.exports = {
    company: Sequelize.STRING(30),
    cert: {
        type: Sequelize.ENUM('1','2','3','4'),
        allowNull: false
    }
};