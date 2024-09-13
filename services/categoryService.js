const db = require('../config/db');

const getAllCategory = async () => {
    const query = "SELECT * FROM tblcategory";
    const records = await db.promise().query(query)
    .catch(err => console.log(err))
    return records[0];
}

const getSingleCategory = async (id) => {
    const query = "SELECT * FROM tblcategory WHERE id = ?";
    const value = [id];
    const record = await db.promise().query(query,value);
    return record[0];
}

const addCategory = async (categoryData) => {
    const query = "INSERT INTO tblcategory (name) VALUES(?)";
    const values = [categoryData.name];
    const records = await db.promise().query(query,values);
    return records;
}

const editCategory = async (id, categoryData) => {
    const query = "UPDATE tblcategory SET name=? WHERE id=?";
    const values = [categoryData.name, id];
    const records = await db.promise().query(query,values);
    return records;
}

const deleteCategory = async (id) => {
    const query = "DELETE FROM tblcategory WHERE id = ?";
    const value = [id];
    const record = await db.promise().query(query,value);
    return record[0];
}


module.exports = {
    getAllCategory,
    getSingleCategory,
    addCategory,
    editCategory,
    deleteCategory
}
