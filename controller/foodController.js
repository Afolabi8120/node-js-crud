const express = require('express');
const router = express.Router();

const service = require('../services/foodService');
const catService = require('../services/categoryService');

router.get('/', async (req, res) => {
    const result = await service.getAllFood();
    const categoryresult = await catService.getAllCategory();
    if(result.length > 0)
        res.render('pages/add-food', { foods: result, category: categoryresult });
        //res.status(200).json(result);
    else
        res.status(404).json('No record found in database');
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const result = await service.getSingleFood(id);
    const categoryresult = await catService.getAllCategory();
    if(result.length == 0)
        res.status(404).json('No record found for id ' + id);
    else
        res.render('pages/edit-food', { id: id, foods: result, category: categoryresult });
        //res.status(200).json(result);
})

router.post('/', async (req, res) => {
    const foodData = req.body;
    const result = await service.addFood(foodData);
    console.log(result);
    if(result.affectedRows == 0)
        res.status(500).json("Failed to add food");
    else
        res.redirect('/foods/');
        //res.status(201).json("Food successfully added");
})

router.post('/update/:id', async (req, res) => {
    const id = req.params.id;
    const foodData = req.body;
    const result = await service.editFood(id,foodData);
    console.log(result);
    if(result.affectedRows == 0)
        res.status(500).json("Failed to edit food");
    else
        res.redirect('/foods');
        //res.status(201).json("Food successfully edited");
})

router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    const result = await service.deleteFood(id);
    if(result.affectedRows === 1){
        res.status(200).json("Food successfully deleted");
    }
    res.redirect('/foods');
})

module.exports = router;