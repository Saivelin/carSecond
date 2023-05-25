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

const Advertisement = sequelize.define('advertisements', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mark: { type: DataTypes.STRING },
    model: { type: DataTypes.STRING },
    generation: { type: DataTypes.STRING },
    year: { type: DataTypes.STRING, defaultValue: "Не указан" },
    fuel: { type: DataTypes.STRING, defaultValue: "Не указан" },
    bodyType: { type: DataTypes.STRING, defaultValue: "Не указан" },
    drive: { type: DataTypes.STRING, defaultValue: "Не указан" },
    transmission: { type: DataTypes.STRING, defaultValue: "Не указан" },
    modification: { type: DataTypes.STRING, defaultValue: "Не указана" },
    color: { type: DataTypes.STRING, defaultValue: "Не указан" },
    mileage: { type: DataTypes.STRING, defaultValue: "Не указан" },
    features: { type: DataTypes.STRING, defaultValue: "Не указаны" },
    howToContactType: { type: DataTypes.STRING, defaultValue: "All" },
    address: { type: DataTypes.STRING },
    licensePlate: { type: DataTypes.STRING },
    vin: { type: DataTypes.STRING },
    carRegistrationCertificate: { type: DataTypes.STRING },
    notRegisteredInRF: { type: DataTypes.BOOLEAN, defaultValue: false },
    price: { type: DataTypes.STRING, defaultValue: "Договорная" },
    exchange: { type: DataTypes.BOOLEAN, defaultValue: false },
    broken: { type: DataTypes.BOOLEAN, defaultValue: false },
    carTronOnly: { type: DataTypes.BOOLEAN, defaultValue: false },
    comment: { type: DataTypes.TEXT, defaultValue: "" },
    cleared: { type: DataTypes.BOOLEAN, defaultValue: false }, //растоможен
    isUnderWarranty: { type: DataTypes.BOOLEAN, defaultValue: false }, //на гарантии
    whenVehicleBought: { type: DataTypes.STRING, defaultValue: "Не указано" },
    typeOfDocument: { type: DataTypes.STRING },
    volume: { type: DataTypes.STRING, defaultValue: "Не указан" },
    consumption: { type: DataTypes.STRING, defaultValue: "Не указан" },
    complication: { type: DataTypes.STRING, defaultValue: "Не указана" },
    driveHand: { type: DataTypes.STRING, defaultValue: "Левый" },
    state: { type: DataTypes.STRING, defaultValue: "Б/У" }
})

const BodyTypes = sequelize.define("bodyTypes", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING }
})

const photoForAdvertisement = sequelize.define('photoForAdvertisement', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING },
})

User.hasMany(Advertisement)
Advertisement.hasMany(photoForAdvertisement)

module.exports = {
    User,
    Advertisement,
    photoForAdvertisement,
    BodyTypes
}