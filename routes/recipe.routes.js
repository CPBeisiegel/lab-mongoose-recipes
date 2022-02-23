const mongoose = require('mongoose');

const express = require("express");

const router = express.Router();

const Recipe = require('../models/Recipe.model');
const data = require('../data.json');


router.post('/create-recipe', async (req, res) => {
    try {

        const newRecipe = await Recipe.create(req.body);

        return res.status(201).json(newRecipe)


    } catch (err) {
        return res.status(500).json(err);
    }
})

router.post('/insert-recipe', async (req, res) => {
    try{
        /* Recipe.deleteMany() */
        const newRecipes= await Recipe.insertMany(data)

        return res.status(201).json(newRecipes)

    } catch (err) {
        return res.status(500).json(err);
    }
})

/* Solução hard */

router.put('/update-recipe', async (req, res) => {
    try{
        
        const recipeToEdit = await Recipe.findOneAndUpdate(
            { title: "Rigatoni alla Genovese" },
            {  duration: 100  },
            { new: true }
        )
            
        console.log("Rigatoni updated", recipeToEdit)


        return res.status(201).json(recipeToEdit)

    } catch (err) {
        return res.status(500).json(err);
    }

})

/* Solução mais recomendada  */

/* router.put('/update/:title/:duration', async (req, res) => {
    const { title, duration } = req.params
    try {
        const updateRecipe = await Recipe.findOneAndUpdate({ title: title }, {duration: Number(duration)})
        return res.status(200).json(updateRecipe)
    } catch (error) {
        return res.status(500).json(error);
    }
}) */


router.delete("/delete/:title", async (req, res) => {
    const { title } = req.params

    try{

        /* Para essa solução precisa usar o %20
        http://localhost:8080/recipes/delete/Carrot%20Cake
        */
        const recipeDelete = await Recipe.deleteOne({ title: title });
      
        /* Solução hard
        const resultDelete = await Recipe.deleteOne({ title: "Carrot Cake" });
        */
     
        return res.status(201).json(recipeDelete)

    } catch (err) {
        return res.status(500).json(err);
    }

  });



/* .create()
.find()
.findOne
.findOneAndUpdate
.insertMany
.deleteOne() */


module.exports = router;


