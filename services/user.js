const Order = require('../models/order');
const OrderItem = require('../models/orderItem');
const Products = require('../models/product');
const User = require('../models/user');
const sequelize = require('../utils/database');

module.exports = {
    placeOrder: async(userId, data) => {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            const order = await Order
                .create({
                    userId: userId,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    address: data.address,
                    town: data.town,
                    pincode: data.postalCode,
                    payment_status: "PENDING",
                    order_status: "PROCESSING",
                    phone: data.phone,
                    email: data.email,
                    grand_total: data.grand_total,
                    shipping_rate: data.shipping_rate
                }, { transaction })
                .then(async(result) => {
                    const orderData = data.order_details;
                    if (orderData) {
                        orderData.forEach(async(value, index) => {
                            let itemId = value.id;
                            const items = await Products.findOne({
                                where: { id: itemId },
                            });
                            if (items) {
                                const data = await OrderItem.create({
                                    productId: itemId,
                                    product_name: items.name,
                                    quantity: value.quantity,
                                    price: items.price,
                                    orderId: result.id,
                                }, );
                            }
                        });
                    }
                    return data
                });
            await transaction.commit();
            return order;
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            throw new Error(error);
        }
    }
};