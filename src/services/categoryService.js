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
const deleteCategory = async (categoryId) => {
    try {
        let checkCategory = await db.Category.findOne({where: {category_id: categoryId}})
        if (!checkCategory) {
            return {
                message: 'Category not found',
                code: 400,
            }
        }
        await db.Category.update(
            {status: 0},
            {
                where: {
                    category_id: categoryId,
                },
            },
        );
        return {
            message: 'Successfully delete reader',
            code: 200,
        }
    } catch (error) {
        return {
            message: error.message,
            code: 500,
            error: error,
        }
    }
}

const getCategoryById = async (id) => {
    try {
        const category = await db.Category.findOne(
            {
                where: {category_id: id}
            });
        if (!category) {
            return {
                message: 'No category found',
                code: 200,
            }
        }
        return {
            message: 'Get category detail successful',
            code: 200,
            data: category || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}
const updateCategory = async (categoryId, categoryData) => {
    try {
        const category = await db.Category.findByPk(categoryId);
        if (category) {
            await db.Category.update({
                category_name: categoryData.categoryName,
                note: categoryData.note,
                status: categoryData.status,
            }, {
                where: {category_id: categoryId}
            })
            return {
                message: 'Successfully update category',
                code: 200,
            }
        }
    } catch (error) {
        return {
            message: error.message,
            code: 500,
            error: error,
        }
    }

}
module.exports = {listCategory, createCategory, deleteCategory,getCategoryById,updateCategory};