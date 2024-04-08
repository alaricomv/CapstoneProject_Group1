import mysql from 'mysql2'

import nodemailer from 'nodemailer';

const db = mysql.createPool({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'wholesaledb'
}).promise()

const transporter = nodemailer.createTransport({
    service: 'gmail', // Example: Gmail
    host: "smtp.gmail.com",
    auth: {
        user: 'capstoneprojectfdugroup1@gmail.com', // Your email address
        pass: 'ndla ysbi vaoe fsxy' // Your email password
    }
});


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

export async function getProductsByName(searchString) {
    const result = await db.query("SELECT * FROM product WHERE name LIKE ?", [`%${searchString}%`]);
    const rows = result[0];
    return rows;
}

export async function getProductsByTag(searchString) {
    const result = await db.query("SELECT * FROM product WHERE tags LIKE ?", [`%${searchString}%`]);
    const rows = result[0];
    return rows;
}

export async function CreateProduct(storefront_id,product_key,name,description,tags,price_per_dozen,price_box,total_pieces,pieces_per_box,total_boxes,imageUrl){
    const result = await db.query("INSERT INTO product (storefront_id,product_key,name,description,tags,price_per_dozen,price_box,total_pieces,pieces_per_box,total_boxes,imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)", [storefront_id,product_key,name,description,tags,price_per_dozen,price_box,total_pieces,pieces_per_box,total_boxes,imageUrl])
    const rows = result[0]
    return rows
}

export async function EditProduct(id, product_key, name, description, tags, price_per_dozen, price_box, total_pieces, pieces_per_box, total_boxes, imageUrl) {
    const result = await db.query("UPDATE product SET product_key=?, name=?, description=?, tags=?, price_per_dozen=?, price_box=?, total_pieces=?, pieces_per_box=?, total_boxes=?, imageUrl=? WHERE id=?", [product_key, name, description, tags, price_per_dozen, price_box, total_pieces, pieces_per_box, total_boxes, imageUrl, id]);
    const rows = result[0];
    return rows;
}

export async function DeleteProduct(id) {
    const result = await db.query("DELETE FROM product WHERE id=?", [id]);
    return result[0];
}




export async function ReduceQuantityProduct(product_id, quantity_dozen, quantity_box) {
    const result = await db.query(
        "UPDATE product SET total_pieces = (total_pieces - ?), total_boxes = (total_boxes - ?) WHERE id = ?",
        [quantity_dozen, quantity_box, product_id]
    );
    
    const rows = result[0];

    return rows;
}

export async function getUserEmailByStorefrontId(storefrontId) {
    const result = await db.query("SELECT users.email FROM users INNER JOIN storefront ON users.id = storefront.seller_id WHERE storefront.id = ?", [storefrontId]);
    const rows = result[0];
    return rows.length > 0 ? rows[0].email : null;
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


export async function CreateOrder(user_id,product_id,storefront_id,quantity_dozen,quantity_box,price,address){
    const result = await db.query("INSERT INTO purchase (user_id,product_id,storefront_id,quantity_dozen,quantity_box,price,address) VALUES (?, ?, ?, ?, ?, ?, ?)", [user_id,product_id,storefront_id,quantity_dozen,quantity_box,price,address])
    const rows = result[0]

    
    const userEmail = await getUserEmailByStorefrontId(storefront_id);

    const storefront = await getSingleStore(storefront_id);
    const storefrontName = storefront ? storefront.name : '';

    if(userEmail){
        console.log(userEmail);
        await sendEmail(userEmail, 'New Order', 'A new Order has been placed in store ' + storefrontName)
    }
    console.log("aqui");
    return rows
}

export async function ModifyOrder(id, status) {
    const result = await db.query(
        "UPDATE purchase SET status = ? WHERE id = ?",
        [status, id]
    );
    const rowsAffected = result[0];
    return rowsAffected; // Return the number of rows affected
}


export async function getOrdersByStore(id){
    const result = await db.query(`
        SELECT p.*, pr.name AS product_name, pr.product_key 
        FROM purchase p
        JOIN product pr ON p.product_id = pr.id
        WHERE p.storefront_id = ?
    `, [id]);
    const rows = result[0]
    return rows
}

export async function getOrdersByUser(id){
    const result = await db.query(`
        SELECT p.*, pr.name AS product_name, pr.product_key 
        FROM purchase p
        JOIN product pr ON p.product_id = pr.id
        WHERE p.user_id = ?
    `, [id]);
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

// Function to send an email
async function sendEmail(to, subject, text) {
    // Define email options
    const mailOptions = {
        from: 'alarico.mercado@gmail.com', // Sender address (must be the same as authenticated user)
        to: to, // Recipient address
        subject: subject, // Email subject
        text: text // Email body
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export { sendEmail };

