const Router = require("express");
const router = new Router()
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")

router.post('/get', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/role-check-user', roleMiddleware(['user']), userController.checkAnyRole)
router.get('/delete/:id', roleMiddleware(['admin']), userController.deleteUserById)
router.get('/getById/:id', userController.getUserById)
router.post('/update', roleMiddleware(['user']), userController.update)

module.exports = router