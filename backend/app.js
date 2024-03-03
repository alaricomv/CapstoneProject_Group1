import express from 'express'
import{getUsers, getSingleUser,getSingleUserbyMail, CreateSingleUser, getProducts, getSingleProduct, findUser} from './database.js'
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const app = express()

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // You can also specify other headers and methods as needed
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    next();
  });

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
    const user = await getSingleUserbyMail(email);
    if(user){
        res.status(400).send("User with this email already exists");
    }
    else{
        const encryptedPassword = await bcrypt.hash(password, 10);
        const users = await CreateSingleUser(first_name,last_name,email,encryptedPassword,address,phone_number,seller);

        const user = await getSingleUserbyMail(email)

        const token = jwt.sign({
        email:user.email }, 'secretkey', {expiresIn:60*10})  
            
        user.token = token;
        res.status(201).send(user)
    }
    
})

app.post("/login", async (req,res)=> {
    const {email,password} = req.body
    const user = await findUser(email,password)

    if(user){
        const token = jwt.sign({
        email:user.email }, 'secretkey', {expiresIn:60*10})  
        
        user.token = token;
        res.status(201).send(user)
    }
    else{
        res.status(400).send("Username or password not valid");
    }

})


app.get("/products", async (req,res)=> {
    const users = await getProducts()
    res.send(users)
})

app.get("/products/:id", async (req,res)=> {
    const id = req.params.id
    const users = await getSingleProduct(id)
    res.send(users)
})


app.use((err,req,res, next)=>{
    console.error(err.stack)
    res.status(500).send("Error")
})


app.listen(8080,() =>{
    console.log('Server is running on port 8080')
})