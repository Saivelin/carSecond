const Router = require('express')
const router = new Router()
const controller = require('../controllers/auth.controller')
const { check } = require("express-validator")
const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')

router.post('/registration',
    [
        check('nsp', "Имя пользователя не может быть пустым").notEmpty(),
        check('password', "Пароль должен быть больше 4 и меньше 30 символов").isLength({ min: 4, max: 30 })
    ]
    , controller.registration)
router.post('/login', controller.login)
router.get('/get_profile_info', roleMiddleware(['user']), controller.getProfileInfo)

module.exports = router