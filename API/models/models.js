const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lfp: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "user" },
    logo: { type: DataTypes.STRING, defaultValue: "defaultUserLogo.png" },
    nick: { type: DataTypes.STRING, defaultValue: "" },
    lfpOrNick: { type: DataTypes.STRING, defaultValue: "lfp" },
    about: { type: DataTypes.TEXT, defaultValue: "" },
    headerImageForDealer: { type: DataTypes.STRING, defaultValue: "" },
})

module.exports = {
    User
}