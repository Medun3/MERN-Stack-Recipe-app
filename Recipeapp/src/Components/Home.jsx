import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


function Home() {  
   const [recipes,setRecipes] = useState([])
   useEffect(() => {
    axios.get('http://localhost:3001/recipe/recipes')
     .then(recipes => {
        setRecipes(recipes.data)
     }).catch(err => console.log(err))
   }, [])

  return (
    <div id="header-home">
      <img src={'https://wallpaperaccess.com/full/2917213.jpg'} alt="Recipe" height="600" width="100%"/>
      <div className="home-h2"><h2><em>RECIPES</em></h2>
      </div>
      <div id= "home-items">
        {
          recipes.map(recipe => (
            <div key={recipe._id} id="home-image">
                <img src={recipe.imageUrl} alt="Recipe" height="200" width="200"/>

                 <Link to = {`/read-recipe/${recipe._id}`} className="text-decoration-none"> 
                 <h3>{recipe.name}</h3></Link>
               </div>
          ))
        }
      </div>
    </div>
    
  )
}

export default Home
