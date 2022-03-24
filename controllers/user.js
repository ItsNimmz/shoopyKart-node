const Products = require("../models/product");
const { responseData } = require('../helper/response');
const User = require("../models/user");
const Service = require('../services/user');
const OrderItem = require("../models/orderItem");
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database');
module.exports = {
    getOrder: async(req, res, next) => {
        try {
            const user_id = req.user.id;
            const orderData = await sequelize.query("SELECT * FROM `orders` where userId =" + user_id, { type: QueryTypes.SELECT });
            return res.status(200).json(responseData(true, `sucess`, orderData));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    },
    placeOrder: async(req, res, next) => {
        try {
            const usertId = req.user.id;
            const orderData = req.body.body;
            const data = await Service.placeOrder(usertId, orderData);
            return res.status(200).json(responseData(true, 'Order placed successfully!!', data));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    }
};