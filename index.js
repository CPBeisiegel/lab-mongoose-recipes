const mongoose = require('mongoose');
const express = require("express")
require('./config/db.conifg')()

const index = express();
index.use(express.json());

//routes
const recipesRouter = require('./routes/recipe.routes')
index.use("/recipes", recipesRouter)

// instanciando a porta que vamos usar
const PORT = 8080

index.listen(PORT, () => {
  console.log(`Server up and running at port ${PORT}.`);
})


