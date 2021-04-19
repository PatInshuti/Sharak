import React,{useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import { ReactComponent as HomeSVG } from '../images/home.svg';
import { ReactComponent as MessagesSVG } from '../images/messages.svg';
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
                    <h4 style={{marginLeft:"15px"}}>CHAT</h4>
                </div>
            </div>

            <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "height":"100%", width:"90%", margin:"0 auto", marginTop:"20%"}}>
            
                <p>Show messages</p>

            </div>

            <div className="footer">
                <HomeSVG width="27px" onClick={()=>goTo("/home")}/>
                <MessagesSVG fill="var(--mainColor)" width="27px" onClick={()=>goTo("/messages")}/>
                <ProfileSVG width="27px" onClick={()=>goTo("/profile")}/>
            </div>
        </div>
    )
}

export default Home