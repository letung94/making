"use strict";
var Sequelize = require('sequelize'),
    sequelize = new Sequelize('userdb', 'root', 'root', {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306
    });
var User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING(200),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(2000),
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps: false
});
exports.User = user;