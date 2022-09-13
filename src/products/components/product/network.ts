import { Router } from "express";
import upload from "../../multer";
import * as Controller from './controller'
import * as auth from '../../../auth'


const router = Router()

router.post("/create", auth.check.logged, upload.single('picture'), Controller.create)

router.get("/", Controller.get)

router.get("/name", Controller.findByName)

export default router