'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Title extends Model {
        static associate(models) {
            // A title has many editions
            Title.hasMany(models.Edition, {
                foreignKey: 'title_id'
            });
            Title.belongsTo(models.Category, {
                foreignKey: 'category_id'
            })

        }
    }

    Title.init({
        title_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: DataTypes.BIGINT,
        },
        summary: {
            type: DataTypes.TEXT,
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
        modelName: 'Title',
        tableName: 'Titles',
    });
    return Title;
};
