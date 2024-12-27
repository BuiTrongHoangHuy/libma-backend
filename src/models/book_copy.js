'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class BookCopy extends Model {
        static associate(models) {
            // A book copy belongs to an edition
            BookCopy.belongsTo(models.Edition, {
                foreignKey: 'edition_id',
                as: 'edition',
            });
            // A book copy can be part of many loan records
            BookCopy.hasMany(models.LoanRecord, {
                foreignKey: 'copy_id',
                as: 'loanRecords',
            });
        }
    }

    BookCopy.init({
        copy_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        edition_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        condition: {
            type: DataTypes.ENUM('New', 'Good', 'Old'),
        },
        location: {
            type: DataTypes.STRING,
        },
        book_status: {
            type: DataTypes.ENUM('Available', 'Borrowed'),
        },
        status: {
            type: DataTypes.INTEGER,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'BookCopy',
        tableName: 'BookCopies',
    });
    return BookCopy;
};
