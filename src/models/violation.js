'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Violation extends Model {
        static associate(models) {
            // A violation belongs to a loan record
            Violation.belongsTo(models.LoanRecord, {
                foreignKey: 'transaction_id',
            });
        }
    }

    Violation.init({
        violation_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        transaction_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        violation_type: {
            type: DataTypes.ENUM('Late_Return', 'Lost_Book', 'Damaged_Book'),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
        fine_amount: {
            type: DataTypes.DECIMAL(10, 2),
        },
        resolved: {
            type: DataTypes.INTEGER,
            defaultValue: false,
        },
        penalty_date: {
            type: DataTypes.DATE
        },
        penalty_end_date: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.INTEGER
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
        modelName: 'Violation',
        tableName: 'Violations',
    });
    return Violation;
};
