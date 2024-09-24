//const express = require('express');
import express from "express"; //can use only after editing "type": "module" in package.json allows import/export syntax
import dotenv from "dotenv"; //need it to connect database
import { connectDB } from "./config/db.js";
import path from "path";

import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express(); 
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve(); //


app.use(express.json()); //allows us to accept json data in the req.body

app.use("/api/products", productRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/Frontend/dist")));

    app.get("*", (req, res) => { //return react application
        res.sendFile(path.resolve(__dirname, "Frontend", "dist", "index.html"));
    });
}

//connect and start localhost
app.listen(PORT, () => { //listens for port
    connectDB();
    console.log("Server started at http://localhost:" + PORT); //run using 'npm run dev' quit using ctrl + c
}); //"dev": "node Backend/server.js" edit in package.json under scripts

//after installing nodemon change script to run with nodemon then server will auto restart after change

//HM3Vel9KlMhHUH5x mongo db pass