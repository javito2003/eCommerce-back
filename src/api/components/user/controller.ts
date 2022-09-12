import axios from "axios";
import { Request, Response } from "express";
import config from "../../../config";
import { IUserEntity } from "../../../models/IUser";
import * as responses from '../../../network/response'

const getUserToken = async(req: Request, res: Response) => {
    try {
        let id = req.user
        let response = await axios.get<responses.IResponse<IUserEntity>>(`${config.api_db.URL}/user?userId=${id}`)

        return responses.success(req, res, response.data.body)
    } catch (error) {
        return responses.error(req, res, "Error to get user")
    }
}

export default {
    getUserToken
}