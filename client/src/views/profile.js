import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSVG } from '../images/home.svg';
import { ReactComponent as ExchangeSVG } from '../images/exchange.svg';
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
        },

        giving_swipes_status: true,
        giving_campus_dirhams_status:false
    })

    const {username,userStatus,balance,giving_swipes_status,giving_campus_dirhams_status} = state;


    const onChange = e => {

        if (e.target.name === "giving_swipes_status"){
            setState({...state, [e.target.name]: !giving_swipes_status }); 

        }

        else if(e.target.name === "giving_campus_dirhams_status"){
            setState({...state, [e.target.name]: !giving_campus_dirhams_status }); 
        }
        
    }
    
    useEffect(()=>{
        // set status
        // setState({...state,giving_swipes_status:true,giving_campus_dirhams_status:true})
    

    },[])


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

                <div style={{display:"flex", flexDirection:"column", alignItems:"left", marginTop:"0px"}}>
                    <h1 style={{fontSize:"18px", marginBottom:"0px"}}>CURRENT BALANCE:</h1>
                    <p style={{fontWeight:"400", marginBottom:"0px"}}>Meal Swipes: <span style={{fontWeight:"600", color:"var(--mainColor)"}}>{balance.meal_swipes}</span></p>
                    <p style={{fontWeight:"400", marginBottom:"0px"}}>Campus Dirhams: <span style={{fontWeight:"600", color:"var(--mainColor)"}}>{balance.campus_dirhams}</span></p>
                </div>

                <div style={{display:"flex", flexDirection:"column", alignItems:"left", marginTop:"2.5rem"}}>
                    <h1 style={{fontSize:"18px", marginBottom:"0px"}}>CURRENT STATUS:</h1>
                        <div>
                            <div style={{marginTop:"16px"}}>
                                <label style={{fontSize:"16px", fontWeight: "400"}}>Giving swipes</label>
                                <input name="giving_swipes_status" id="apple-switch-swipes" checked={giving_swipes_status} className="apple-switch" onChange={onChange} type="checkbox" />
                            </div>

                            <div>
                                <label style={{marginTop:"16px", fontSize:"16px", fontWeight: "400"}}>Giving campus Dirhams</label>
                                <input name="giving_campus_dirhams_status" id="apple-switch-dirhams" className="apple-switch" type="checkbox" />
                            </div>

                        </div> 
                </div>

                {/* <div style={{marginTop:"20px", paddingBottom:"70px"}}>
                    <button className="contact-button">Edit Account Info</button>
                </div> */}

            </div>

            <div className="footer">
                <HomeSVG width="27px" onClick={()=>goTo("/home")}/>
                <ExchangeSVG width="27px" onClick={()=>goTo("/allRequests")}/>
                <ProfileSVG width="27px" fill="var(--mainColor)" onClick={()=>goTo("/profile")}/>
            </div>
        </div>
    )
}

export default Home