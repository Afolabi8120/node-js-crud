const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const service = require('../services/userService');

router.get('/', async (req, res) => {
    const result = await service.getAllUser();
    if(result.length > 0)
        res.status(200).json(result);
    else
        res.status(404).json('No record found in database');
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await service.getSingleUser(id);
    if(result.length == 0)
        res.status(404).json('No record found for id ' + id);
    else
        res.status(200).json(result);
})

router.post('/', async (req, res) => {
    const username = req.body.username;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const picture = req.body.picture;
    const address = req.body.address;
    const pass = req.body.password;
    const status = req.body.status;
    const usertype = req.body.usertype;

    if(username == "" || fullname == "" || email == "" || password == ""){
        res.status(500).json("All input fields are required");
        return;
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const password = hashedPassword;

    const userData = {
        username: username, 
        fullname: fullname, 
        email: email, 
        gender: gender, 
        phone: phone, 
        picture: picture,
        address: address, 
        password: password, 
        status: status, 
        usertype: usertype
    };

    const result = await service.addUser(userData);
    console.log(userData);
    if(result.affectedRows == 0)
        res.status(500).json("Failed to create account");
    else
        res.status(201).json("User account successfully created");
})

router.put('/:id', async (req, res) => {
    
    const id = req.params.id;
    
    const username = req.body.username;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const gender = req.body.gender;
    const phone = req.body.phone;
    const picture = req.body.picture;
    const address = req.body.address;
    const pass = req.body.password;
    const status = req.body.status;
    const usertype = req.body.usertype;

    if(username == "" || fullname == "" || email == "" || pass == ""){
        res.status(500).json("All input fields are required");
        return;
    }

    const hashedPassword = await bcrypt.hash(pass, 10);
    const password = hashedPassword;

    const userData = {
        username: username, 
        fullname: fullname, 
        email: email, 
        gender: gender, 
        phone: phone, 
        picture: picture,
        address: address, 
        password: password, 
        status: status, 
        usertype: usertype
    };

    const result = await service.editUser(id,userData);
    console.log(result);
    if(result.affectedRows == 0)
        res.status(500).json("Failed to edit user details");
    else
        res.status(201).json("User details successfully edited");
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await service.deleteUser(id);
    if(result.length == 0)
        res.status(404).json('No record found for ' + id);
    else
        res.status(200).json('User with id: ' + id + ' successfully deleted');
})

module.exports = router;