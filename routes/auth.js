const express = require('express');
const routes = express.Router();
const authController = require('../controllers/auth');
const { signup, login, validate } = require('../middlewares/validation.js');

routes.post('/signup', [signup(), validate], authController.signUp);
routes.post('/login', [login(), validate], authController.login);
routes.post('/isEmailAvailable', authController.isEmailAvailable);


module.exports = routes;