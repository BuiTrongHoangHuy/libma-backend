'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Reader extends Model {
        static associate(models) {
            // define association here
            Reader.hasMany(models.LoanRecord, {
                foreignKey: 'reader_id'
            });
            Reader.hasMany(models.Notification, {
                foreignKey: 'reader_id'
            });
            Reader.belongsTo(models.Account, {
                foreignKey: 'account_id'
            })
        }
    }

    Reader.init({
        reader_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        account_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        full_name: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.ENUM('Student', 'Guest', 'Teacher')
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
        modelName: 'Reader',
        tableName: 'Readers',
    });
    return Reader;
};
