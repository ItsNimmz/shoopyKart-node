const { responseData } = require("../helper/response");
const jwt = require('jsonwebtoken');
const jwtSecret = "WOXSFFLUTDPMIRAJD";

const checkAuth = async(req, res, next) => {
    let authHeader;
    authHeader = req.headers.authorization;
    if (!authHeader) {
        authHeader = req.body.headers.Authorization;
    }
    if (!authHeader) {
        return res.status(401).json(responseData(false, 'User not logged in'));
    }
    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
        return res.status(401).json(responseData(false, 'User not logged in'));
    }
    try {
        const decoded = await jwt.verify(accessToken, jwtSecret);
        req.user = decoded;
    } catch (error) {
        console.log(error);
        return res.status(500).json(responseData(false, error.message, [error.message]));
    }

    next();
}

module.exports = { checkAuth };