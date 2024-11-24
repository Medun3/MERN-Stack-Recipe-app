import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"


function CreateRecipe() {
  const navigate = useNavigate()

  const [recipe, setRecipe] = useState({
    name:"",
    description:"",
    ingredients:"",
    imageUrl:"",
    userId: window.localStorage.getItem("id")
  })
   const handleChange = (event) => {
     const {name,value} = event.target
     setRecipe({...recipe, [name]: value})
   }

   const handleSubmit = (event) => {
     event.preventDefault()
     axios.post('http://localhost:3001/recipe/create-recipe', recipe)
     .then(result => {
      navigate('/')
       console.log(result.data)
       alert("recipe created")
     }).catch(err => console.log(err))
   }
   
  return (
  <div className="Create-all">  
    <div  className='d-flex justify-content-center align-items-center vh-100'>
    <div  className='p-3'>
      <div id="box-createform">
      <h3><em>Create Recipe</em></h3>
      <form onSubmit={handleSubmit}>
          <div className="mt-3" >
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder='Enter Name'
               className='form-control' name="name" 
               onChange={handleChange} />    
          </div>
          <div className="mt-3">
              <label htmlFor="description">Description</label>
              <input type="text" id="description" placeholder="Enter Description"
               className='form-control' name="description"
              onChange={handleChange} />
          </div>
          
          <div className="mt-3">
              <label htmlFor="ingredients">Ingredients</label>
              <input type="text" id="ingredients" placeholder='Enter Ingredients' 
              className='form-control' name="ingredients"
              onChange={handleChange} />
          </div>
          
          <div className="mt-3">
              <label htmlFor="imageUrl">Image Url</label>
              <input type="text" id="imageUrl" placeholder="Enter URL" 
              className="form-control" name="imageUrl"
              onChange={handleChange} />
          </div>
          <button className='btn btn-success w-100 mt-3'>Sumbit</button>
          
      </form>
      </div>
    </div>
    </div>
  </div>
  )
}

export default CreateRecipe
