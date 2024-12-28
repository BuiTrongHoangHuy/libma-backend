import db from '../models/index'
import bcrypt from "bcryptjs";

const listTitle = async () => {
    try {
        const titles = await db.Title.findAll({
            include: [{
                model: db.Category, attributes: ['category_name'],
            }],
            attributes: ['title_id',
                ['title_name', 'fullName'],
                'author',
                ['category_id', "categoryId"],
                'summary',
                'status',
                'createdAt',
                'updatedAt'
            ]
        });
        console.log(titles.every(user => user instanceof db.Title)); // true

        return {
            message: 'Get list user successful',
            code: 200,
            data: titles || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}


module.exports = {listTitle};