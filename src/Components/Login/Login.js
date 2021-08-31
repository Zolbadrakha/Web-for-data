import React, {useState} from 'react'
import "./Login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const  Login = ({setLoginUser}) => {

    const history = useHistory()

    const [ user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleChange = e =>{
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login =() => {
        axios.post("http://localhost:8000/login", user)
        .then(res => {
        alert(res.data.message)
        setLoginUser(res.data.user)
        history.push("/")
        })
}

    return (
        <div className='login'>
            {console.log(user)}
            <h1>Нэвтрэх</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Имэйл хаягаа оруулна уу!"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Нууц үгээ оруулна уу!"></input>
            <div className="button" onClick={login}>Нэвтрэх</div>
            <div>or</div>
            <div className="button" onClick={()=> history.push("/signup")}>Бүртгүүлэх</div>
        </div>
    )
}

export default Login;
