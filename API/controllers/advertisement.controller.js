const { Advertisement, photoForAdvertisement } = require('../models/models')
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
}

module.exports = new UserController()