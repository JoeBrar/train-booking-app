const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const app=express();

app.use(cors);
app.use(express.json);
mongoose.connect();


app.get('/seatData',(req,res)=>{

})






app.listen(5000);