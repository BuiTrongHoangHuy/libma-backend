import db from '../models/index'
import bcrypt from "bcryptjs";

const listCategory = async () => {
    try {
        const readers = await db.Category.findAll({
            attributes: ['category_id',
                ['category_name', 'categoryName'],
                'note',
                'status',
                'createdAt',
                'updatedAt'
            ]
        });
        console.log(readers.every(user => user instanceof db.Category)); // true

        return {
            message: 'Get list category successful',
            code: 200,
            data: readers || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}

module.exports = {listCategory};