import mysql from 'mysql2/promise'
import config from '../config'


let configDB:mysql.ConnectionOptions = {
    host: config.sql.host,
    user: config.sql.user,
    database: config.sql.database,
    port: Number(config.sql.port),
    password: config.sql.password
}



export const getConnection = async() => {
    return await mysql.createConnection(configDB)
}

export {mysql}