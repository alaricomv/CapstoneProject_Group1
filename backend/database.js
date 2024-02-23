import mysql from 'mysql2'

const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'wholesaledb'
}).promise()


export async function getUsers(){
    const result = await db.query("SELECT * FROM users")
    const rows = result[0]
    return rows
}

export async function getSingleUser(id){
    const result = await db.query("SELECT * FROM users WHERE id = ?", [id])
    const rows = result[0]
    return rows
}

export async function CreateSingleUser(first_name,last_name,email,password,address,phone_number,seller){
    const result = await db.query("INSERT INTO users (first_name,last_name,email,password,address,phone_number,seller) VALUES (?, ?, ?, ?, ?, ?, ?)", [first_name,last_name,email,password,address,phone_number,seller])
    const rows = result[0]
    return rows
}

var users = await getUsers()
console.log(users)