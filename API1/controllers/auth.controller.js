const db = require('../db')
const bcrypt = require("bcryptjs")
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth.config.js')

const generateAccessToken = (id, role, nsp) => {
    const payload = {
        id,
        role,
        nsp
    }
    return jwt.sign(payload, secret, { expiresIn: "24h" })
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            console.log(errors)
            if (!errors.isEmpty()) {
                return res.status(400).json({ status: false, message: errors.errors })
            }
            const { nsp, password } = req.body
            const candidate = await db.query(`SELECT * FROM users WHERE nsp=$1`, [nsp])
            if (candidate.rows[0]) {
                console.log("Такой пользователь уже существует")
                return res.status(400).json({ status: false, message: "This user already exist" })
            }
            console.log("Такого пользователя пока нет")
            const hashPassword = bcrypt.hashSync(password, 8)
            console.log(hashPassword)
            const newPerson = await db.query(`INSERT INTO users (nsp, password, role) values ($1, $2, $3) RETURNING *`, [nsp, hashPassword, "user"])
            return res.status(200).json({ status: true, user: newPerson.rows[0] })
        } catch (e) {
            res.status(400).json({ status: false, errorName: e })
        }
    }

    async login(req, res) {
        try {
            const { nsp, password } = req.body
            const user = await db.query(`SELECT * FROM users WHERE nsp=$1`, [nsp])
            if (!user.rows[0]) {
                return res.status(404).json({ status: false, message: "Такого пользователя не существует" })
            }
            const validPassword = bcrypt.compareSync(password, user.rows[0].password)
            if (validPassword === true) {
                const token = generateAccessToken(user.rows[0].id, user.rows[0].role, user.rows[0].nsp)
                return res.json({ token: token })
            }
            else {
                return res.status(400).json({ status: false, message: "Неверный пароль" })
            }
        } catch (e) {
            res.status(400).json({ status: false, errorName: e })
        }
    }

    async getProfileInfo(req, res) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const userByToken = jwt.verify(token, secret)
            const user = await db.query(`SELECT * FROM users WHERE id=$1`, [userByToken.id])
            if (!user.rows[0]) {
                return res.status(404).json({ status: false, message: "Пользователь не найден" })
            }
            return res.status(200).json({ status: true, message: "Пользователь найден", user: user.rows[0].nsp })
        } catch (e) {
            res.status(400).json({ status: false, errorName: e })
        }
    }
}

module.exports = new authController()