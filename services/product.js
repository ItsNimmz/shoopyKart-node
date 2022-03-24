const Product = require('../models/product');

module.exports = {
    getProducts: async() => {
        try {
            const items = await Product.findAll();
            return items;
        } catch (error) {
            throw new Error(error);
        }
    },
    getProduct: async(productId) => {
        try {
            const product = await Product.findOne({ where: { id: productId } });
            return product;
        } catch (error) {
            throw new Error(error);
        }
    },
    createProduct: async(data) => {
        try {
            const product = await Product.create(data);
            return product;
        } catch (error) {
            throw new Error(error);
        }
    },
    isProductNameExist: async(name) => {
        try {
            const product = await Product.findOne({ where: { name: name } });
            if (product) {
                return true;
            } else {
                return false
            }
        } catch (error) {
            throw new Error(error);
        }
    },
};