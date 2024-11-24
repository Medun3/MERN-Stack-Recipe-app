import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function SavedRecipe() {

  const [savedRecipes, setSavedRecipes] = useState([])
  const userId = window.localStorage.getItem("id")
  
  
   useEffect(() => {
    axios.get('http://localhost:3001/recipe/user-recipes/' + userId)
      .then(recipes => {
        setSavedRecipes(recipes.data)
      }).catch(err => console.log(err))
   }, [])


  //remove the save data
   const deleteRecipe = async (recipeId) => {
    await axios.delete(`http://localhost:3001/recipe/saved-recipes/${recipeId}`, { data: { userId } })
      .then(result => (
        setSavedRecipes(result.data.savedRecipes)
      )).catch(err => console.log(err))
   }


  return (
    
    <div className='saved'>
        <h2><em>Saved Recipes</em></h2>
        <div id="save-all">
        {
          savedRecipes.length > 0 ? (
            savedRecipes.map(recipe => (
              recipe._id ? ( 
                <div  key={recipe._id} className='save-border'>
                  <div className="">

                    <Link to={`/read-recipe/${recipe._id}`}
                     className="text-decoration-none">
                      <h3>{recipe.name}</h3>
                    </Link>
                    <div className=''>
                    <img src={recipe.imageUrl} alt="Recipe" height="200" width="200" />
                  </div>
                    <button onClick={() =>
                      window.location.reload(deleteRecipe(recipe._id))}
                      style={{
                        padding: '5px 30px',
                        borderRadius: '20px',}}
                        className='btn btn-warning'>
                      remove</button>
                  </div>
                   </div>
              ) : null 
            ))
          ) : (
            <p>No saved recipes found.</p> // Handle empty list case
          )
        }
      </div>          
    </div>
  )
}
export default SavedRecipe

