import { Router } from "express";
import AuthRouter from './components/auth/network'
import CategoriesRouter from './components/categories/network'

const router = Router()

router.use("/alive", (req, res) => {
    return res.send("ok")
})
router.use("/api/auth", AuthRouter)
router.use("/api/categories", CategoriesRouter)

router.use("*", (req,res) => {
    return res.status(404).json("Route not found")
})

export default router