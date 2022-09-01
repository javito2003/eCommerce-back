import { Router } from "express";
import ProductRouter from './components/product/network'

const router = Router()

router.use("/api/products", ProductRouter)

router.use("*", (req,res) => {
    return res.status(404).json("Route not found")
})

export default router