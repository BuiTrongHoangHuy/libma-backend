import db from '../models/index'
import bcrypt from "bcryptjs";

const listBookCopy = async () => {
    try {
        const books = await db.BookCopy.findAll({
            include: [{
                model: db.Edition,
                attributes: [
                    ['edition_id', 'editionId'],
                    ['edition_number', 'editionNumber'],
                    ['publication_year', 'publicationYear'],
                    'publisher',
                    'pages',
                    ['thumbnail_url', 'thumbnailUrl'],
                    'isbn',
                ],
                include: [{
                    model: db.Title, attributes: [['title_name', 'titleName'], ['title_id', 'titleId'], 'author'],
                    include: [{
                        model: db.Category,
                        attributes: [['category_id', 'categoryId'], ['category_name', 'categoryName']]
                    }],
                }]
            }],
            attributes: [['copy_id', 'copyId'],
                'condition',
                'location',
                ['book_status', 'bookStatus'],
                'status',
                'createdAt',
                'updatedAt'
            ],
            where: {
                status: 1
            }
        });
        console.log(books.every(user => user instanceof db.BookCopy)); // true

        return {
            message: 'Get list book copies successful',
            code: 200,
            data: books || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}

const createBookCopy = async (bookData) => {
    try {
        const bookResponse = await db.BookCopy.create({
            edition_id: bookData.editionId,
            condition: bookData.condition || "New",
            location: bookData.location,
            book_status: bookData.bookStatus || "Available",
            status: bookData.status,
        })
        return {
            message: 'Successfully add bookCopy',
            code: 200,
            data: bookResponse
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
};

const getBookCopyById = async (id) => {
    try {
        const bookCopy = await db.BookCopy.findOne(
            {
                include: [{
                    model: db.Edition,
                    attributes: [
                        ['edition_id', 'editionId'],
                        ['edition_number', 'editionNumber'],
                        ['publication_year', 'publicationYear'],
                        'publisher',
                        'pages',
                        ['thumbnail_url', 'thumbnailUrl'],
                        'isbn',
                    ],
                    include: [{
                        model: db.Title, attributes: [['title_name', 'titleName'], ['title_id', 'titleId'], 'author'],
                        include: [{
                            model: db.Category,
                            attributes: [['category_id', 'categoryId'], ['category_name', 'categoryName']]
                        }],
                    }]
                }],
                attributes: [['copy_id', 'copyId'],
                    'condition',
                    'location',
                    ['book_status', 'bookStatus'],
                    'status',
                    'createdAt',
                    'updatedAt'
                ],
                where: {copy_id: id, status: 1}
            });
        if (!bookCopy) {
            return {
                message: 'No book copy found',
                code: 404,
            }
        }

        return {
            message: 'Get book copy detail successful',
            code: 200,
            data: bookCopy || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}

const deleteBookCopy = async (id) => {
    try {
        let checkBook = await db.BookCopy.findOne({where: {copy_id: id}})
        if (!checkBook) {
            return {
                message: 'Book copy not found',
                code: 404,
            }
        }
        await db.BookCopy.update(
            {status: 0},
            {
                where: {
                    copy_id: id,
                },
            },
        );
        return {
            message: 'Successfully delete book copy',
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

const updateBookCopy = async (bookId, bookData) => {
    try {
        const book = await db.BookCopy.findByPk(bookId);
        if (book) {
            await db.BookCopy.update({
                edition_id: bookData.editionId,
                condition: bookData.condition,
                location: bookData.location,
                book_status: bookData.bookStatus,
                status: bookData.status,
            }, {
                where: {copy_id: bookId}
            })
            return {
                message: 'Successfully update book copy',
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

const listBookCopyAvailable = async () => {
    try {
        const books = await db.BookCopy.findAll({
            include: [{
                model: db.Edition,
                attributes: [
                    ['edition_id', 'editionId'],
                    ['edition_number', 'editionNumber'],
                    ['publication_year', 'publicationYear'],
                    'publisher',
                    'pages',
                    ['thumbnail_url', 'thumbnailUrl'],
                    'isbn',
                ],
                include: [{
                    model: db.Title, attributes: [['title_name', 'titleName'], ['title_id', 'titleId'], 'author'],
                    include: [{
                        model: db.Category,
                        attributes: [['category_id', 'categoryId'], ['category_name', 'categoryName']]
                    }],
                }]
            }],
            attributes: [['copy_id', 'copyId'],
                'condition',
                'location',
                ['book_status', 'bookStatus'],
                'status',
                'createdAt',
                'updatedAt'
            ],
            where: {
                status: 1,
                book_status: "Available"
            }
        });
        console.log(books.every(user => user instanceof db.BookCopy)); // true

        return {
            message: 'Get list book copies successful',
            code: 200,
            data: books || {}
        }
    } catch (error) {
        console.log(error)
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}
module.exports = {listBookCopy, createBookCopy, getBookCopyById, deleteBookCopy, updateBookCopy,listBookCopyAvailable};