const { Advertisement, photoForAdvertisement, User, BodyTypes } = require('../models/models')
const { Op } = require("sequelize")
const uuid = require('uuid')

async function uploadImages(files, id) {
    await files.forEach(async (img) => {
        const newImage = await photoForAdvertisement.create({ url: img.fileName, advertisementId: id })
    })
}

class UserController {
    async add(req, res, next) {
        try {
            const {
                mark,
                model,
                generation,
                year,
                fuel,
                bodyType,
                drive,
                transmission,
                modification,
                color,
                mileage,
                features,
                howToContactType,
                address,
                licensePlate,
                vin,
                carRegistrationCertificate,
                notRegisteredInRF,
                price,
                exchange,
                broken,
                carTronOnly,
                comment,
                cleared,
                isUnderWarranty,
                whenVehicleBought,
                typeOfDocument,
                userId } = req.body
            const files = Object.values(req.files);
            console.log(req.files)

            if (!mark || !model || !generation || !userId) {
                return res.status(400).json({ status: false })
            }


            const newAdvertisement = await Advertisement.create(
                {
                    mark: mark,
                    model: model,
                    generation: generation,
                    userId: userId,
                    year,
                    fuel,
                    bodyType,
                    drive,
                    transmission,
                    modification,
                    color,
                    mileage,
                    features,
                    howToContactType,
                    address,
                    licensePlate,
                    vin,
                    carRegistrationCertificate,
                    notRegisteredInRF,
                    price,
                    exchange,
                    broken,
                    carTronOnly,
                    comment,
                    cleared,
                    isUnderWarranty,
                    whenVehicleBought,
                    typeOfDocument,
                })
            files.forEach((img) => {
                let fileName = uuid.v4() + ".png"
                console.log(fileName)
                if (img) {
                    if (img.mimetype.split("/")[0] != "image") {
                        return res.json({ status: false })
                    }
                    img.mv('./uploads/' + fileName);
                }
                img.fileName = fileName;
            })
            await uploadImages(files, newAdvertisement.id)

            return res.status(200).json({ status: true, newAdvertisement })
        } catch (e) {
            res.status(400).json({ status: false, errorName: e })
        }
    }

    async getAll(req, res) {
        try {
            const ads = await Advertisement.findAll({ include: { model: photoForAdvertisement, attributes: ["url"] } })
            return res.json(ads)
        } catch (e) {
            res.status(400).json({ status: false, errorName: e })
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params
            if (id && Number(id)) {
                const vehicle = await Advertisement.findOne({ where: { id }, include: { model: photoForAdvertisement, attributes: ["url"] } })
                return res.json(vehicle)
            }
            return res.json({ message: "Not valuable id" })
        }
        catch {
            return res.json({ status: false, user: false })
        }
    }

    async getUserByIdOfAd(req, res) {
        try {
            const { id } = req.params
            if (id && Number(id)) {
                const ad = await Advertisement.findOne({ where: { id: id } })
                const uid = ad.toJSON().userId;
                const user = await User.findOne({ where: { id: uid } })
                return res.json({ id: user.id, lfp: user.lfp, phone: user.phone, role: user.role, logo: user.logo, lfpOrNick: user.lfpOrNick, nick: user.nick })
            }
            return res.json({ message: "Not valuable id" })
        }
        catch {
            return res.json({ status: false, user: false })
        }
    }

    async getByFiltersFrom(req, res) {
        try {
            console.log(req.body)
            const { id, mark, model, generation, bodyType, transmission, drive, priceFrom, priceTo, valueFrom, valueTo, mileageFrom, mileageTo, count } = req.body
            console.log(mark)
            let whereData = {};
            if (mark) { whereData.mark = mark }
            if (model) { whereData.model = model }
            if (generation) { whereData.generation = generation }
            if (bodyType) { whereData.bodyType = bodyType }
            if (transmission) { whereData.transmission = transmission }
            if (drive) { whereData.drive = drive }
            if (priceFrom && priceTo) {
                whereData.price = {
                    [Op.and]: {
                        [Op.gte]: priceFrom,
                        [Op.lte]: priceTo,
                    }
                }
            }
            else if (!priceFrom && !priceTo) {

            }
            else if (!priceFrom) {
                whereData.price = {
                    [Op.lte]: priceTo
                }
            }
            else if (!priceTo) {
                whereData.price = {
                    [Op.gte]: priceFrom
                }
            }

            if (mileageFrom && mileageTo) {
                whereData.mileage = {
                    [Op.and]: {
                        [Op.gte]: mileageFrom,
                        [Op.lte]: mileageTo,
                    }
                }
            }
            else if (!mileageFrom && !mileageTo) {

            }
            else if (!mileageFrom) {
                whereData.mileage = {
                    [Op.lte]: mileageTo
                }
            }
            else if (!mileageTo) {
                whereData.mileage = {
                    [Op.gte]: mileageFrom
                }
            }
            console.log(whereData)
            if (!id) {
                if (!count) {
                    const ads = await Advertisement.findAll({ where: whereData, include: { model: photoForAdvertisement, attributes: ["url"] } })
                    return res.json(ads)
                }
                else {
                    const ads = await Advertisement.count({ where: whereData, include: { model: photoForAdvertisement, attributes: ["url"] } })
                    return res.json(ads)
                }
            }
            return res.json({ message: "Not valuable id" })
        }
        catch {
            return res.json({ status: false })
        }
    }

    async getBodyTypes(req, res) {
        try {
            const bodyTypes = await BodyTypes.findAll()
            return res.json(bodyTypes)
        }
        catch {
            return res.json({ status: false })
        }
    }

    async addBodyTypes(req, res) {
        try {
            const { arr } = req.body
            await arr.forEach(async (el) => {
                const bodyNew = await BodyTypes.create({ title: el })
            })
            return res.json({ status: true })
        }
        catch {
            return res.json({ status: false })
        }
    }

    async getAdsByPrice(req, res) {
        try {
            const { price } = req.params
            const coof = 5
            const priceFrom = (price - ((price / 100) * coof))
            const priceTo = ((price / 100) * coof) + Number(price)
            console.log(`From: ${priceFrom}, To: ${priceTo} `)
            let userAds = await Advertisement.findAll({
                where: {
                    price:
                    {
                        [Op.and]: {
                            [Op.gte]: priceFrom,
                            [Op.lte]: priceTo,
                        }
                    }
                },
                include: { model: photoForAdvertisement, attributes: ["url"] }
            })
            return res.json(userAds)
        }
        catch {
            return res.json({ status: false })
        }
    }
}

module.exports = new UserController()