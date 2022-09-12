import { Router } from 'express'
import * as auth from '../../../auth'
import Controller from './controller'

const router = Router()

router.get("/", auth.check.logged, Controller.getUserToken)

export default router