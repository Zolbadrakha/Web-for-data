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
            <h1>Бүртгэл</h1> 
            <input type="text" name="name" value={user.name} placeholder="Таны нэр" onChange={handleChange}></input>   
            <input type="text" name="email" value={user.email} placeholder="Таны имэйл хаяг" onChange={handleChange}></input>
            <input type="text" name="number" value={user.age} placeholder="Таны нас" onChange={handleChange}></input>
            <input type="text" name="string" value={user.niveau} placeholder="Таны франц хэлний түвшин" onChange={handleChange}></input>
            <input type="password" name="password" value={user.password}  placeholder="Нууц үг" onChange={handleChange}></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Нууц үг дахин оруулна уу!" onChange={handleChange}></input>
            <div className="button"  onClick={signup}>Бүртгүүлэх</div>
            <div>or</div>
            <div className="button" onClick={()=> history.push('/login')}>Нэвтрэх</div>
        </div>
    )
}

export default Signup
