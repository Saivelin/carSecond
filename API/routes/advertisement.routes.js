const Router = require("express");
const router = new Router()
const advertisementController = require("../controllers/advertisement.controller")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

router.post('/add', advertisementController.add)
router.get('/getAll', advertisementController.getAll)
router.get('/getById/:id', advertisementController.getById)
router.get('/getUserByIdOfAd/:id', advertisementController.getUserByIdOfAd)
router.post('/getByFiltersFrom', advertisementController.getByFiltersFrom)

module.exports = router