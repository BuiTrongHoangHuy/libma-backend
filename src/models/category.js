'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Title, {
                foreignKey: 'category_id',
                as: 'titles',
            });
        }
    }

    Category.init({
        category_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        category_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        note: {
            type: DataTypes.STRING,
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
        modelName: 'Category',
        tableName: 'Categories',
    });
    return Category;
};
