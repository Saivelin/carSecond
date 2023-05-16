const Router = require('express')
const router = new Router()
const userRouter = require('./user.routes')
const advertisementRouter = require('./advertisement.routes')

router.use('/user', userRouter)
router.use('/advertisement', advertisementRouter)

module.exports = router