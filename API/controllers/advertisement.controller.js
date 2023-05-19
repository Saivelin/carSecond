const { Advertisement, photoForAdvertisement, User } = require('../models/models')
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

            if (!mark || !model || !generation || !userId) {
                return res.status(400).json({ status: false })
            }
            files.forEach((img) => {
                let fileName = uuid.v4() + ".png"
                if (img) {
                    if (img.mimetype.split("/")[0] != "image") {
                        return res.json({ status: false })
                    }
                    img.mv('./uploads/' + fileName);
                }
                img.fileName = fileName;
            })

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
                return res.json({ id: id, lfp: user.lfp, phone: user.phone, role: user.role, logo: user.logo, lfpOrNick: user.lfpOrNick, nick: user.nick })
            }
            return res.json({ message: "Not valuable id" })
        }
        catch {
            return res.json({ status: false, user: false })
        }
    }
}

module.exports = new UserController()