import React,{useState,useEffect} from "react";

const UsernamePrompt=({username,setUsername,setShowUsernamePrompt})=>{
	const [usernameInput,setUsernameInput]=useState('');

	const proceedHandle=()=>{
		if(usernameInput==''){
			alert('Please enter a username');
			return;
		}
		setUsername(usernameInput);
		setShowUsernamePrompt(false);
	}

	return(
		<div style={{position:'fixed',top:0,left:0,right:0,bottom:0,width:'100vw',height:'100vh',backgroundColor:'rgba(0, 0, 0, 0.286)',display:'flex',justifyContent:'center',alignItems:'center'}}>
		{/* //<div style={{display:'flex',flex:1}}> */}
			<div style={{backgroundColor:'white',padding:20,borderRadius:7}}>
				<div style={{fontSize:19,color:'darkblue',marginBottom:5}}>
					Enter Username
				</div>
				<div style={{fontSize:15}}>
					• You can use any username
				</div>
				<div style={{fontSize:15}}>
					• Seats will be booked for this username
				</div>
				<div style={{display:'flex',justifyContent:'center',marginTop:25}}>
					<input type="text" value={usernameInput} onChange={(e)=>{setUsernameInput(e.target.value)}} style={{padding:'5px',fontSize:16}} />
				</div>
				<div style={{display:'flex',justifyContent:'center'}}>
					<div onClick={proceedHandle} style={{marginTop:14,background:'darkblue',color:'white',padding:'7px 16px',borderRadius:5,cursor:'pointer'}}>
						Proceed
					</div>
				</div>
			</div>
		</div>
	)
}

export default UsernamePrompt;