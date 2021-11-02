'use strict';

const books = (sequelize, DataTypes) => sequelize.define('books', {
    title:{ type:DataTypes.STRING, allowNull: false},
    category: DataTypes.STRING,
    author:DataTypes.STRING,
});

module.exports = books;