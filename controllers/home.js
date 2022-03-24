const Product = require("../models/product");
const { responseData } = require('../helper/response');
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database');
module.exports = {
    getProducts: async(req, res, next) => {
        try {
            const products = await Product.findAll();
            return res.status(200).json(responseData(true, `success`, products));
        } catch (error) {
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    },
    getLatestProducts: async(req, res, next) => {
        try {
            const products = await sequelize.query("SELECT * FROM `products` order by createdAt desc limit 9 ", { type: QueryTypes.SELECT });;
            return res.status(200).json(responseData(true, `success`, products));
        } catch (error) {
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    }
}