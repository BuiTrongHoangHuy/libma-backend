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

const createEdition = async (editionData) => {
    try {
        let checkEdition = await db.Edition.findOne({where: {isbn: editionData.isbn}})
        if (checkEdition) {
            return {
                message: 'Edition already exists',
                code: 400,
            }
        }
        const editionResponse = await db.Edition.create({
            title_id: editionData.titleId,
            edition_number: editionData.editionNumber,
            publication_year: editionData.publicationYear,
            publisher: editionData.publisher,
            pages: editionData.pages,
            thumbnail_url: editionData.thumbnailUrl,
            isbn: editionData.isbn,
            status: editionData.status,
        })
        return {
            message: 'Successfully add edition',
            code: 200,
            data: editionResponse
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
};

const getEditionById = async (id) => {
    try {
        const edition = await db.Edition.findOne(
            {
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
                ],
                where: {edition_id: id}
            });
        if (!edition) {
            return {
                message: 'No edition found',
                code: 404,
            }
        }

        return {
            message: 'Get edition detail successful',
            code: 200,
            data: edition || {}
        }
    } catch (error) {
        return {
            message: error.message,
            code: error.code,
            error: error,
        }
    }
}

const deleteEdition = async (id) => {
    try {
        let checkEdition = await db.Edition.findOne({where: {edition_id: id}})
        if (!checkEdition) {
            return {
                message: 'Edition not found',
                code: 404,
            }
        }
        await db.Edition.update(
            {status: 0},
            {
                where: {
                    edition_id: id,
                },
            },
        );
        return {
            message: 'Successfully delete edition',
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

const updateEdition = async (editionId, editionData) => {
    try {
        const edition = await db.Edition.findByPk(editionId);
        if (edition) {
            await db.Edition.update({
                title_id: editionData.titleId,
                edition_number: editionData.editionNumber,
                publication_year: editionData.publicationYear,
                publisher: editionData.publisher,
                pages: editionData.pages,
                thumbnail_url: editionData.thumbnailUrl,
                isbn: editionData.isbn,
                status: editionData.status,
            }, {
                where: {edition_id: editionId}
            })
            return {
                message: 'Successfully update edition',
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
module.exports = {listEdition, createEdition, getEditionById, deleteEdition, updateEdition};