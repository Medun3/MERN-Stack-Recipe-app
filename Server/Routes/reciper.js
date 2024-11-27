const express = require('express')
const RecipeModel = require('../models/Recipe')
const UserModel = require('../models/User')
const router = express.Router()

//create recipe
router.post('/create-recipe', (req, res) => {
    RecipeModel.create({
    name: req.body.name, description: req.body.description,
    ingredients: req.body.ingredients,imageUrl: req.body.imageUrl,
    userId: req.body.userId
   }).then(result => {
    return res.json(result)
   }).catch(err => console.log(err))
})  

//home
router.get('/recipes', (req,res) => {
    RecipeModel.find()
    .then(recipes => {
        return res.json(recipes)
    }).catch(err => res.json(err))
})

router.get('/recipe-by-id/:id',(req,res) => {
    const id = req.params.id;
    RecipeModel.findById({_id:id})
    .then(result =>{
        return res.json(result)
    }).catch(err => res.json(err))
})

//saved recipes
router.get('/saved-recipe/:id', (req,res) => {
  const id = req.params.id;
  UserModel.findById({_id: id})
  .then(result => {
    console.log(result)
    return res.json({savedRecipes: result.savedRecipes})
   }).catch(err => res.status(500).json(err))
})

router.get('/user-recipes/:id', async (req,res) =>{
    const id = req.params.id;
    try{
        const user = await UserModel.findById({_id: id});      
        const recipes = await RecipeModel.find({
            _id: {$in: user.savedRecipes}
        })
        res.status(201).json(recipes);
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/', async(req, res) => {
    const recipe = await RecipeModel.findById({_id: req.body.recipeId})
    const user = await UserModel.findById({_id: req.body.userId});
try{
    user.savedRecipes.push(recipe)
    user.save()
    return res.json({savedRecipes: user.savedRecipes})
} catch(err){
    return res.json(err)
}
})

// DELETE route to remove a recipe by ID
router.delete('/saved-recipes/:recipeId', async (req, res) => {
    try {
        const { userId } = req.body;
        const { recipeId } = req.params;
        const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.savedRecipes = user.savedRecipes.filter(id => id.toString() !== recipeId);
    await user.save();
    res.status(200).json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  
     }
  });

// delete the all mongodb data
router.delete('/read-recipes/:id', async (req, res) => {
  try {
    // Your logic to delete a recipe
    const result = await RecipeModel.findByIdAndDelete({ _id: req.params.id });
    
    if (result.deletedCount === 0) {
      return res.status(404).send('Recipe not found');
    }
    res.status(200).send('Recipe deleted successfully');
  } catch (error) {
    console.error('Error deleting recipe:', error);
    res.status(500).send('Internal Server Error');
  }
});
//update data
router.put('/update-recipe/:id', (req, res) => {
  const {name, description,ingredients,imageUrl,userId}=req.body;
  const {recipeId} = req.params.id
  RecipeModel.findOneAndUpdate(
    {recipeId},
    {name, description,ingredients,imageUrl,userId},
    {new:true})  
 .then(recipeId => {
  RecipeModel.find({})
   return res.json(recipeId)
  })
  .catch(err => console.log(err))
})

module.exports =router