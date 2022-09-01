import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from '../config'
import routes from './routes'
import cookieSession from 'cookie-session'
import passport from './passport'

const app = express()


app.use(cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 }));
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({
    origin: config.front.URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", routes)

app.set('port', config.api.PORT)


export default app