'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class LoanRecord extends Model {
        static associate(models) {
            // A loan record belongs to a member
            LoanRecord.belongsTo(models.Reader, {
                foreignKey: 'reader_id'
            });
            // A loan record belongs to a book copy
            LoanRecord.belongsTo(models.BookCopy, {
                foreignKey: 'copy_id'
            });
            // A loan record can have many violations
            LoanRecord.hasMany(models.Violation, {
                foreignKey: 'transaction_id'
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
        reader_id: {
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
        modelName: 'LoanRecord',
        tableName: 'LoanRecords',
    });
    return LoanRecord;
};
