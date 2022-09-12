import { Request, Response } from "express";
import * as responses from '../../../network/response'
import { getConnection, mysql } from "../../db";


const get = async(req: Request, res: Response) => {
    try {
        let userId = req.query.userId
        const id = Number(userId)
        
        let pool = await getConnection()
        let data = await getCart(id, pool)
        return responses.success(req, res, data)
        
    } catch (error) {
        responses.error(req, res, "Error to get cart", 500)
    }
}

const add = async(req: Request, res: Response) => {
    try {
        let userId = req.query.userId
        let { productId, num } = req.body
        let id = Number(userId)
        let pool = await getConnection()
        let [ response ] = await pool.execute("select Id from cart where userId = ?", [ id ]) as mysql.RowDataPacket[]
        if(!response[0]) {
            let createCart = await pool.execute("insert into cart(userId) values (?)", [id]) as mysql.RowDataPacket[]
            const cartId = createCart[0].insertId
            await pool.execute("insert into cart_item(productId, quantity, cartId) values (?, ?, ?)", [ productId, 1, cartId ])
            let cartUpdated = await getCart(id, pool)
            return responses.success(req, res, cartUpdated, 200)
        } 
        else {
            let [ productFound ] = await pool.execute("select quantity from cart_item where cartId = ? and productId = ?", [ response[0].Id, productId ]) as mysql.RowDataPacket[] 
            if(!productFound[0]) {
                await pool.execute("insert into cart_item(productId, quantity, cartId) values (?, ?, ?)", [ productId, 1, response[0].Id ])
                let cartUpdated = await getCart(id, pool)
                return responses.success(req, res, cartUpdated, 200)
            } else {
                let quantity = productFound[0].quantity as number
                quantity = quantity + num
                if(quantity <= 0) {
                    await pool.execute("delete from cart_item where productId = ?", [productId])
                } else {
                    await pool.execute("update cart_item set quantity = ? where cartId = ? and productId = ?", [ quantity, response[0].Id, productId ])
                }
                let cartUpdated = await getCart(id, pool)
                return responses.success(req, res, cartUpdated, 200)
            }
        }
    } catch (error) {
        responses.error(req, res, "Error to add product", 500)
    }
}

const getCart = async(userId: number, pool?: mysql.Connection) => {
    try {
        if(!pool) {
            pool = await getConnection()
        }
        
        let [ response ] = await pool.execute("select * from cart where userId = ?", [ userId ]) as mysql.RowDataPacket[]
        
        if(response[0]) {
            let [responseItems] = await pool.execute("select * from cart_item ci join products p on ci.productId = p.Id where ci.cartId = ?", [ response[0].Id ]) as mysql.RowDataPacket[]
            let toSend = {
                ...response[0],
                items: responseItems
            }
            
            return toSend
        }
        return undefined
    } catch (error) {
        throw new Error("Error to get cart")
    }
}

export default {
    get,
    add
}