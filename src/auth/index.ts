import { Request } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config'
import { IUserEntity } from '../models/IUser'

function sign(data: IUserEntity) {
    return jwt.sign(data, config.jwt.secretKey)
}

function verify(token: string) {
    return jwt.verify(token, config.jwt.secretKey)
}

const check = {
    Own: function(req: Request, owner: number) {
        const decoded = decodeHeader(req)
        if(decoded) {
            return true
        }
        return false
    }
}

function getToken(auth:string) {
    if(!auth) {
        throw new Error("No token provided")
    }
    if(auth.indexOf('Bearer ') == -1) {
        throw new Error("Token format invalidate")
    }

    let token = auth.replace('Bearer ', "")
    return token
}

function decodeHeader(req: Request) {
    const authorization = req.headers.authorization || ""
    const token = getToken(authorization)
    const decoded = verify(token)
    req.user = decoded
    return decoded
}

export {
    check,
    sign
}