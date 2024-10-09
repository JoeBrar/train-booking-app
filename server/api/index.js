const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const Seat=require('./models/Seat');
const dotenv = require('dotenv');
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
mongoose.connect(process.env.mongodb_connection_string);

app.get('/seatData', async (req,res)=>{
    const seatData=await Seat.find().sort({seatId:1});
    res.json(seatData);
})

app.post('/bookSeats', async (req,res)=>{
    let seatIdArray=req.body.seatIdArray;
    let username=req.body.username;
    const result = await Seat.updateMany(
        { seatId: { $in: seatIdArray } }, // Find seats where seatId is in the seatIds array
        { $set: { isBooked:true, bookedBy: username } } // Set bookedBy to the username and isBooked to true
    );
    res.json(result);
})

app.put('/resetSeats',async (req,res)=>{
    const result = await Seat.updateMany(
        {}, 
        { $set: { isBooked:false, bookedBy:'' } }
    );
    res.json(result);
})

app.get('/test',(req,res)=>{
    res.json("test is ok ");
})

// async function test() {
//     const seatData=await Seat.find().sort({seatId:1});
//     console.log('seatData - ',seatData);
// }
// test();

// async function createSeats(){
//     for(let i=78;i<=80;i++){
//         const seatDoc=await Seat.create({
//             seatId:i,
//             isBooked:false,
//             bookedBy:''
//         })
//         console.log('seat doc - ',seatDoc);
//     }
// }

app.listen(Number(process.env.server_port));