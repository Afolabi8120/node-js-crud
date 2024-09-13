const express = require('express');
const router = express.Router();

const service = require('../services/categoryService');

router.get('/', async (req, res) => {
    const result = await service.getAllCategory();
    if(result.length > 0)
        res.status(200).json(result);
    else
        res.status(404).json('No record found in database');
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await service.getSingleCategory(id);
    if(result.length == 0)
        res.status(404).json('No record found for id ' + id);
    else
        res.status(200).json(result);
})

router.post('/', async (req, res) => {
    const foodData = req.body;
    const result = await service.addCategory(foodData);
    console.log(result);
    if(result.affectedRows == 0)
        res.status(500).json("Failed to add food");
    else
        res.status(201).json("Category successfully added");
})

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const foodData = req.body;
    const result = await service.editCategory(id,foodData);
    console.log(result);
    if(result.affectedRows == 0)
        res.status(500).json("Failed to edit food");
    else
        res.status(201).json("Category successfully edited");
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await service.deleteCategory(id);
    if(result.length == 0)
        res.status(404).json('No record found for ' + id);
    else
        res.status(200).json('Category with id: ' + id + ' successfully deleted');
})

module.exports = router;