/**
 * Created by wython on 2017/3/20.
 */
const Sequelize = require('sequelize');

module.exports = {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: null,
        unique: true,
        primaryKey: false,
        field: 'name',
        autoIncrement: false,
        comment: null,
        references: null
    },
    sex: Sequelize.BOOLEAN
};