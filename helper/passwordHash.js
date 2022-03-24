const bcrypt = require('bcryptjs');

const passwordHash = async(password) => {
    const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(12));
    return passwordHash;
};
const passwordCompare = async(password, inputPassword) => {
    const doMatch = await bcrypt.compare(inputPassword, password);
    return doMatch;
}

module.exports = {
    passwordHash,
    passwordCompare
};