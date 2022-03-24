const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    discount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageurl: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Product;