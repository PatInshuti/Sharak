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
            email:""
        },

        amount:"",
        loading:true,
        loadingSystemstatus:true,

        meal_swipes:0,
        campus_dirhams:0,
        giving_swipes_status: "",
        giving_campus_dirhams_status:"",

        systemStatus:{
            giving_away_swipes:[],
            giving_away_campus_dirhams:[]
        }
    })


    const {userData,amount,systemStatus,loading,loadingSystemstatus} = state;


    const onChange = e => {
        setState({...state, [e.target.name]:e.target.value  });    
    } 


    const goTo = (location) =>{
        history.push(location)
    }


    useEffect(()=>{
        // retrieve from localstorage
        let retrievedUserId = localStorage.getItem("userId");
        // check if the user exists in the database

        //retriece user's data
        fetch(`api/getUser/${retrievedUserId}`)
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
                    campus_dirhams:data.response.campusDirhams,
                    userStatus:data.response.userStatus
                })
            }
        })

    },[loading])


    const sendRequest = (requestType,requester,requestee)=>{

        const data = {"requestType": requestType, "requester":requester, "requestee":requestee, "amount":amount}

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        
        fetch('api/sendRequest', requestOptions)
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


    useEffect(()=>{

            //retrieve data for the whole system
            fetch(`api/systemStatus`)
            .then(response => response.json())
            .then(data => {
    
                if (data.status == 400){
                    console.log("easter egg")
                }
    
                else{
    
                    let resp = data.response
    
                    setState({...state,
                        systemStatus:{
                            ...state.systemStatus,
                            giving_away_campus_dirhams:resp.givingCampusDirhams,
                            giving_away_swipes:resp.givingSwipes,
                        },
                        loadingSystemstatus:false
                    })
                }
            })
    },[loadingSystemstatus])


    return(
        <div style={{height:"100%"}}>

            <div className="navbar">
                <div>
                    <h4 style={{marginLeft:"15px"}}>AVAILABLE CAMPUS DIRHAMS</h4>
                </div>
            </div>

            <div style={{width:"90%", margin:"0 auto"}}>
                <div style={{"display": "flex", "flexDirection": "column", "height":"100%", width:"100%", marginTop:"3.5rem"}}>
                    <div>
                        {
                            systemStatus.giving_away_campus_dirhams.map((data,index)=> {
                                return(
                                    <div key={data._id} style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                        <div style={{maxWidth:"60px"}}>
                                            <p style={{fontWeight:"500"}}>{data.username}</p>
                                        </div>
            
                                        <div style={{maxWidth:"60px"}}>
                                            <p style={{color:"var(--mainColor", fontWeight:"500"}}>{data.campusDirhams}  Campus Dirhams</p>
                                        </div>
            
                                        <div>
                                            <input name="amount" value={amount} style={{width:"50px", padding:"5px"}} type="number" pattern="\d*" min={1} max={data.campusDirhams} onChange={(e)=>onChange(e)} />
                                            <button className="accept-button" style={{marginLeft:"15px"}} onClick={() => sendRequest("campus_dirhams",userData.email,data._id)}>Request</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                      
                    </div>
                </div>
            </div>

            <div className="footer">
                <HomeSVG width="27px" onClick={()=>goTo("/home")}/>
                <ExchangeSVG width="27px" onClick={()=>goTo("/allRequests")}/>
                <ProfileSVG width="27px" onClick={()=>goTo("/profile")}/>
            </div>
        </div>
    )
}

export default Home