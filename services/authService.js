const db = require('../config/db');

const userLogin = async (userData) => {
    const query = "SELECT * FROM tbluser WHERE username = ? ";
    const value = userData;
    const record = await db.promise().query(query,value);
    return record[0];
}


module.exports = {
    userLogin
}
