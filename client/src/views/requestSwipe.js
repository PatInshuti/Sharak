import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSVG } from '../images/home.svg';
import { ReactComponent as ExchangeSVG } from '../images/exchange.svg';
import { ReactComponent as ProfileSVG } from '../images/profile.svg';

import '../index.css';

const Home = (props) =>{

    const history = useHistory();


    const [state,setState] = useState({
        username:"Sebastiano"
    })

    const {username} = state;


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
                    <h4 style={{marginLeft:"15px"}}>AVAILABLE SWIPES</h4>
                </div>
            </div>

            <div style={{width:"90%", margin:"0 auto"}}>
                <div style={{"display": "flex", "flexDirection": "column", "height":"100%", width:"100%", marginTop:"3.5rem"}}>

                    <div>
                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                            <div style={{maxWidth:"60px"}}>
                                <p style={{fontWeight:"500"}}>Patrick</p>
                            </div>

                            <div>
                                <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                            </div>

                            <div>
                                <input style={{width:"50px", padding:"5px"}} type="number" min="1"/>
                                <button className="accept-button" style={{marginLeft:"15px"}}>Request</button>
                            </div>

                        </div>

                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                            <div style={{maxWidth:"60px"}}>
                                <p style={{fontWeight:"500"}}>Patrick</p>
                            </div>

                            <div>
                                <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                            </div>

                            <div>
                                <input style={{width:"50px", padding:"5px"}} type="number" min="1"/>
                                <button className="accept-button" style={{marginLeft:"15px"}}>Request</button>
                            </div>

                        </div>

                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                            <div style={{maxWidth:"60px"}}>
                                <p style={{fontWeight:"500"}}>Patrick</p>
                            </div>

                            <div>
                                <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                            </div>

                            <div>
                                <input style={{width:"50px", padding:"5px"}} type="number" min="1"/>
                                <button className="accept-button" style={{marginLeft:"15px"}}>Request</button>
                            </div>

                        </div>

                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                            <div style={{maxWidth:"60px"}}>
                                <p style={{fontWeight:"500"}}>Patrick</p>
                            </div>

                            <div>
                                <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                            </div>

                            <div>
                                <input style={{width:"50px", padding:"5px"}} type="number" min="1"/>
                                <button className="accept-button" style={{marginLeft:"15px"}}>Request</button>
                            </div>

                        </div>

                        <div style={{display:"flex", alignItems:"center", justifyContent:"space-between",marginTop:"10px" }}>
                            <div style={{maxWidth:"60px"}}>
                                <p style={{fontWeight:"500"}}>Patrick</p>
                            </div>

                            <div>
                                <p style={{color:"var(--mainColor", fontWeight:"500"}}>3 mealswipes</p>
                            </div>

                            <div>
                                <input style={{width:"50px", padding:"5px"}} type="number" min="1"/>
                                <button className="accept-button" style={{marginLeft:"15px"}}>Request</button>
                            </div>

                        </div>
                        
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