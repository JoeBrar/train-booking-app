import React, {useState,useEffect} from "react";

const BookingConfirm=({seatsData,seatsForBooking,setShowBookingConfirm})=>{
  const [successPopup,setSuccessPopup]=useState(false);

  const handleConfirmPress=()=>{
    console.log("hereaa");
    setSuccessPopup(true);
    setTimeout(()=>{
      setSuccessPopup(false);
      setShowBookingConfirm(false);
    },3300)
  } 

  return(
    <div style={{display:'flex',backgroundColor:'rgba(0, 0, 0, 0.286)',position:'absolute',top:0,left:0,right:0,bottom:0,justifyContent:'center',alignItems:'center'}}>
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
                    <div className={`seat ${seatsForBooking.includes(seat.id)?'seat-for-booking':''}`}>
                      <div>
                        {seat.id}
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        
        <div style={{display:'flex',justifyContent:'center',marginTop:20}}>
          <div>
            <div style={{border:'1px solid black',padding:'8px 20px',background:'darkblue',color:'white',borderRadius:4}} onClick={handleConfirmPress}>
              Confirm
            </div>
            <div style={{border:'1px solid darkblue',padding:'8px 20px',textAlign:'center',color:'darkblue',borderRadius:4,marginTop:5}} onClick={()=>{setShowBookingConfirm(false)}}>
              Close
            </div>
          </div>
        </div>
      </div>
      
      {successPopup && 
        <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,backgroundColor:'rgba(0, 0, 0, 0.286)',display:'flex',justifyContent:'center',alignItems:'center'}}>
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