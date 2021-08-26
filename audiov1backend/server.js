const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb://localhost:8000/myLoginAndSignUp',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=> {
    console.log("DB connected")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model("User", userSchema)

//Routes
app.post('/login',(req,res)=>{
    const { email, password} = req.body
    User.findOne({ email: email}, (err, user) =>{
        if(user){
            if(password === user.passowrd ){
                res.send({message: "Амжилттай нэвтэрлээ.", user: user})
            } else{
                res.send({ message: "Нууц үг буруу"})
            }
        }else{
            res.send({message: "Хэрэглэгч олдсонгүй"})
        }
    })
}) 

app.post('/register',(req,res)=>{
    const {name, email, password} = req.body
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "Бүртгэгдсэн байна."})
        }else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if(err){
                    res.send(err)
                } else {
                    res.send( {message: "Амжилттай бүртгэгдлээ."})
                }
            })
        }
    })
})

app.listen(8000,()=>{
    console.log("8000порт дээр аслаа.")
})