import { Router } from "express";
import Controller from "./controller";
import * as auth from '../../../auth'

const router = Router()

router.post("/add", auth.check.logged, Controller.addCart)

router.get("/", auth.check.logged, Controller.getCart)

export default router