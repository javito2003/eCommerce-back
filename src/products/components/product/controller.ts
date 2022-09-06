import axios from "axios";
import { Request, Response } from "express";
import config from "../../../config";
import IProduct from "../../../models/IProduct";
import * as responses from '../../../network/response'
import {categoriesToQuery} from "../../../utils/parseArrayQuery";

export const create = async(req:Request, res: Response) => {
    try {
        let response = await axios.post<responses.IResponse<string>>(`${config.api_db.URL}/products/create`, req.body)
        return responses.success(req, res, response.data.body, 201)

    } catch (error) {
        return responses.error(req, res, "Error to create product")
    }
}

export const get = async(req: Request, res: Response) => {
    try {
        let categories: string = ""
        if(req.query.categories) {
            categories = categoriesToQuery(req.query.categories as string[])
        }
        let response = await axios.get<responses.IResponse<IProduct[]>>(`${config.api_db.URL}/products?sort=${req.query.sort || 'none'}${categories ? "&" + categories : ""}`)
        return responses.success(req, res, response.data.body)
    } catch (error) {
        return responses.error(req, res, "Error to get product")
    }
}

export const findByName = async(req: Request, res: Response) => {
    try {
        let productName = req.query.name
        let categories: string = ""
        if(req.query.categories) {
            categories = categoriesToQuery(req.query.categories as string[])
        }

        if(!productName) {
            return responses.error(req, res, "Error to find product")
        }

        let response = await axios.get<responses.IResponse<IProduct[]>>(`${config.api_db.URL}/products/name?name=${productName}&sort=${req.query.sort || 'none'}${categories ? "&" + categories : ""}`)
        return responses.success(req, res, response.data.body)
        
    } catch (error) {
        
        return responses.error(req, res, "Error to find product")
    }
}