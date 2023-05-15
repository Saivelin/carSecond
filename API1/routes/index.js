const Router = require('express')
const router = require('./user1.routes')
const router = new Router()
const userRouter = require('./user.routes')

router.use('/user', userRouter)

module.exports = router