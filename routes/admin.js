const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/images/' });
const adminController = require('../controllers/admin');
const checkAuth = require('../middlewares/checkAuth');


router.post('/add-product', adminController.AddProduct);
router.post('/isProductExist', adminController.isProductExist);
router.get('/orders', [checkAuth.checkAuth], adminController.getOrders);

// router.get('/product', adminController.getProducts);
// router.post('/delete', adminController.removeProduct);
// router.get('/edit/:id', adminController.editProduct);
// router.post('/update-product', [body('price').isNumeric({ min: 1, max: 5000000 }).withMessage('Check the values')], adminController.updateProduct);


module.exports = router;