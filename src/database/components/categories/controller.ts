import { Request, Response } from "express";
import * as responses from '../../../network/response'
import { getConnection } from "../../db";

export const get = async(req: Request, res: Response) => {
    try {
        let pool = await getConnection()
        const [ rows ] = await pool.execute("SELECT * FROM categories")

        return responses.success(req, res, rows, 200)

    } catch (error) {
        console.log("err", error);
        
        return responses.error(req, res, "Error to get categories")
    }
}