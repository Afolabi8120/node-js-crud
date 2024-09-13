const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const service = require('../services/authService');

router.post('/', async (req, res) => {

    // passing data into variables
    const userResult = [];
    const username = req.body.username;
    const password = req.body.password;

    // form validation
    if(username == "" || password == ""){
        res.status(400).send("All input fields are required");
        return;
    }

    // getting user details using email
    const result = await service.userLogin(username);

    if(result.length == 0)
        res.status(401).send('Username/Password is not correct');
    else
        if(result.length > 0 && bcrypt.compareSync(password, result[0].password)) {

            if(result[0].usertype == "user"){
                res.status(200).send("User successfully logged in");
            }
            
            if(result[0].usertype == "admin"){
                res.status(200).send("Admin successfully logged in");
            }
        }else{
            res.status(403).send("Failed to login user");
        }
    
})

module.exports = router;
