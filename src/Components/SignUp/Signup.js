import React, { useState } from 'react'
import "./Signup.css"
import axios from "axios"
import {useHistory} from 'react-router-dom'

const  Signup = () => {


    const history = useHistory()
    const [ user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        reEnterPassword: ""
    })

    const handleChange = e =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const signup = () => {
        const { name, email, password, reEnterPassword } = user
        if(name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:8000/signup", user)
            .then(res => {
                alert(res.data.message)
                history.push('/login')
            })
        }
        else {
            alert ("Амжилтгүй")
        }
    }

    return (
        <div className="register">
        {console.log(user)}
            <h1>Register</h1> 
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={handleChange}></input>   
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password}  placeholder="Your Password" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={handleChange}></input>
            <div className="button"  onClick={signup}>Register</div>
            <div>or</div>
            <div className="button" onClick={()=> history.push('/login')}>Login</div>
        </div>
    )
}

export default Signup
