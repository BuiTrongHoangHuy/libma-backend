import db from '../models/index'
import bcrypt from "bcryptjs";

const listEdition = async () => {
    try {
        const editions = await db.Edition.findAll({
            include: [{
                model: db.Title, attributes: [['title_name', 'titleName'], ['title_id', 'titleId'], 'author'],
                include: [{
                    model: db.Category,
                    attributes: [['category_id', 'categoryId'], ['category_name', 'categoryName']]
                }],
            }],
            attributes: [['edition_id', 'editionId'],
                ['edition_number', 'editionNumber'],
                ['publication_year', 'publicationYear'],
                'publisher',
                'pages',
                ['thumbnail_url', 'thumbnailUrl'],
                'isbn',
                'status',
                'createdAt',
                'updatedAt'
            ]
        });
        console.log(editions.every(user => user instanceof db.Edition)); // true

        return {
            message: 'Get list edition successful',
            code: 200,
            data: editions || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}


module.exports = {listEdition};