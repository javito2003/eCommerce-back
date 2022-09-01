import axios from "axios";
import { Request, Response } from "express";
import * as responses from '../../../network/response'
import ICategories from "../../../models/ICategories";
import config from "../../../config";


export const get = async(req: Request, res: Response) => {
    try {
        let { data } = await axios.get<responses.IResponse<ICategories[]>>(`${config.api_db.URL}/categories`)
        return responses.success(req, res, data.body)
    } catch (error) {
        console.log(error);
        return responses.error(req, res, "Error to get categories")
    }
}