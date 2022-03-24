const jwt = require('jsonwebtoken');
const jwtSecret = "WOXSFFLUTDPMIRAJD";

const jwtToken = async(data) => {
    const token = jwt.sign({
        id: data.id,
        email: data.email,
        password: data.password,
        user_role: data.user_role
    }, jwtSecret);
    return token;
};
module.exports = {
    jwtToken
};