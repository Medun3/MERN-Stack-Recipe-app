import axios from 'axios'
import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const [username, setUsername] =useState('')
    const [password, setPassword] =useState('')
    const navigate = useNavigate()

    axios.defaults.withCredentials = true;
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username || !password) {
          alert("All fields must be filled");
          return;  }
          
          if (username.length < 8 || password.length < 8) {
            alert("invalid email")
            return  }


        axios.post('http://localhost:3001/auth/login', {username, password})
       .then(result => {   
        window.localStorage.setItem("id", result.data.id)    
        navigate('/')
        console.log(result)
    }).catch(error => console.log(error))
    }


    return (
    <div className='login-all'>
      <div className='p-3 border-1  w-25'>
        <div id="login-box">       
           <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            <div className='login-label'>
                <label htmlFor="username">Usernamme</label>
                <input type="email" placeholder='Enter Username'  className='form-control'
                 onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className='login-label'>
                <label htmlFor="username">Password</label>
                <input type="password" placeholder='Enter Password' className='form-control'
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='btn btn-success w-100 mt-3 '>Login</button>
            <span>Don't Have an Account</span>
            <Link to="/auth/register">
            <button className='btn btn-dark w-100 mt-2 border'>
            Register</button></Link> 
        </form>
        </div>

      </div>
    </div>
  )
}

export default Login
