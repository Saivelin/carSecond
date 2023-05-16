const Router = require("express");
const router = new Router()
const advertisementController = require("../controllers/advertisement.controller")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

router.post('/add', advertisementController.add)

module.exports = router