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
        PORT: process.env.PRODUCTS_PORT || 3003,
        URL: process.env.PRODUCTS_URL || ""
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
        host: process.env.DB_HOST || "localhost",
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASS || "",
        database: process.env.DB_DATABASE || "",
        port: process.env.DB_PORT_SQL || 33006
    }
}