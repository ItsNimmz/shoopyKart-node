const { responseData } = require('../helper/response.js');
const Service = require('../services/product');
const { QueryTypes } = require('sequelize');
const sequelize = require('../utils/database');
module.exports = {
    AddProduct: async(req, res, next) => {
        try {
            const data = req.body;
            // if (req.file) data.imageurl = req.file.filename;
            theRandomNumber = Math.floor(Math.random() * 10) + 1;
            const images = ["iphone.jpg", "samsung.jpg", "oneplus.jpg", "iphone.jpg", "samsung.jpg", "oneplus.jpg", "soni.jpg", "google.jpg", "ip.jpg", "google.jpg", "ip.jpg"];
            data.imageurl = images[theRandomNumber];

            const product = await Service.createProduct(data);
            return res.status(200).json(responseData(true, `Product added Successfully`, product));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    },
    isProductExist: async(req, res, next) => {
        try {
            const name = req.body.name;
            const product = await Service.isProductNameExist(name);
            if (product) {
                return res.status(200).json(responseData(false, `Product name already exist`));
            }
            return res.status(200).json(responseData(true, `Product name available`));
        } catch (error) {
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    },
    getOrders: async(req, res, next) => {
        try {
            const user_id = req.user.id;
            const orderData = await sequelize.query("SELECT * FROM `orders` order by createdAt desc ", { type: QueryTypes.SELECT });
            return res.status(200).json(responseData(true, `sucess`, orderData));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    },


}