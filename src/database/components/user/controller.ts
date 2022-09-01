import { Request, response, Response } from 'express'
import { UserInput } from '../../../models/IUser'
import { getConnection, sql } from '../../db'
import * as responses from '../../../network/response'

export const create = async (req: Request, res: Response) => {
    try {
        let pool = await getConnection()
        const data = req.body
        const user = new UserInput(data.username, data.subject, data.origin)
        let resExist = await pool.request()
            .input("subject", sql.VarChar, user.getSubject)
            .input("origin", sql.VarChar, user.getOrigin)
            .query("SELECT * FROM users WHERE subject = @subject AND origin = @origin")
        if (resExist.recordset[0]) {
            return responses.success(req, res, resExist.recordset[0])
        }
        await pool.request()
            .input("name", sql.VarChar, user.getName)
            .input("subject", sql.VarChar, user.getSubject)
            .input("origin", sql.VarChar, user.getOrigin)
            .query("INSERT INTO users (name, subject, origin) VALUES (@name, @subject, @origin)")

        let profile = await pool.request()
            .input("subject", sql.VarChar, user.getSubject)
            .input("origin", sql.VarChar, user.getOrigin)
            .query("SELECT * FROM users WHERE subject = @subject AND origin = @origin")
        return responses.success(req, res, profile.recordset[0], 500)

    } catch (error) {
        console.log(error);
        return responses.error(req, res, "Error to connect to database", 500)
    }
}