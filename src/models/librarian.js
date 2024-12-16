'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Librarian extends Model {
        static associate(models) {
            // A librarian belongs to an account
            Librarian.belongsTo(models.Account, {
                foreignKey: 'account_id',
                as: 'account',
            });
        }
    }

    Librarian.init({
        librarian_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        account_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        full_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        phone_number: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.ENUM('Admin', 'Staff'),
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Librarian',
        tableName: 'Librarians',
        timestamps: false,
    });
    return Librarian;
};
