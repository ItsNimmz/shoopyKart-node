const { type } = require('express/lib/response');
const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const OrderItem = sequelize.define('orderItem', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    price: {
        type: Sequelize.INTEGER
    },
    product_name: {
        type: Sequelize.STRING
    },
    product_id: {
        type: Sequelize.INTEGER
    },
    orderId: {
        type: Sequelize.INTEGER
    }
});
module.exports = OrderItem;