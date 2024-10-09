const mongoose=require('mongoose');
const {Schema,model}=mongoose;

const SeatSchema=new Schema({
    seatId:Number,
    isBooked:Boolean,
    bookedBy:String
})

const SeatModel=model('Seat',SeatSchema);

module.exports=SeatModel;