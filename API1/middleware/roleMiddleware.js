const jwt = require("jsonwebtoken")
const { secret } = require("../config/auth.config")

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.json({ message: "Пользователь не авторизован" })
            }
            console.log(jwt.verify(token, secret))
            const { role: userRole } = jwt.verify(token, secret)
            let hasRole = false
            roles.forEach(role => {
                if (role === userRole) {
                    hasRole = true
                }
            })
            if (hasRole === false) {
                return res.status(403).json({ message: "У вас нет доступа" })
            }
            next()
        }
        catch (e) {
            console.log(e)
            return res.status(403).json({ message: "Пользователь не авторизован" })
        }
    }
}