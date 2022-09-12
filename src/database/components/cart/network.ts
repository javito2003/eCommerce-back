import { Router } from 'express'
import Controller from './controller'

const router = Router()

router.get("/", Controller.get)
router.post("/add", Controller.add)

export default router