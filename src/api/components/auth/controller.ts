import { Request, response, Response } from "express"
import axios, { AxiosError } from 'axios'
import * as responses from '../../../network/response'

export const register = async(req: Request, res: Response) => {
    try {
        let { data } = await axios.post<string>("http://localhost:3002/api/user/create")
        return responses.success(req, res, "User created")
    } catch (error) {
        if(error instanceof AxiosError) {
            return responses.error(req, res, error.response?.data.body)
        }
        return responses.error(req, res, "Error to register", 500)
    }
}

export const loginSucces = async(req: Request, res: Response) => {
    if(req.user) {
        return responses.success(req, res, req.user, 200)
    } else {
        return responses.success(req, res, "user not Logged", 401)
    }
}

export const loginFailed = async(req: Request, res: Response) => {
    return responses.error(req, res, "Error to login", 401)
}