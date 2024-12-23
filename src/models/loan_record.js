'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class LoanRecord extends Model {
        static associate(models) {
            // A loan record belongs to a member
            LoanRecord.belongsTo(models.User, {
                foreignKey: 'user_id',
                as: 'user',
            });
            // A loan record belongs to a book copy
            LoanRecord.belongsTo(models.BookCopy, {
                foreignKey: 'copy_id',
                as: 'bookCopy',
            });
            // A loan record can have many violations
            LoanRecord.hasMany(models.Violation, {
                foreignKey: 'transaction_id',
                as: 'violations',
            });
        }
    }

    LoanRecord.init({
        transaction_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        copy_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        loan_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        due_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        return_date: {
            type: DataTypes.DATE,
        },
        fine: {
            type: DataTypes.DECIMAL(10, 2),
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
        modelName: 'LoanRecord',
        tableName: 'LoanRecords',
    });
    return LoanRecord;
};