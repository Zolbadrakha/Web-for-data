import express, { json, urlencoded } from 'express'
import cors from 'cors'
import { connect, Schema, model } from 'mongoose'


const app = express()
app.use(json())
app.use(urlencoded())
app.use(cors())

connect('mongodb+srv://rainwons0305:91869740Za@learningmongodb.p0pff.mongodb.net/myLoginAndSignUp?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, ()=> {
    console.log("DB connected")
})

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const User = new model("User", userSchema)

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

app.post('/signup',(req,res)=>{
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

module.export = model ('myLoginAndSignUp', userSchema)