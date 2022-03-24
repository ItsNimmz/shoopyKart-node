const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home');

router.get('/home', homeController.getProducts);
router.get('/latestProducts', homeController.getLatestProducts);

module.exports = router;