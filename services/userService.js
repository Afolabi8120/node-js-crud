const db = require('../config/db');

const getAllUser = async () => {
    const query = "SELECT * FROM tbluser";
    const records = await db.promise().query(query);
    return records[0];
}

const getSingleUser = async (id) => {
    const query = "SELECT * FROM tbluser WHERE id = ?";
    const value = 1;
    const record = await db.promise().query(query,value);
    return record[0];
}

const addUser = async (userData) => {
    const query = "INSERT INTO tbluser (username,fullname,email,gender,phone,picture,address,password,status,usertype) VALUES(?,?,?,?,?,?,?,?,?,?)";
    const values = [userData.username,userData.fullname,userData.email,userData.gender,userData.phone,userData.picture,userData.address,userData.password,userData.status,userData.usertype];
    const records = await db.promise().query(query,values);
    return records;
}

const editUser = async (id, userData) => {
    const query = "UPDATE tbluser SET username=?,fullname=?,email=?,gender=?,phone=?,picture=?,address=?,password=?,status=?,usertype=? WHERE id=?";
    const values = [userData.username,userData.fullname,userData.email,userData.gender,userData.phone,userData.picture,userData.address,userData.password,userData.status,userData.usertype, id];
    const records = await db.promise().query(query,values);
    return records;
}

const changeUserPassword = async (id, userData) => {
    const query = "UPDATE tbluser SET password=? WHERE id=?";
    const values = [userData.password, id];
    const records = await db.promise().query(query,values);
    return records;
}

const deleteUser = async (id) => {
    const query = "DELETE FROM tbluser WHERE id = ?";
    const value = [id];
    const record = await db.promise().query(query,value);
    return record[0];
}


module.exports = {
    getAllUser,
    getSingleUser,
    addUser,
    editUser,
    changeUserPassword,
    deleteUser
}
