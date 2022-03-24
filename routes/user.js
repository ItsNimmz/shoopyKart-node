const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const checkAuth = require('../middlewares/checkAuth');

// router.post('/add-to-cart', [checkAuth.checkAuth], userController.addToCart);
// router.get('/my-cart', [checkAuth.checkAuth], userController.getCart);
// router.post('/remove-item', [checkAuth.checkAuth], userController.removeFromCart);
router.post('/place-order', [checkAuth.checkAuth], userController.placeOrder);
router.get('/my-order', [checkAuth.checkAuth], userController.getOrder);


module.exports = router;