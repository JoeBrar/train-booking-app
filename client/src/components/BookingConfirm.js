import React, {useState,useEffect} from "react";

const BookingConfirm=({seatsData, fetchSeatData, seatsForBooking,setShowBookingConfirm,username})=>{
  const [successPopup,setSuccessPopup]=useState(false);

  const handleConfirmPress=()=>{
    let sendData={
      username:username,
      seatIdArray:seatsForBooking
    }
    fetch(process.env.REACT_APP_api_url+'/bookSeats',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(sendData)
    })
    .then((response)=>{
      if(!response.ok){
        throw new Error("Response was not ok");
      }
      return response.json();
    })
    .then((data)=>{
      if(data){
        setSuccessPopup(true);
        fetchSeatData();
        setTimeout(()=>{
          setSuccessPopup(false);
          setShowBookingConfirm(false);
        },2500)
      }
    })
    .catch((err)=>{
      console.error('Error - ',err);
    })
  } 

  return(
    <div style={{display:'flex',backgroundColor:'rgba(0, 0, 0, 0.286)',position:'fixed',top:0,left:0,right:0,bottom:0,justifyContent:'center',alignItems:'center'}}>
      <div style={{backgroundColor:'white',padding:10,borderRadius:10,maxWidth:'90%'}}>
        <div style={{fontSize:18,color:'darkblue',textAlign:'center'}}>
          The following seats will be booked
        </div>

        <div style={{marginTop:20,display:'flex',justifyContent:'center'}}>
          <div style={{borderRadius:8,border:'1px solid black',width:500,padding:'10px 5px'}}>
            {
              seatsData.map((seat)=>{
                return (
                  <div style={{}}>
                    <div className={`seat ${seatsForBooking.includes(seat.seatId)?'seat-for-booking':'seat-greyed'}`}>
                      <div>
                        {seat.seatId}
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        
        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div style={{display:'flex',gap:18}}>
            <div style={{border:'1px solid black',padding:'8px 20px',background:'darkblue',color:'white',borderRadius:4,cursor:'pointer'}} onClick={handleConfirmPress}>
              Confirm
            </div>
            <div style={{border:'1px solid darkblue',padding:'8px 25px',textAlign:'center',color:'darkblue',borderRadius:4,cursor:'pointer'}} onClick={()=>{setShowBookingConfirm(false)}}>
              Close
            </div>
          </div>
        </div>
      </div>
      
      {successPopup && 
        <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0, 0, 0, 0.286)',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <div style={{backgroundColor:'white',padding:20,borderRadius:7}}>
            
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8" style={{color:'green',width:200}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <div style={{fontSize:20,textAlign:'center',color:'green',fontWeight:'bold'}}>
              Booking Successful
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default BookingConfirm;