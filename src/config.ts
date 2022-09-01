import dotenv from 'dotenv'
dotenv.config()
export default {
    api: {
        PORT: process.env.API_PORT || 3001,
    },
    front: {
        URL: process.env.FRONT_URL || "" 
    },
    products: {
        PORT: process.env.PRODUCTS_PORT || 3003
    },
    passportGoogle: {
        clientID: process.env['GOOGLE_CLIENT_ID'] || "",
        clientSecret: process.env['GOOGLE_CLIENT_SECRET'] || "",
        callbackURL: '/api/auth/google/callback'
    },
    jwt: {
        secretKey: process.env.SECRETKEYJWT || ""
    },
    api_db: {
        PORT: process.env.DB_PORT || 3002,
        URL: process.env.DB_URL || ""
    },
    sql: {
        port: process.env.PORT || 3000,
        nameDB: process.env.USER_DB,
        passDB: process.env.USER_PASS,
        serverName: process.env.SERVER_NAME || "",
        databaseName: process.env.DATABASE_NAME
    }
}