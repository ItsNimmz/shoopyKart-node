const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Order = sequelize.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    town: {
        type: Sequelize.STRING
    },
    pincode: {
        type: Sequelize.INTEGER
    },
    payment_status: {
        type: Sequelize.STRING
    },
    order_status: {
        type: Sequelize.STRING
    },
    phone: {
        type: Sequelize.INTEGER
    },
    email: {
        type: Sequelize.STRING
    },
    grand_total: {
        type: Sequelize.INTEGER
    },
    shipping_rate: {
        type: Sequelize.INTEGER
    },


});
module.exports = Order;