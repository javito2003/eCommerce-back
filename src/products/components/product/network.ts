import { Router } from "express";
import * as Controller from './controller'

const router = Router()

router.post("/create", Controller.create)

router.get("/", Controller.get)

export default router