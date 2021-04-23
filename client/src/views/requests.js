import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSVG } from '../images/home.svg';
import { ReactComponent as ExchangeSVG } from '../images/exchange.svg';
import { ReactComponent as ProfileSVG } from '../images/profile.svg';

import '../index.css';

const Requests = (props) =>{

    const history = useHistory();


    const [state,setState] = useState({
        activeTabBar:"incoming-request-tab",
        userData:{},
        loading:true,
        requestee:"",
        incomingRequests:[],
        outGoingRequests:[]

    })

    const {loading,userData,activeTabBar,requestee,incomingRequests,outGoingRequests} = state;


    const onChange = e => {
        setState({...state, [e.target.name]:e.target.value  });    
    } 


    const goTo = (location) =>{
        history.push(location)
    }

    const updateActiveTab = (data) =>{
        setState({...state, activeTabBar:data})
    }


    useEffect(()=>{
        let retrievedUserId = localStorage.getItem("userId");
        // check if the user exists in the database

        //retriece user's data
        fetch(`http://127.0.0.1:6800/api/getAllRequests/${retrievedUserId}`)
        .then(response => response.json())
        .then(data => {



            if (data.status == 400){
                history.push("/login")
            }

            else{

                setState({...state,
                    loading:false,
                    incomingRequests:data.response.incomingRequests,
                    outGoingRequests:data.response.outGoingRequests
                })
            }
        })
    },[loading])

    const displayButton = (status) => {

        if (status === "pending"){
            return (
                <div>
                    <span className="pending-button">Pending</span>
                </div>
                
            )
        }

        if (status === "rejected"){
            return (
                <div>
                    <span className="rejected-button" style={{marginLeft:"10px"}}>Rejected</span>
                </div>
                
            )
        }


        if (status === "accepted"){
            return (
                <div>
                    <span className="" style={{marginLeft:"10px"}}>Accepted</span>
                </div>
                
            )
        }



    }

    const respondToRequest = (status,requester,requestType,amount,requestId) =>{

        let userId = localStorage.getItem("userId");
        const data = {"userId":userId,status,requester,requestType,amount,requestId};

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
      
        fetch('http://127.0.0.1:6800/api/respondingToRequest', requestOptions)
            .then(response => response.json())
            .then(data => {
    
              if (data.status === 200){
                    //save the data.response (ID) to localstorage
                    let retrievedUserId = localStorage.getItem("userId");
                    // check if the user exists in the database
            
                    //retriece user's data
                    fetch(`http://127.0.0.1:6800/api/getAllRequests/${retrievedUserId}`)
                    .then(response => response.json())
                    .then(data => {
            
                        if (data.status == 400){
                            history.push("/login")
                        }
            
                        else{
            
                            setState({...state,
                                incomingRequests:data.response.incomingRequests,
                                outGoingRequests:data.response.outGoingRequests
                            })

                        }
                    })
                }
    
                else if (data.status === 400){
                    alert("There was an error :( Try to Logging in again")
                }
          })
    }




    return(


        <div style={{height:"100%"}}>

            {loading === false ?
                <div style={{height:"100%"}}>
                    <div className="navbar">
                        <div>
                            <h4 style={{marginLeft:"15px"}}>REQUESTS</h4>
                        </div>
                    </div>

                    <div style={{width:"90%", margin:"0 auto"}}>

                        {
                            activeTabBar === "incoming-request-tab"?

                                <div style={{display:"flex",justifyContent:"space-between",marginTop:"2.5rem"}}>
                                    <h4 id="incoming-request-tab"style={{pointer:"cursor",color:"var(--mainColor)"}}>Incoming Requests</h4>
                                    <hr></hr>
                                    <h4 id="outgoing-request-tab" style={{pointer:"cursor"}} onClick={()=>updateActiveTab("outgoing-request-tab")}>Outgoing Requests</h4>
                                </div>
                                :
                                
                                <div style={{display:"flex",justifyContent:"space-between",marginTop:"2.5rem"}}>
                                    <h4 id="incoming-request-tab" style={{pointer:"cursor"}} onClick={()=>updateActiveTab("incoming-request-tab")}>Incoming Requests</h4>
                                    <hr></hr>
                                    <h4 id="outgoing-request-tab" style={{pointer:"cursor",color:"var(--mainColor)"}}>Outgoing Requests</h4>
                                </div>

                        }


                        <div style={{"display": "flex", "flexDirection": "column", "height":"100%", width:"100%", marginTop:"1.0rem"}}>


                            {   activeTabBar === "incoming-request-tab"  ?
                                
                                
                                (
                                    incomingRequests.map((data,index)=>{
                                        if (data.status == "pending"){
                                            return(
                                                <div key={data.id} style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                                    <div>
                                                        <p style={{fontWeight:"500"}}>{data.requester}</p>
                                                    </div>
                                    
                                                    <div style={{maxWidth:"60px"}}>
                                                        <p style={{color:"var(--mainColor", fontWeight:"500"}}>{data.requestType === "swipe" ? data.amount + " swipes" : data.amount + " campus dirhams"} </p>
                                                    </div>
                                    
                                                    <div>
                                                        <button className="accept-button" onClick={()=>respondToRequest("accepted",data.requester,data.requestType,data.amount,data.id)}>accept</button>
                                                        <button className="ignore-button" style={{marginLeft:"10px"}}  onClick={()=>respondToRequest("rejected",data.requester,data.requestType,data.amount,data.id)}>Reject</button>
                                                    </div>
                                                </div>
                                            )
                                        }

                                    })
                                )
                                
                                
                                :

                                    (

                                    outGoingRequests.map((data,index)=>{
                                        
                                        return(
                                            <div>
                                                <div key={data.id} style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                                    <div>
                                                        <p style={{fontWeight:"500"}}>{data.requestee}</p>
                                                    </div>
            
                                                    <div>
                                                        <p style={{color:"var(--mainColor", fontWeight:"500"}}>{data.requestType === "swipe" ? data.amount + " swipes" : data.amount + " campus dirhams"} </p>
                                                    </div>
            
                                                    <div>

                                                        {
                                                            displayButton(data.status)
                                                        }
                                                        
                                                        
                                                    </div>
                                                </div>

                                            </div>
                                        )   

                                    })

                                    )
                            }
                            

                        </div>

                    </div>

                    <div className="footer">
                        <HomeSVG width="27px" onClick={()=>goTo("/home")}/>
                        <ExchangeSVG fill="var(--mainColor)" width="27px" onClick={()=>goTo("/allRequests")}/>
                        <ProfileSVG width="27px" onClick={()=>goTo("/profile")}/>
                    </div>
                </div>
            
                    :

                <div style={{height:"100%"}}>
                    <div style={{height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <h3>Loading...</h3>
                    </div>
                </div>
            }



        </div>
    )
}

export default Requests