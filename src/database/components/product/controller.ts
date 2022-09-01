import { Request, Response } from "express";
import IProduct from "../../../models/IProduct";
import * as responses from '../../../network/response'
import { categoriesToSQL } from "../../../utils/parseArrayQuery";
import { getConnection, sql } from "../../db";


export const create = async(req: Request, res: Response) => {
    try {
        let product:IProduct = req.body
        let pool = await getConnection()
        await pool.request()
                    .input("title", sql.VarChar, product.title)
                    .input("description", sql.VarChar, product.description)
                    .input("price", sql.Float, product.price)
                    .input("userId", sql.Int, product.userId)
                    .input("categoryId", sql.Int, product.categoryId)
                    .query("INSERT INTO products(title, description, price, userId, categoryId) VALUES (@title, @description, @price, @userId, @categoryId)")
        return responses.success(req, res, "Producto creado", 201)
    } catch (error) {
        return responses.error(req, res, "Error to create product", 500)
    }
}

export const get = async(req: Request, res: Response) => {
    try {
        let categories: string = ""
        if(req.query.categories) {
            categories = categoriesToSQL(req.query.categories as string[])
        }
        
        let pool = await getConnection()
        let response:sql.IResult<any>
        switch(req.query.sort) {
            case 'none': 
                if(categories) {
                    response = await pool.request().query(`SELECT * FROM Products WHERE categoryId IN ${categories}`)
                } else {
                    response = await pool.request().query("SELECT * FROM Products")
                }
                break
            case 'low_price':
                if(categories) {
                    response = await pool.request().query(`SELECT * FROM Products WHERE categoryId IN ${categories} ORDER BY price ASC`)
                } else {
                    response = await pool.request().query("SELECT * FROM Products ORDER BY price ASC")
                }
                break
            case 'high_price':
                if(categories) {
                    response = await pool.request().query(`SELECT * FROM Products WHERE categoryId IN ${categories} ORDER BY price DESC`)
                } else {
                    response = await pool.request().query(`SELECT * FROM Products ORDER BY price DESC`)
                }
                break
            default:
                response = await pool.request().query("SELECT * FROM Products")
                break
        }
        return responses.success(req, res, response.recordset, 201)

    } catch (error) {
        return responses.error(req, res, "Error to get products", 500)
    }
}