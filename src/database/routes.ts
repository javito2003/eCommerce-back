import { Router } from "express";
import UserRouter from './components/user/network'
import CategoriesRouter from './components/categories/network'
import ProductRouter from './components/product/network'

const router = Router()

router.use("/alive", (req, res) => {
    return res.send("ok")
})
router.use("/api/user", UserRouter)
router.use("/api/categories", CategoriesRouter)
router.use("/api/products", ProductRouter)
router.use("*", (req,res) => {
    return res.status(404).json("Route not found")
})

export default router