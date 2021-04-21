import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSVG } from '../images/home.svg';
import { ReactComponent as ExchangeSVG } from '../images/exchange.svg';
import { ReactComponent as ProfileSVG } from '../images/profile.svg';

import '../index.css';

const Home = (props) =>{

    const history = useHistory();


    const [state,setState] = useState({
        userData:{
            username:"",
            email:"",
            incomingRequests: [],
            outGoingRequests: []
        },
        loading:true,
        meal_swipes:0,
        campus_dirhams:0,
        giving_swipes_status: "",
        giving_campus_dirhams_status:""
    })

    const {userData,loading,meal_swipes,campus_dirhams,giving_swipes_status,giving_campus_dirhams_status} = state;

    const onChange = e => {

        if (e.target.name === "giving_swipes_status"){

            setState({...state, [e.target.name]: !giving_swipes_status });

            // Edit User at the backend
            let userId = localStorage.getItem("userId")
            const data = {"userId": userId,"givingSwipesStatus":!giving_swipes_status}

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
          
            fetch('http://127.0.0.1:6800/api/edit', requestOptions)
                .then(response => response.json())
                .then(data => {

                  if (data.status === 200){
                      console.log("success")
                    }
        
                    else if (data.status === 400){
                        console.log("Error")
                    }
            })

        }

        else if(e.target.name === "giving_campus_dirhams_status"){

            setState({...state, [e.target.name]: !giving_campus_dirhams_status }); 
            
            // Edit User at the backend
            let userId = localStorage.getItem("userId")
            const data = {"userId": userId,"givingCampusDirhamsStatus":!giving_campus_dirhams_status}

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            
            fetch('http://127.0.0.1:6800/api/edit', requestOptions)
                .then(response => response.json())
                .then(data => {

                    if (data.status === 200){
                        console.log("success")
                    }
        
                    else if (data.status === 400){
                        console.log("Error")
                    }
            })
        }
        
    }
    
    useEffect(()=>{
        // retrieve from localstorage
        let retrievedUserId = localStorage.getItem("userId");
        // check if the user exists in the database

        fetch(`http://127.0.0.1:6800/api/getUser/${retrievedUserId}`)
        .then(response => response.json())
        .then(data => {
            if (data.status == 400){
                history.push("/login")
            }

            else{
                setState({...state,
                    userData:data.response,
                    loading:false,
                    giving_swipes_status:data.response.givingSwipesStatus,
                    giving_campus_dirhams_status:data.response.givingCampusDirhamsStatus,
                    meal_swipes:data.response.mealSwipes,
                    campus_dirhams:data.response.campusDirhams
                })
            }
        })

    },[loading])


    const goTo = (location) =>{
        history.push(location)
    }

    const displayAllContent = () =>{
        if (loading === true){
            return(
                <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <h3>Loading...</h3>
                </div>
            )
        }

        else if(loading === false){
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
                        <h4 style={{"color":"var(--mainColor)", textAlign:"center"}}>{userData.username}</h4>
                    </div>
    
                    <div style={{display:"flex", flexDirection:"column", alignItems:"left", marginTop:"0px"}}>
                        <h1 style={{fontSize:"18px", marginBottom:"0px"}}>CURRENT BALANCE:</h1>
                        <p style={{fontWeight:"400", marginBottom:"0px"}}>Meal Swipes: <span style={{fontWeight:"600", color:"var(--mainColor)"}}>{meal_swipes}</span></p>
                        <p style={{fontWeight:"400", marginBottom:"0px"}}>Campus Dirhams: <span style={{fontWeight:"600", color:"var(--mainColor)"}}>{campus_dirhams}</span></p>
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
                                    <input name="giving_campus_dirhams_status" id="apple-switch-dirhams" checked={giving_campus_dirhams_status} className="apple-switch" onChange={onChange} type="checkbox" />
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
    }


    return(
        <div style={{height:"100%"}}>
            {displayAllContent()}
        </div>
    )
}

export default Home