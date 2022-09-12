import axios from "axios";
import { Request, Response } from "express";
import config from "../../../config";
import * as responses from '../../../network/response'

const getCart = async(req: Request, res: Response) => {
    try {
        let userId = req.user
        console.log(userId);
        
        let response = await axios.get<responses.IResponse<any>>(`${config.api_db.URL}/cart?userId=${userId}`)
        
        responses.success(req, res, response.data.body, 200)
    } catch (error) {
        
    }
}

const addCart = async(req: Request, res: Response) => {
    try {
        let { productId, num } = req.body
        let userId = req.user
        
        let response = await axios.post<responses.IResponse<any>>(`${config.api_db.URL}/cart/add?userId=${userId}`, { productId, num })
        
        responses.success(req, res, response.data.body, 200)
        
    } catch (error) {
        responses.error(req, res, "Error to add product", 500)
    }
} 

export default {
    getCart,
    addCart
}