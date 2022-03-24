const { body, validationResult } = require('express-validator');
const { passwordCompare } = require('../helper/passwordHash');
const { responseData } = require('../helper/response');
const User = require('../models/user');

const login = () => {
    return [
        body('email')
        .isEmail().withMessage('Please enter a valid E-mail')
        .custom(async(value, { req }) => {
            const isUserExist = await User.findAll({
                where: {
                    email: req.body.email
                }
            });
            if (isUserExist.length == 0) {
                throw new Error('User does not exist');
            }
            return true;
        }),

        body('password')
        .not()
        .isEmpty().withMessage('Please enter password')
        .custom(async(value, { req }) => {
            const userData = await User.findAll({
                where: {
                    email: req.body.email
                }
            });
            if (userData.length != 0) {
                const match = await passwordCompare(userData[0].password, req.body.password);
                if (!match) {
                    throw new Error('Password is incorrect!!');
                }
            }
            return true;
        })
    ]
};

const signup = () => {
    return [
        body('name')
        .matches(/^[a-zA-Z][a-z\s]+$/i)
        .withMessage('Please enter a valid Name'),

        body('username')
        .isAlphanumeric().withMessage('Username must only contain alphanumeric characters')
        .isLength({ min: 2, max: 10 }).withMessage('Username length must be between 6 to 10'),

        body('email')
        .isEmail().withMessage('Wrong or Invalid email address'),
        // .custom(async(value, { req }) => {
        //     const userExist = await User.findAll({
        //         where: {
        //             email: req.body.email
        //         }
        //     });
        //     if (userExist.length > 0) {
        //         throw new Error('E-mail address already in use');
        //     }
        //     return true;
        // }),

        body('password')
        .isLength({ min: 2, max: 10 }).withMessage('Password should have a minimum of 6 characters and maximum 10 characters'),

        // body('confirmPassword')
        // .custom((value, { req }) => {
        //     return true;
        //     // if (value !== req.body.password) {
        //     //     throw new Error('Passwords do not match');
        //     // }
        //     // return true;
        // })
        // .custom(async(value, { req }) => {
        //     const userExist = await User.findAll({
        //         where: {
        //             email: req.body.email
        //         }
        //     });
        //     if (userExist.length > 0) {
        //         throw new Error('E-mail address already in use');
        //     }
        //     return true;
        // })
    ]
};

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    const errorMsgs = [];
    errors.array().forEach(err => {
        errorMsgs.push(err.msg);
    });

    return res.status(400).json(responseData(false, 'Validation Errors', errorMsgs));
};

module.exports = {
    signup,
    login,
    validate
};