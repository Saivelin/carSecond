const db = require('../db')

class UserController {
    async createUser(req, res) {
        try {
            const { nsp, password } = req.body
            const newPerson = await db.query(`INSERT INTO users (nsp, password) values ($1, $2) RETURNING *`, [nsp, password])
            if (newPerson.rows[0]) {
                res.json(newPerson.rows[0])
            }
            else {
                res.json({ status: false })
            }
        } catch (e) {
            res.json({ status: false, errorName: e })
        }

    }

    async getUsers(req, res) {
        try {
            const persons = await db.query(`SELECT * FROM users`)
            if (persons.rows[0]) {
                res.json(persons.rows)
            }
            else {
                res.json({ status: false })
            }
        } catch (e) {
            res.json({ status: false, errorName: e })
        }
    }

    async getOneUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query(`SELECT * FROM users WHERE id=$1`, [id])
            if (user.rows[0]) {
                res.json(user.rows[0])
            }
            else {
                res.json({ status: false })
            }
        } catch (e) {
            res.json({ status: false, errorName: e })
        }
    }

    async updateUser(req, res) {
        try {
            const { id, nsp, password } = req.body
            const user = await db.query(`UPDATE users SET nsp = $1, password = $2 WHERE id = $3 RETURNING *`, [nsp, password, id])
            if (user.rows[0]) {
                res.json(user.rows[0])
            }
            else {
                res.json({ status: false })
            }
        } catch (e) {
            res.json({ status: false, errorName: e })
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id
            const user = await db.query(`DELETE FROM users WHERE id=$1`, [id])
            console.log(user)
            if (user.rowCount > 0) {
                res.json({ status: true })
            }
            else {
                res.json({ status: false })
            }
        } catch (e) {
            res.json({ status: false, errorName: e })
        }
    }
}

module.exports = new UserController()