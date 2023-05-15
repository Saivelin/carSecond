const express = require("express");
const sequelize = require('./db')
const cors = require('cors');
const userRouter = require("./routes/user1.routes")
const adsController = require("./routes/ads.routes")
const authRouter = require('./routes/authRouter.routes')
const mainRouter = require('./routes/index')
const models = require('./models/models.js')

const dotenv = require("dotenv");
dotenv.config()

const PORT = process.env.PORT || 3005

const app = express()
app.use(cors({}));
app.use(express.json())
app.use('/api', mainRouter)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}...`)
        })
    }
    catch (e) {
        console.log(e)
    }
}

start()

// app.use('/api', userRouter)
// app.use('/api', adsController)
// app.use('/api/auth', authRouter)

// app.listen(PORT, () => {
//     console.log(`Server has been started on port ${PORT}...`)
// })