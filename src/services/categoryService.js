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
            ],
            where: {
                status: 1
            }
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
                where: {category_id: id, status: 1}
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
const countBooksByCategory = async () => {
    try {
        const categories = await db.Category.findAll({
            attributes: ['category_name'],
            include: [
                {
                    model: db.Title,
                    attributes: [],
                    include: [
                        {
                            model: db.Edition,
                            attributes: [],
                            include: [
                                {
                                    model: db.BookCopy,
                                    attributes: [
                                        [db.Sequelize.fn('COUNT', db.Sequelize.col('copy_id')), 'totalBooks']
                                    ],
                                    /*where: {
                                        book_status: 'Available',
                                    },
                                    required: true,*/
                                }
                            ]
                        }
                    ]
                }
            ],
            group: ['Category.category_name'],
            raw: true,
        });

        // Kiểm tra nếu không có thể loại nào
        if (!categories || categories.length === 0) {
            return {
                message: 'No categories found',
                code: 404,
            };
        }

        const result = categories.map(category => ({
            category: category['category_name'],
            totalBooks: category['Title.Edition.BookCopies.totalBooks'] || 0,
        }));

        return {
            message: 'Get book count by category successful',
            code: 200,
            data: categories,
        };
    } catch (error) {
        console.error(error);
        return {
            message: error.message,
            code: 500,
            error: error,
        };
    }
};



module.exports = {listCategory, createCategory, deleteCategory,getCategoryById,updateCategory,countBooksByCategory};