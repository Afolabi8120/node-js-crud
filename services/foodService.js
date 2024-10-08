const db = require('../config/db');

const getAllFood = async () => {
    const query = "SELECT f.id, f.title,c.name, f.price,f.description FROM tblfood AS f INNER JOIN tblcategory AS c on f.cat_id = c.id";
    const records = await db.promise().query(query)
    return records[0];
}

const getSingleFood = async (id) => {
    const query = "SELECT * FROM tblfood WHERE id = ?";
    const value = [id];
    const record = await db.promise().query(query,value);
    return record[0];
}

const addFood = async (foodData) => {
    const query = "INSERT INTO tblfood (title,cat_id,price,description,status,picture) VALUES(?,?,?,?,?,?)";
    const values = [foodData.title,foodData.cat_id,foodData.price,foodData.description,foodData.status,foodData.picture];
    const records = await db.promise().query(query,values);
    return records;
}

const editFood = async (id, foodData) => {
    const query = "UPDATE tblfood SET title=?,cat_id=?,price=?,description=?,status=?,picture=? WHERE id=?";
    const values = [foodData.title,foodData.cat_id,foodData.price,foodData.description,foodData.status,foodData.picture, id];
    const records = await db.promise().query(query,values);
    return records;
}

const deleteFood = async (id) => {
    const query = "DELETE FROM tblfood WHERE id = ?";
    const value = [id];
    const record = await db.promise().query(query,value);
    return record[0];
}


module.exports = {
    getAllFood,
    getSingleFood,
    addFood,
    editFood,
    deleteFood
}
