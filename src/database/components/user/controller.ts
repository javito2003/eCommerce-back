import { Request, response, Response } from 'express'
import { UserInput } from '../../../models/IUser'
import { getConnection, mysql } from '../../db'
import * as responses from '../../../network/response'

export const create = async (req: Request, res: Response) => {
    console.log("Aca");
    
    try {
        let pool = await getConnection()
        const data = req.body
        const user = new UserInput(data.username, data.subject, data.origin)
        
        let [ resExist ] = await pool.execute("SELECT * FROM users WHERE subject = ? AND origin = ?", [ user.getSubject, user.getOrigin ]) as mysql.RowDataPacket[] 
        console.log(resExist[0]);
        
        if (resExist[0]) {
            return responses.success(req, res, resExist[0])
        }
        await pool.execute("INSERT INTO users (name, subject, origin) VALUES (?, ?, ?)", [ user.getName, user.getSubject, user.getOrigin ])

        let [profile] = await pool.execute("SELECT * FROM users WHERE subject = ? AND origin = ?", [ user.getSubject, user.getOrigin ]) as mysql.RowDataPacket[]
        
        return responses.success(req, res, profile[0], 200)

    } catch (error) {
        return responses.error(req, res, "Error to connect to database", 500)
    }
}