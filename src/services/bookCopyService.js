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
            ]
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


module.exports = {listBookCopy};