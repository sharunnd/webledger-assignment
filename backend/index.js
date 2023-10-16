const express = require("express");
const { connectDB } = require("./db");
require("dotenv").config()
const cors = require("cors")


const app = express()
app.use(cors())
app.use(express.json())

 
connectDB().then(()=>{
    app.listen(process.env.PORT,()=>{
        try {
            console.log(`Server running at port ${process.env.PORT}`);
        } catch (error) {
            console.log(error);
            console.log("Something went wrong"); 
        }
    })
})