import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from '../config'
import routes from './routes'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/", routes)

app.use("/images", express.static(__dirname + '/utils/images/products'))

app.set('port', config.products.PORT)


export default app