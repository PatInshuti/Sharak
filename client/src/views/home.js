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
        userStatus:"",
        systemStatus:{
            giving_away_swipes:10,
            giving_away_campus_dirhams:7,
            need_campus_dirhams: 8,
            need_swipes:9
        }
    })

    const {username,userStatus,systemStatus} = state;


    const onChange = e => {
        setState({...state, [e.target.name]:e.target.value  });    
    } 

    const goTo = (location) =>{
        history.push(location)
    }


    const displayUserOptions = () =>{

        if (userStatus === "NEED SWIPES"){
            return(
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <p style={{marginTop:"2rem", fontWeight:"400", textAlign:"center"}}>There are currently <b>{systemStatus.giving_away_swipes}</b> students giving away swipes.</p>
                    <button className="contact-button">Contact</button>
                </div>
            )
        }

        if (userStatus === "NEED CAMPUS DIRHAMS"){
            return(
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <p style={{marginTop:"2rem", fontWeight:"400", textAlign:"center"}}>There are currently <b>{systemStatus.giving_away_campus_dirhams}</b> students giving away swipes.</p>
                    <button className="contact-button">Contact</button>
                </div>
            ) 
        }

        if (userStatus === "GIVING AWAY SWIPES"){
            return(
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <p style={{marginTop:"2rem", fontWeight:"400", textAlign:"center"}}>There are currently <b>{systemStatus.need_swipes}</b> student giving away swipes.</p>
                    <button className="contact-button">Contact</button>
                </div>
            )
        }

        if (userStatus === "GIVING AWAY CAMPUS DIRHAMS"){
            return(
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <p style={{marginTop:"2rem", fontWeight:"400", textAlign:"center"}}>There are currently <b>{systemStatus.need_campus_dirhams}</b> students who need swipes.</p>
                    <button className="contact-button">Contact</button>
                </div>
            )
        }

        if (userStatus === "NOT SURE"){
            return(
                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <p style={{marginTop:"2rem", fontWeight:"400", textAlign:"center"}}>....</p>
                </div>
            )
        }  
        
    }



    return(
        <div style={{height:"100%"}}>

            <div className="navbar">
                <div>
                    <h4 style={{marginLeft:"15px"}}>Home</h4>
                </div>
            </div>

            <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "height":"100%", width:"90%", margin:"0 auto", marginTop:"6rem"}}>
                
                <div style={{marginTop:"1rem"}}>
                    <h1 style={{fontSize:"43px"}}>HELLO,</h1>
                    <h4 style={{"color":"var(--mainColor)", textAlign:"center"}}>{username}</h4>
                </div>

                <div style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                    <h1 style={{fontSize:"23px"}}>What's your Status?</h1>
                    <select  name="userStatus" value={userStatus} defaultValue={userStatus} onChange={(e) => onChange(e)} class="custom-select">
                        <option value="">Select Status</option>
                        <option value="NEED SWIPES" selected>NEED SWIPES</option>
                        <option value="NEED CAMPUS DIRHAMS" selected>NEED CAMPUS DIRHAMS</option>
                        <option value="GIVING AWAY SWIPES" selected>GIVING AWAY SWIPES</option>
                        <option value="GIVING AWAY CAMPUS DIRHAMS" selected>GIVING AWAY CAMPUS DIRHAMS</option>
                        <option value="NOT SURE" selected>NOT SURE</option>
                    </select>
                </div>

                <div>
                    {displayUserOptions()}
                </div>

            </div>

            <div className="footer">
                <HomeSVG fill="var(--mainColor)" width="27px" onClick={()=>goTo("/home")}/>
                <MessagesSVG width="27px" onClick={()=>goTo("/messages")}/>
                <ProfileSVG width="27px" onClick={()=>goTo("/profile")}/>
            </div>
        </div>
    )
}

export default Home