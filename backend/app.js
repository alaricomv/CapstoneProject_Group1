import express from 'express'
import{getUsers, getSingleUser, CreateSingleUser} from './database.js'

const app = express()

app.use(express.json())

app.get("/users", async (req,res)=> {
    const users = await getUsers()
    res.send(users)
})

app.get("/user/:id", async (req,res)=> {
    const id = req.params.id
    const users = await getSingleUser(id)
    res.send(users)
})

app.post("/newUser", async (req,res)=> {
    const {first_name,last_name,email,password,address,phone_number,seller} = req.body
    const users = await CreateSingleUser(first_name,last_name,email,password,address,phone_number,seller)
    res.status(201).send(users)
})

app.use((err,req,res, next)=>{
    console.error(err.stack)
    res.status(500).send("Error")
})

app.listen(8080,() =>{
    console.log('Server is running on port 8080')
})