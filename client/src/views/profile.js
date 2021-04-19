import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSVG } from '../images/home.svg';
import { ReactComponent as MessagesSVG } from '../images/messages.svg';
import { ReactComponent as ProfileSVG } from '../images/profile.svg';

import '../index.css';

const Home = (props) =>{

    const history = useHistory();


    const [state,setState] = useState({
        username:"Sebastiano",
        userStatus:"GIVING AWAY SWIPES",
        balance:{
            meal_swipes:8,
            campus_dirhams:678
        }
    })

    const {username,userStatus,balance} = state;


    const onChange = e => {
        setState({...state, [e.target.name]:e.target.value  });    
    } 


    const goTo = (location) =>{
        history.push(location)
    }


    return(
        <div style={{height:"100%"}}>

            <div className="navbar">
                <div>
                    <h4 style={{marginLeft:"15px"}}>PROFILE</h4>
                </div>
            </div>

            <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "height":"100%", width:"90%", margin:"0 auto", marginTop:"10%"}}>
            
                <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"1rem"}}>
                    <div style={{border:"1px solid black", borderRadius:"50%", padding:"20px"}}>
                        <ProfileSVG width="80px"/>
                    </div>
                    <h4 style={{"color":"var(--mainColor)", textAlign:"center"}}>{username}</h4>
                </div>

                <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"0px"}}>
                    <h1 style={{fontSize:"18px", marginBottom:"0px"}}>CURRENT BALANCE:</h1>
                    <p style={{fontWeight:"400", marginBottom:"0px"}}>Meal Swipes: <span style={{fontWeight:"600", color:"var(--mainColor)"}}>{balance.meal_swipes}</span></p>
                    <p style={{fontWeight:"400", marginBottom:"0px"}}>Campus Dirhams: <span style={{fontWeight:"600", color:"var(--mainColor)"}}>{balance.campus_dirhams}</span></p>
                </div>

                <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginTop:"2.5rem"}}>
                    <h1 style={{fontSize:"18px", marginBottom:"0px"}}>CURRENT STATUS:</h1>
                    <p style={{fontWeight:"400", marginBottom:"0px"}}>{userStatus}</p>
                </div>

                <div style={{marginTop:"20px", paddingBottom:"70px"}}>
                    <button className="contact-button">Edit Account Info</button>
                </div>

            </div>

            <div className="footer">
                <HomeSVG width="27px" onClick={()=>goTo("/home")}/>
                <MessagesSVG width="27px" onClick={()=>goTo("/messages")}/>
                <ProfileSVG width="27px" fill="var(--mainColor)" onClick={()=>goTo("/profile")}/>
            </div>
        </div>
    )
}

export default Home