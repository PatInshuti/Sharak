import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSVG } from '../images/home.svg';
import { ReactComponent as ExchangeSVG } from '../images/exchange.svg';
import { ReactComponent as ProfileSVG } from '../images/profile.svg';

import '../index.css';

const Requests = (props) =>{

    const history = useHistory();


    const [state,setState] = useState({
        username:"Sebastiano",
        activeTabBar:"incoming-request-tab",
        incomingRequestStyle:{},
        outgoingRequestStyle:{}

    })

    const {username,activeTabBar,incomingRequestStyle,outgoingRequestStyle} = state;


    const onChange = e => {
        setState({...state, [e.target.name]:e.target.value  });    
    } 


    const goTo = (location) =>{
        history.push(location)
    }

    const updateActiveTab = (data) =>{
        setState({...state, activeTabBar:data})
    }


    return(
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
                        
                        <div>
                            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                <div>
                                    <p style={{fontWeight:"500"}}>Patrick</p>
                                </div>

                                <div>
                                    <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                                </div>

                                <div>
                                    <button className="accept-button">accept</button>
                                    <button className="ignore-button" style={{marginLeft:"10px"}}>ignore</button>
                                </div>

                            </div>

                            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                <div>
                                    <p style={{fontWeight:"500"}}>Patrick</p>
                                </div>

                                <div>
                                    <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                                </div>

                                <div>
                                    <button className="accept-button">accept</button>
                                    <button className="ignore-button" style={{marginLeft:"10px"}}>ignore</button>
                                </div>

                            </div>

                            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                <div>
                                    <p style={{fontWeight:"500"}}>Patrick</p>
                                </div>

                                <div>
                                    <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                                </div>

                                <div>
                                    <button className="accept-button">accept</button>
                                    <button className="ignore-button" style={{marginLeft:"10px"}}>ignore</button>
                                </div>

                            </div>

                            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                <div>
                                    <p style={{fontWeight:"500"}}>Patrick</p>
                                </div>

                                <div>
                                    <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                                </div>

                                <div>
                                    <button className="accept-button">accept</button>
                                    <button className="ignore-button" style={{marginLeft:"10px"}}>ignore</button>
                                </div>

                            </div>

                            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                <div>
                                    <p style={{fontWeight:"500"}}>Patrick</p>
                                </div>

                                <div>
                                    <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                                </div>

                                <div>
                                    <button className="accept-button">accept</button>
                                    <button className="ignore-button" style={{marginLeft:"10px"}}>ignore</button>
                                </div>

                            </div>
                            
                        </div>
                        
                        
                        :

                        <div>
                            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                <div>
                                    <p style={{fontWeight:"500"}}>Patrick</p>
                                </div>

                                <div>
                                    <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                                </div>

                                <div>
                                    <span className="pending-button">Pending</span>
                                </div>

                            </div>

                            <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                                <div>
                                    <p style={{fontWeight:"500"}}>What a long ass name</p>
                                </div>

                                <div>
                                    <p style={{color:"var(--mainColor", fontWeight:"500"}}>400 campus Dirhams</p>
                                </div>

                                <div>
                                    <span className="rejected-button" style={{marginLeft:"10px"}}>Rejected</span>
                                </div>

                            </div>

                        </div>
                    }
                    

                </div>

            </div>

            <div className="footer">
                <HomeSVG width="27px" onClick={()=>goTo("/home")}/>
                <ExchangeSVG fill="var(--mainColor)" width="27px" onClick={()=>goTo("/allRequests")}/>
                <ProfileSVG width="27px" onClick={()=>goTo("/profile")}/>
            </div>

        </div>
    )
}

export default Requests