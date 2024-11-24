import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import{Link, useNavigate} from 'react-router-dom'

function Registration() {
    const [username, setUsername] =useState('')
    const [password, setPassword] =useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!username || !password) {
          alert("All fields must be filled");
          return;  }
          if (username.length < 8 || password.length < 8) {
            alert("must be at least 8 characters")
            return  }
          

        axios.post('http://localhost:3001/auth/register', {username, password})
       .then(result => {         
        navigate('/auth/login')
        console.log(result)
    }).catch(error => console.log(error))
    }


    return (
    <div className='signin-all'>
      <div className='p-3 border-1  w-25'>
        <div id="signin-box">
        <h3>Register</h3>
        <form onSubmit={handleSubmit}>
            <div className='signin-label'>
                <label htmlFor="username">Username</label>
                <input type="email" placeholder='Enter Username' 
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                required className='form-control'
                 onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className='signin-label'>
                <label htmlFor="username">Password</label>
                <input type="password" placeholder='Enter Password' 
                pattern='(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}'
                 title='must' required className='form-control'
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <button className='btn btn-success w-100 mt-3'>Submit</button>
            <span>Have an Account?</span>
            <Link to="/auth/login">
            <button className='btn btn-dark w-100 mt-3 border'>
            Login</button></Link> 
        </form>
        </div>
      </div>
    </div>
  )
}

export default Registration
