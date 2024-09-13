const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '(Afolabi8120)',
    database: 'food_db'
});

connection.connect(function (err) {
    if(err) {
        console.log('Error connecting to databse');
        console.log(err);
    }else{
        console.log('Connected to Database');
    }
})

module.exports = connection;
