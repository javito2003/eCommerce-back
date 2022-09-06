import { Request, Response } from "express";
import IProduct from "../../../models/IProduct";
import * as responses from '../../../network/response'
import { categoriesToSQL } from "../../../utils/parseArrayQuery";
import { getConnection, mysql } from "../../db";


export const create = async(req: Request, res: Response) => {
    try {
        let product:IProduct = req.body
        let pool = await getConnection()
        await pool.execute("INSERT INTO products(title, description, price, userId, categoryId) VALUES (?, ?, ?, ?, ?)", [ product.title, product.description, product.price, product.userId, product.categoryId ])
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
        let response: mysql.RowDataPacket;
        switch(req.query.sort) {
            case 'none': 
                if(categories) {
                    response = await pool.execute(`SELECT * FROM products WHERE categoryId IN ${categories}`) as mysql.RowDataPacket
                } else {
                    response = await pool.execute("SELECT * FROM products") as mysql.RowDataPacket
                }
                break
            case 'low_price':
                if(categories) {
                    response = await pool.execute(`SELECT * FROM products WHERE categoryId IN ${categories} ORDER BY price ASC`) as mysql.RowDataPacket
                } else {
                    response = await pool.execute("SELECT * FROM products ORDER BY price ASC") as mysql.RowDataPacket
                }
                break
            case 'high_price':
                if(categories) {
                    response = await pool.execute(`SELECT * FROM products WHERE categoryId IN ${categories} ORDER BY price DESC`) as mysql.RowDataPacket
                } else {
                    response = await pool.execute(`SELECT * FROM products ORDER BY price DESC`) as mysql.RowDataPacket
                }
                break
            default:
                response = await pool.execute("SELECT * FROM products") as mysql.RowDataPacket
                break
        }
        
        return responses.success(req, res, response[0], 201)

    } catch (error) {
        console.log(error);
        
        return responses.error(req, res, "Error to get products", 500)
    }
}

export const findByName = async(req: Request, res: Response) => {
    try {
        let name = req.query.name
        let categories: string = ""
        if(req.query.categories) {
            categories = categoriesToSQL(req.query.categories as string[])
        }
        let pool = await getConnection()
        let rows: mysql.RowDataPacket;
        switch(req.query.sort) {
            case 'low_price':
                if(categories) {
                    rows = await pool.execute(`SELECT * FROM products WHERE title LIKE '%${name}%' AND categoryId IN ${categories} ASC`) as mysql.RowDataPacket
                } else {
                    rows = await pool.execute(`SELECT * FROM products WHERE title LIKE '%${name}%' ASC`) as mysql.RowDataPacket
                }
                break;
            case 'high_price':
                if(categories) {
                    rows = await pool.execute(`SELECT * FROM products WHERE title LIKE '%${name}%' AND categoryId IN ${categories} DESC`) as mysql.RowDataPacket
                } else {
                    rows = await pool.execute(`SELECT * FROM products WHERE title LIKE '%${name}%' DESC`) as mysql.RowDataPacket
                }
                break;
            default:
                if(categories) {
                    rows = await pool.execute(`SELECT * FROM products WHERE title LIKE '%${name}%' AND categoryId IN ${categories}`) as mysql.RowDataPacket
                } else {
                    rows = await pool.execute(`SELECT * FROM products WHERE title LIKE '%${name}%'`) as mysql.RowDataPacket
                }
                break;
        }
        
        return responses.success(req, res, rows[0], 201)

    } catch (error) {
        console.log(error);
        return responses.error(req, res, "Error to get products", 500)
    }
}