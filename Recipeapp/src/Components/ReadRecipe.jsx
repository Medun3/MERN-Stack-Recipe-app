import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'



function ReadRecipe() {
  const { id } = useParams()
  const navigate = useNavigate()
  const userId = window.localStorage.getItem("id")

  const [recipe, setRecipe] = useState([])
  const [savedRecipes, setSavedRecipes] = useState([])


  useEffect(() => {
    const getRecipe = () => {
      axios.get('http://localhost:3001/recipe/recipe-by-id/' + id)
        .then(result => {
          setRecipe(result.data)
        }).catch(err => console.log(err))
    }

    const fetchSavedRecipes = () => {
      axios.get('http://localhost:3001/recipe/saved-recipe/' + userId)
        .then(result => {
          setSavedRecipes(result.data.savedRecipes)
        }).catch(err => console.log(err))
    }
    fetchSavedRecipes()
    getRecipe()
  }, [])

  const savedRecipe = (recipeId) => {
    axios.put('http://localhost:3001/recipe', { userId, recipeId })
      .then(result => (
        setSavedRecipes(result.data.savedRecipes)
      )).catch(err => console.log(err))
  }
  const isRecipeSaved = (id) => savedRecipes.includes(id);


  const deleteRecipes = async (recipeId) => {
    await axios.delete(`http://localhost:3001/recipe/read-recipes/${recipeId}`, { data: { userId } })
      .then(result => {
        setSavedRecipes((preUser) => preUser.filter((recipe) => recipe._id !== userId))
        console.log(result.data)
        navigate('/')
      })
      .catch(err => console.log(err))
  }

  // update function
  const updateRecipes = (name, description, ingredients, imageUrl) => {
    localStorage.setItem('name', name)
    localStorage.setItem('description', description)
    localStorage.setItem('ingredients', ingredients)
    localStorage.setItem('imageUrl', imageUrl)
    navigate('/recipe/update-recipe/:id')
  }



  return (
    <div id="read-recipe" className='d-flex justify-content-center'>
      <div className='image-read'>
        <h2>{recipe.name}</h2>
        <img src={recipe.imageUrl} alt="Recipe" width="400" height="300" />
      </div>
      <div className="read-cover">
        <button
          style={{ borderRadius: '15px', }}
          className='btn btn-warning me-1'
          onClick={() => savedRecipe(recipe._id)}
          disabled={isRecipeSaved(recipe._id)}>
          {isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>


          <button onClick={() => updateRecipes
          (recipe.name, recipe.description, 
           recipe.ingredients, recipe.imageUrl)}
           
           style={{borderRadius: '15px',}}
           className='btn btn-warning me-1 justify-content-center'>edit</button>

        <button onClick={() => deleteRecipes(recipe._id)}
          style={{ borderRadius: '15px', }}
          className='btn btn-warning justify-content-center'>delete</button>

        <h3>Ingredients</h3>
        <p>{recipe.ingredients}</p>
        <h3>Description</h3>
        <p>{recipe.description}</p>
      </div>
    </div>
  )
}

export default ReadRecipe
