const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const { jwtToken } = require('../helper/jwtToken.js');
const { passwordHash } = require('../helper/passwordHash.js');
const { responseData } = require('../helper/response.js');

module.exports = {
    signUp: async(req, res, next) => {
        try {
            const userData = await User.findOne({ where: { email: req.body.email } });
            if (userData) {
                return res.status(500).json(responseData(false, 'email not available'));
            }
            const user = await User.create({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: await passwordHash(req.body.password),
                user_role: 'user'
            });
            return res.status(200).json(responseData(true, `Registration Successful, Please login!!`));
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    },

    login: async(req, res, next) => {
        try {
            const userData = await User.findOne({ where: { email: req.body.email } });
            const token = await jwtToken(userData);
            return res.status(200).json({ status: true, token, message: "Login Succesful", user: userData, });
        } catch (error) {
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    },
    isEmailAvailable: async(req, res, next) => {
        try {
            const userData = await User.findOne({ where: { email: req.body.email } });
            if (userData) {
                return res.status(200).json({ status: false, message: "Email not available" });
            } else {
                return res.status(200).json({ status: true, message: "Email available" });
            }
        } catch (error) {
            return res.status(500).json(responseData(false, error.message, [error.message]));
        }
    },
}