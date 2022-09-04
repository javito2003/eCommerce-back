import { Request, Response } from "express";
import * as responses from '../../../network/response'
import { getConnection } from "../../db";

export const get = async(req: Request, res: Response) => {
    try {
        let pool = await getConnection()
        let response = await pool.request().query("SELECT * FROM categories")

        return responses.success(req, res, response.recordset, 200)

    } catch (error) {
        console.log(error);
        
        return responses.error(req, res, "Error to get categories")
    }
}