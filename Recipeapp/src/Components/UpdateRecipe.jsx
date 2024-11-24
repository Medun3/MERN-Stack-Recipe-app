import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate , useParams} from 'react-router-dom';
import { useEffect } from 'react';

function UpdateRecipe() {
  const navigate = useNavigate();  
  const {id} = useParams();

  const [recipes, setRecipes] = useState({    
    name: localStorage.getItem('name') || '',
    description: localStorage.getItem('description') || '',
    ingredients: localStorage.getItem('ingredients') || '',
    imageUrl: localStorage.getItem('imageUrl') || '',
    userId: window.localStorage.getItem('id') 
  }) 
   
const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipes({ ...recipes, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log("update for recipeId:", recipes);
    await axios.put(`http://localhost:3001/recipe/update-recipe/${id}`,recipes)
    .then(result => {
      navigate('/')
      console.log(result); 
      alert("recipe updated")
    }).catch(err => console.log(err))
  }


  return (<div id="update-all">
    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='p-3 border-1 w-25'>
      <img src="https://i.pinimg.com/originals/e0/a3/f3/e0a3f3ad6089fd9794a84c2b256f764e.jpg" alt="" />
     
      <div id="box-updateform">
        <h3>Update Recipe</h3>
       <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className='form-control'
              name="name"  
              onChange={handleChange}
              value={recipes.name}   
            />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              className='form-control'
              name="description"
              onChange={handleChange}
              value={recipes.description}  
            />
          </div>
          <div className="mt-3">
            <label htmlFor="ingredients">Ingredients</label>
            <input
              type="text"
              id="ingredients"
              className='form-control'
              name="ingredients"
              onChange={handleChange}
              value={recipes.ingredients}  
            />
          </div>
          <div className="mt-3">
            <label htmlFor="imageUrl">Image URL</label>
            <input
              type="text" id="imageUrl" 
              className="form-control" name="imageUrl"
              onChange={handleChange}
              value={recipes.imageUrl}  
            />
          </div>
          <button className='btn btn-success w-100 mt-3'>Update</button>
        </form></div>
         </div>
    </div>
    </div>
  );
}
export default UpdateRecipe;
