const { Client } = require("pg")

const client = new Client({
    user: 'yejunho10',
    host: 'localhost',
    database: 'license',
    password: '6033',
    port: 5432
})

module.exports(client)