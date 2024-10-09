import React, { useEffect, useState } from 'react'
import BookingConfirm from './components/BookingConfirm';
import UsernamePrompt from './components/UsernamePrompt';

const HomePage = () => {

  const [seatQuantity,setSeatQuantity]=useState('');
  const [username,setUsername]=useState("");
  const [showUsernamePrompt,setShowUsernamePrompt]=useState(true);
  const [seatsForBooking,setSeatsForBooking]=useState([]);
  const [showBookingConfirm,setShowBookingConfirm]=useState(false);
  const [seatsData,setSeatsData]=useState([]);
  const [seatsDataMatrix,setSeatsDataMatrix]=useState([]);

  const handleSeatInput=(val)=>{
    const regex = /^[0-9]*$/;
    if(regex.test(val)){
      setSeatQuantity(val);
    }
  }

  const handleSeatSubmit=()=>{
    const totalSeats=80;
    const seatInput=Number(seatQuantity);
    if(seatInput<1 || seatInput>7){
      alert("Enter a number between 1 and 7");
      return;
    }

    //find the point from where the available seats start
    let availableStart=0;
    for(let i=0;i<seatsDataMatrix.length;i++){
      //if availableStart is found, break the loop
      if(availableStart) break;

      let row=seatsDataMatrix[i];
      if((i+1)%2 != 0){
        //odd row - traverse normally
        for(let j=0;j<row.length;j++){
          if(!row[j].isBooked){
            availableStart=row[j].seatId;
            break;
          }
        }
      }
      else{
        //even row - traverse in reverse
        for(let j=row.length-1;j>=0;j--){
          if(!row[j].isBooked){
            availableStart=row[j].seatId;
            break;
          }
        }
      }
    }

    if(!availableStart){
      alert("No seat is available for booking");
      return;
    }
  
    let availableSeats=totalSeats-availableStart+1;
    if(availableSeats<seatInput){
      alert(`Only ${availableSeats} seats are available`);
      return;
    }

    let seatsFilled=0;
    let targetSeats=[];
    //Index of the target row from which seats will be filled
    let targetRowIndex=Math.floor((availableStart-1)/7);

    while(seatsFilled<seatInput){
      let targetRow=seatsDataMatrix[targetRowIndex];
      if((targetRowIndex+1)%2 != 0){
        //odd row - traverse normally
        for(let i=0;i<targetRow.length;i++){
          //skip the already booked seats of target row
          if(targetRow[i].isBooked) continue;
  
          targetSeats.push(targetRow[i].seatId);
          seatsFilled++;
          if(seatsFilled==seatInput) break;
        }
      }
      else{
        //even row - traverse in reverse
        for(let i=targetRow.length-1;i>=0;i--){
          //skip the already booked seats of target row
          if(targetRow[i].isBooked) continue;
  
          targetSeats.push(targetRow[i].seatId);
          seatsFilled++;
          if(seatsFilled==seatInput) break;
        }
      }
      //move to next row
      targetRowIndex++;
    }
    
    targetSeats.sort();
    setSeatsForBooking(targetSeats);
    setShowBookingConfirm(true);
  }

  const fetchSeatData=async ()=>{
    fetch(process.env.REACT_APP_api_url+'/seatData',{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("Response was not ok");
      }
      return response.json();
    })
    .then((data)=>{
      if(data){
        //convert the seats data into 2D array/matrix with 7 seats in each row (3 seats in last row)
        let matrix=[];
        let rowItemCount=0;
        let row=[];
        for(let i=0;i<data.length;i++){
          row.push(data[i]);
          rowItemCount++;
          if(rowItemCount==7){
            matrix.push(row);
            row=[];
            rowItemCount=0;
          }
        }
        //push the last row
        if(row.length>0) matrix.push(row);

        //store seats data as linear array
        setSeatsData(data);
        //store seats data as 2D array/matrix
        setSeatsDataMatrix(matrix);
      }
    })
    .catch((err)=>{
      console.error('Error - ',err);
    })
  }

  const resetAllSeats=()=>{
    //this function is for admin so that the app can be throughly tested by resetting all the seats
    fetch(process.env.REACT_APP_api_url+'/resetSeats',{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("Response was not ok");
      }
      return response.json();
    })
    .then((data)=>{
      if(data){
        fetchSeatData();
      }
    })
    .catch((err)=>{
      console.error('Error - ',err);
    })
  }

  useEffect(()=>{
    fetchSeatData();
  },[])

  return (
    <div>
      <div style={{backgroundColor:'darkblue',fontSize:30,fontWeight:'bold',textAlign:'center',padding:'20px 0px',color:'white'}}>
        Train Seat Booking
      </div>
      {username && (
        <div style={{textAlign:'end',fontSize:15,color:'darkblue',marginRight:8,marginTop:4}}>
          Welcome, {username}
        </div>
      )}
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
                {seat.seatId}
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
          <div className='submit-btn' onClick={handleSeatSubmit}>
            SUBMIT
          </div>
        </div>
      </div>
      
      <div style={{marginTop:90,height:1}}></div>
      <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'10px 0px',backgroundColor:'#CBE9FF'}}>
        <div style={{textAlign:'center'}}>
          Admin Access : 
          <button style={{marginLeft:8,fontSize:16,padding:'1px 2px'}} onClick={resetAllSeats}>Reset All Seats</button>
        </div>
        <div style={{marginTop:6,fontSize:15}}>
          Made By : Joedeep Singh
        </div>
      </div>

      {showBookingConfirm && (
        <BookingConfirm seatsData={seatsData} fetchSeatData={fetchSeatData} seatsForBooking={seatsForBooking} setShowBookingConfirm={setShowBookingConfirm} username={username} />
      )}

      {showUsernamePrompt && (
        <UsernamePrompt username={username} setUsername={setUsername} setShowUsernamePrompt={setShowUsernamePrompt} />
      )}
      

    </div>
  )
}

export default HomePage