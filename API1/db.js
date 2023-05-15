const { Sequelize } = require("sequelize")

module.exports = new Sequelize(
    "carSec",
    "postgres",
    "root",
    {
        dialect: 'postgres',
        host: "localhost",
        port: 5432
    }
)

// const Pool = require("pg").Pool;
// const pool = new Pool({
//     user: "postgres",
//     password: "1",
//     host: "localhost",
//     port: 5432,
//     database: "car",
// })

// module.exports = pool