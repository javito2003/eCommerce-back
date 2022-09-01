import sql from 'mssql'
import config from '../config'

let configDB: sql.config = {
    user: config.sql.nameDB,
    password: config.sql.passDB,
    server: config.sql.serverName,
    database: config.sql.databaseName,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    }
}

async function getConnection() {
    const pool = await sql.connect(configDB)
    return pool

}

export {
    getConnection,
    sql
}