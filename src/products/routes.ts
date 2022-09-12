import { Router } from "express";
import ProductRouter from './components/product/network'
import CartRouter from './components/cart/network'

const router = Router()

router.use("/alive", (req, res) => {
    return res.send("ok")
})
router.use("/api/products", ProductRouter)
router.use("/api/cart", CartRouter)
router.use("*", (req,res) => {
    return res.status(404).json("Route not found")
})

export default router