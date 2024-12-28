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

const createCategory = async (categoryData) => {
    try {
        let checkCategory = await db.Category.findOne({where: {category_name: categoryData.categoryName}})
        if (checkCategory) {
            return {
                message: 'Category already exists',
                code: 400,
            }
        }
        await db.Category.create({
            category_name: categoryData.categoryName,
            note: categoryData.note,
        })
        return {
            message: 'Successfully add Category',
            code: 200,
        }
    } catch (error) {
        console.log(error)
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
};

module.exports = {listCategory, createCategory};