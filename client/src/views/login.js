import React,{useState,useEffect} from "react";
import nyuadLogo from '../images/nyuad-logo.jpeg';

const Login = (props) =>{


    return(
        <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent":"center", "height":"100%"}}>
            <div>
                <h1 style={{color:"var(--mainColor)",textAlign:"center"}}>Sharak</h1>
                <img src={nyuadLogo} />
            </div>

            <div style={{"display": "flex", "flexDirection":"column", "width":"85%", "marginTop":"2rem"}}>
                <div style={{"marginTop":"15px"}}>
                    <input placeholder="Email" type="email" required></input>
                </div>

                <div style={{"marginTop":"15px"}}>
                    <input placeholder="Password" type="password" required></input>
                </div>

                <div style={{"margin":"0 auto", "marginTop":"15px"}}>
                    <button className="login-button">Login</button>
                </div>
            </div>
        </div>
    )
}

export default Login