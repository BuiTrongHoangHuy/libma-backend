'use strict';
const {Model, DataTypes} = require('sequelize');
module.exports = (sequelize) => {
    class Edition extends Model {
        static associate(models) {
            // An edition belongs to a title
            Edition.belongsTo(models.Title, {
                foreignKey: 'title_id'
            });
            // An edition has many book copies
            Edition.hasMany(models.BookCopy, {
                foreignKey: 'edition_id'
            });
        }
    }

    Edition.init({
        edition_id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        edition_number: {
            type: DataTypes.INTEGER,
        },
        publication_year: {
            type: DataTypes.INTEGER,
        },
        publisher: {
            type: DataTypes.STRING,
        },
        pages: {
            type: DataTypes.INTEGER,
        },
        thumbnail_url: {
            type: DataTypes.STRING()
        },
        isbn: {
            type: DataTypes.STRING,
            unique: true,
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
        modelName: 'Edition',
        tableName: 'Editions',
    });
    return Edition;
};
