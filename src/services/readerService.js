import db from '../models/index'

const listReader = async () => {
    try {
        const readers = await db.Reader.findAll({
            attributes: ['reader_id',
                ['full_name', 'fullName'],
                ['phone_number', 'phoneNumber'],
                'email',
                'address',
                'type',
                'status',
                'createdAt',
                'updatedAt'
            ]
        });
        console.log(readers.every(user => user instanceof db.Reader)); // true

        return {
            message: 'Get list user successful',
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
module.exports = {listReader};