'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Title extends Model {
        static associate(models) {
            // A title has many editions
            Title.hasMany(models.Edition, {
                foreignKey: 'title_id',
                as: 'editions',
            });
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
        category: {
            type: DataTypes.STRING,
        },
        summary: {
            type: DataTypes.TEXT,
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
        modelName: 'Title',
        tableName: 'Titles',
        timestamps: false,
    });
    return Title;
};
