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
    const rows = result[0][0]
    return rows
}

export async function getSingleUserbyMail(email){
    const result = await db.query("SELECT * FROM users WHERE email = ?", [email])
    const rows = result[0][0]
    return rows
}

export async function CreateSingleUser(first_name,last_name,email,password,address,phone_number,seller){
    const result = await db.query("INSERT INTO users (first_name,last_name,email,password,address,phone_number,seller) VALUES (?, ?, ?, ?, ?, ?, ?)", [first_name,last_name,email,password,address,phone_number,seller])
    const rows = result[0]
    return rows
}

export async function getProducts(){
    const result = await db.query("SELECT * FROM product")
    const rows = result[0]
    return rows
}

export async function getSingleProduct(id){
    const result = await db.query("SELECT * FROM product WHERE id = ?", [id])
    const rows = result[0][0]
    return rows
}

export async function getProductsByStore(id){
    const result = await db.query("SELECT * FROM product WHERE storefront_id = ?",[id])
    const rows = result[0]
    return rows
}

export async function CreateProduct(storefront_id,product_key,name,description,tags,price_per_dozen,price_box,total_pieces,pieces_per_box,total_boxes,imageUrl){
    const result = await db.query("INSERT INTO product (storefront_id,product_key,name,description,tags,price_per_dozen,price_box,total_pieces,pieces_per_box,total_boxes,imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)", [storefront_id,product_key,name,description,tags,price_per_dozen,price_box,total_pieces,pieces_per_box,total_boxes,imageUrl])
    const rows = result[0]
    return rows
}

export async function findUser(email,password){
    const result = await db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email,password])
    const rows = result[0][0]
    return rows
}

export async function CreateStore(name,seller_id,logo,description,tags,address,rating,number_ratings){
    const result = await db.query("INSERT INTO storefront (name,seller_id,logo,description,tags,address,rating,number_ratings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [name,seller_id,logo,description,tags,address,rating,number_ratings])
    const rows = result[0]
    return rows
}


export async function CreateOrder(user_id,product_id,storefront_id,quantity_dozen,quantity_box,price){
    const result = await db.query("INSERT INTO purchase (user_id,product_id,storefront_id,quantity_dozen,quantity_box,price) VALUES (?, ?, ?, ?, ?, ?)", [user_id,product_id,storefront_id,quantity_dozen,quantity_box,price])
    const rows = result[0]
    return rows
}

export async function getOrdersByStore(id){
    const result = await db.query("SELECT * FROM purchase WHERE storefront_id = ?",[id])
    const rows = result[0]
    return rows
}

export async function getSingleStore(id){
    const result = await db.query("SELECT * FROM storefront WHERE id = ?", [id])
    const rows = result[0][0]
    return rows
}

export async function getStorefrontList(seller_id){
    const result = await db.query("SELECT * FROM storefront WHERE seller_id = ?",[seller_id])
    const rows = result[0]
    return rows
}


var users = await getUsers()
console.log(users)