import db from '../models/index'
import bcrypt from "bcryptjs";

const listTitle = async () => {
    try {
        const titles = await db.Title.findAll({
            include: [{
                model: db.Category, attributes: [['category_name', 'categoryName']],
            }],
            attributes: [['title_id', 'titleId'],
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

const createTitle = async (titleData) => {
    try {
        let checkTitle = await db.Title.findOne({where: {title_name: titleData.titleName}})
        if (checkTitle) {
            return {
                message: 'Title already exists',
                code: 400,
            }
        }
        await db.Title.create({
            title_name: titleData.titleName,
            author: titleData.author,
            category_id: titleData.categoryId,
            summary: titleData.summary,
            status: titleData.status,
        })
        return {
            message: 'Successfully add title',
            code: 200,
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
};

const getTitleById = async (id) => {
    try {
        const title = await db.Title.findOne(
            {
                include: [{
                    model: db.Category, attributes: ['category_name'],
                }],
                where: {title_id: id}
            });
        if (!title) {
            return {
                message: 'No title found',
                code: 404,
            }
        }

        return {
            message: 'Get reader detail successful',
            code: 200,
            data: title || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}

const deleteTitle = async (id) => {
    try {
        let checkTitle = await db.Title.findOne({where: {title_id: id}})
        if (!checkTitle) {
            return {
                message: 'Title not found',
                code: 404,
            }
        }
        await db.Title.update(
            {status: 0},
            {
                where: {
                    title_id: id,
                },
            },
        );
        return {
            message: 'Successfully delete title',
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
module.exports = {listTitle, createTitle, getTitleById, deleteTitle};