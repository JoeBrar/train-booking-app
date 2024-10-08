import React, { useState } from 'react'
import BookingConfirm from './components/BookingConfirm';

const HomePage = () => {

  const [seatQuantity,setSeatQuantity]=useState('');
  const [username,setUsername]=useState("alpha44");
  const [seatsForBooking,setSeatsForBooking]=useState([]);
  const [showBookingConfirm,setShowBookingConfirm]=useState(false);
  const [seatsData,setSeatsData]=useState([
    {
      id:1,
      isBooked:true,
      bookedBy:'alpha11'
    },
    {
      id:2,
      isBooked:true,
      bookedBy:'alpha11'
    },
    {
      id:3,
      isBooked:true,
      bookedBy:'alpha22'
    },
    {
      id:4,
      isBooked:true,
      bookedBy:'alpha22'
    },
    {
      id:5,
      isBooked:true,
      bookedBy:'alpha22'
    },
    {
      id:6,
      isBooked:true,
      bookedBy:'alpha22'
    },
    {
      id:7,
      isBooked:true,
      bookedBy:'alpha22'
    },
    {
      id:8,
      isBooked:false
    },
    {
      id:9,
      isBooked:true,
      bookedBy:'alpha33'
    },
    {
      id:10,
      isBooked:true,
      bookedBy:'alpha33'
    },
    {
      id:11,
      isBooked:true,
      bookedBy:'alpha44'
    },
    {
      id:12,
      isBooked:true,
      bookedBy:'alpha44'
    },
    {
      id:13,
      isBooked:true,
      bookedBy:'alpha44'
    },
    {
      id:14,
      isBooked:true,
      bookedBy:'alpha55'
    },
    {
      id:15,
      isBooked:false
    },
    {
      id:16,
      isBooked:false
    },
    {
      id:17,
      isBooked:false
    }
  ])

  const handleSeatInput=(val)=>{
    const regex = /^[0-9]*$/;
    if(regex.test(val)){
      setSeatQuantity(val);
    }
  }

  const handleSeatSubmit=()=>{
    const totalSeats=77;
    const seatInput=Number(seatQuantity);
    if(seatInput>=1 && seatInput<=7){
      //calculate which seats should be booked
      let availableStart=0;
      for(let i=0;i<seatsData.length;i++){
        if(!seatsData[i].isBooked){
          availableStart=seatsData[i].id;
          break;
        }
      }
      console.log('available start -',availableStart);
      if(availableStart){
        let availableSeats=totalSeats-availableStart+1;
        if(availableSeats<seatInput){
          alert(`Only ${availableSeats} seats are available`);
          return;
        }
        let seatsFilled=0;
        let targetSeats=[];
        let targetRow=Math.floor((availableStart-1)/7) + 1;
        let curSeat=availableStart;
        while(seatsFilled<seatInput){
          if(targetRow%2!=0){
            //odd row - traverse normally
            targetSeats.push(curSeat);
            curSeat++;
            seatsFilled++;
            //if current row is finished, increment targetRow and go to the last seat of next row
            if(curSeat>targetRow*7){
              curSeat=(targetRow+1)*7;
              targetRow++;
            }
          }
          else{
            //even row - traverse in reverse
            targetSeats.push(curSeat);
            curSeat--;
            seatsFilled++;
            //if current row is finished, increment targetRow and go to the first seat of next row
            if(curSeat<=(targetRow-1)*7){
              curSeat=targetRow*7 + 1;
              targetRow++;
            }
          }
        }
        targetSeats.sort();
        console.log('target seats to be booked - ',targetSeats);
        setSeatsForBooking(targetSeats);
        setShowBookingConfirm(true);
      }
      else{
        alert("No seat is available for booking");
      }
    }
    else{
      alert("Enter a number between 1 and 7");
    }
  }

  return (
    <div>
      <div style={{backgroundColor:'darkblue',fontSize:30,fontWeight:'bold',textAlign:'center',padding:'20px 0px',color:'white'}}>
        Train Seat Booking
      </div>
      <div style={{marginTop:30,display:'flex',justifyContent:'center'}}>
        <div style={{display:'flex',gap:20}}>
          <div style={{display:'flex',alignItems:'center',gap:4}}>
            <div style={{backgroundColor:'darkblue',width:15,height:15}}></div>
            Booked by you
          </div>
          <div style={{display:'flex',alignItems:'center',gap:4}}>
            <div style={{backgroundColor:'white',width:13,height:13,border:'1px solid black'}}></div>
            Available
          </div>
          <div style={{display:'flex',alignItems:'center',gap:4}}>
            <div style={{backgroundColor:'rgb(190, 190, 190)',width:15,height:15}}></div>
            Unavailable
          </div>
        </div>
      </div>
      <div style={{marginTop:20,display:'flex',justifyContent:'center'}}>
        <div style={{width:500,padding:'20px 6px',borderRadius:8,border:'1px solid black'}}>
          {seatsData.map((seat)=>(
            <div className={`seat ${seat.isBooked ? (seat.bookedBy==username?'seat-booked':'seat-unavailable') : 'seat-available'}`}>
              <div>
                {seat.id}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{marginTop:30,display:'flex',justifyContent:'center'}}>
        <div style={{backgroundColor:'#C3FFE0',borderRadius:5}}>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',padding:'4px 9px',gap:8}}>
            <div>
              <div style={{fontSize:18}}>
                Enter number of seats to book
              </div>
              <div style={{fontSize:12}}>
                (Max 7 at one time)
              </div>
            </div>
            <div>
              <input type='number' value={seatQuantity} onChange={(e)=>{handleSeatInput(e.target.value)}} style={{width:60,padding:'5px 5px',fontSize:18}}/>
            </div>
          </div>
          <div style={{backgroundColor:'#557A7A',color:'white',textAlign:'center',padding:'4px 0px',marginTop:5,borderBottomLeftRadius:5,borderBottomRightRadius:5}} onClick={handleSeatSubmit}>
            SUBMIT
          </div>
        </div>
      </div>
      {showBookingConfirm && (
        <BookingConfirm seatsData={seatsData} seatsForBooking={seatsForBooking} setShowBookingConfirm={setShowBookingConfirm} />
      )}
    </div>
  )
}

export default HomePage