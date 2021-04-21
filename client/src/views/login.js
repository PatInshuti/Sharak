import React,{useState,useEffect} from "react";
import nyuadLogo from '../images/nyuad-logo.jpeg';
import { Link, useHistory } from "react-router-dom";

const Login = (props) =>{

    const history = useHistory();

    const [state,setState] = useState({
        username:"",
        email:"",
        password:""
    })

    const {username,email,password} = state;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    const onChange = e => {
        setState({...state, [e.target.name]:e.target.value  });    
    } 

    useEffect(()=>{
        let retrievedUserId = localStorage.getItem("userId");
        // check if the user exists in the database

        fetch(`http://127.0.0.1:6800/api/getUser/${retrievedUserId}`)
        .then(response => response.json())
        .then(data => {

            if (data.status == 400){
                history.push("/login")
            }

            else{
                history.push("/home")
            }
        })
    },[])

    const submitForm = e =>{
        e.preventDefault();

        if ((email !== "") && (email.match(emailRegex)[0] === email) && (password.length >= 4)) {
            
            const data = {email,password}

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
          
            fetch('http://127.0.0.1:6800/api/login', requestOptions)
                .then(response => response.json())
                .then(data => {

                    console.log(data)
        
                  if (data.status === 200){
                        //save the data.response (ID) to localstorage
                        localStorage.setItem('userId', data.response);   
                        history.push(`/home`);
                    }
        
                    else if (data.status === 400){
                        alert("There was an error :( Try to Logging in again")
                    }
              })

        }

        else{
            alert("Please Check Your Email or Password")
        }
    
    }

    return(
        <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent":"center", "height":"100%"}}>
            <div>
                <h1 style={{color:"var(--mainColor)",textAlign:"center"}}>Sharak</h1>
                <img src={nyuadLogo} />
            </div>

            <div style={{"display": "flex", "flexDirection":"column", "width":"85%", "marginTop":"2rem"}}>
                <div style={{"marginTop":"15px"}}>
                    <input name="email" value={email} placeholder="Email" type="email" onChange={(e)=>onChange(e)} required/>
                </div>

                <div style={{"marginTop":"15px"}}>
                    <input name="password" value={password} placeholder="Password" type="password" onChange={(e)=>onChange(e)} required/>
                </div>

                <div style={{"margin":"0 auto", "marginTop":"15px"}}>
                    <button className="login-button" onClick={(e)=>submitForm(e)}>Login</button>
                    <div style={{marginTop:"1rem", textAlign:"center"}}><Link to={"/signup"}>Register</Link></div>
                </div>
            </div>
        </div>
    )
}

export default Login