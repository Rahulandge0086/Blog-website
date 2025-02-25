import React,{useState,useContext } from "react";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import Message from "./Message";

function Login() {
  const {setUser,setIsAuthenticated,isAuthenticated} = useContext(AuthContext);
  const [isAuthorized,setAuthorized]= useState(false);
  const [username,setUsername] = useState("");
  const [password,setPass] = useState("");
  const [isreg,setReg] = useState(true);
  const [ismatched,setMatched]= useState(false);
  const [ispresent,setPresent] = useState(false);
  const navigate = useNavigate();

  function handleEmail(event){
    setUsername(event.target.value);
  }

  function handlePass(event){
    setPass(event.target.value);
  }

  function handleClick(event){
    event.preventDefault();
    setReg(false);
  }

  function setregister(){
    setReg(true);
  }

  function handleMessage() {
    setAuthorized(false);
  }

  //To handle if passwords didn't match for re-enter
  function handleMisMatch(){
    setMatched(true);
    setTimeout(()=>{
      setMatched(false);
    },2000)
  }

  function handleMessage1(){
    setMatched(false);
  }

  function handleMessage2(){
    setPresent(false);
  }

  function checkemail(){
    setPresent(true);
    setTimeout(()=>{
      setPresent(false);
    },2000)
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formdata= new FormData();
    formdata.append("username",username);
    formdata.append("password",password);
    try{
      const res = await axios.post('http://localhost:3000/login', formdata, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
        withCredentials: true, // To allow the server to use cookies/sessions
      });
      setUser(res.data.user);
      setIsAuthenticated(true);
      navigate("/dashboard");
    }catch(err){
      if(isAuthenticated===false){
        setAuthorized(true);
        setTimeout(()=>{
          setAuthorized(false);
        },2000);
      }
      console.error("Login failed", err);
    }
  }
  return (
    <div>
      <div style={{ display: isAuthorized ? "block" : "none"}}>
        <Message  onSubmit={handleMessage} message="Invalid credentials"/>
      </div>
      <div style={{ display: ismatched ? "block" : "none"}} >
        <Message onSubmit={handleMessage1} message="Passwords Mismatched"/>
      </div>
      <div style={{ display: ispresent ? "block" : "none"}} >
        <Message onSubmit={handleMessage2} message="Email Already Exists"/>
      </div>
      
        <div className="login-container">
        <div style={{display:isreg?"block":"none"}} className="loginForm-div">
          <div style={{display:'flex',justifyContent:'center'}}>
            <h6 style={{color:'black'}}>Sign in</h6>
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
            <label style={{color:'black'}}>Email</label>
            <input
              name="email"
              className="login-email"
              type="email"
              placeholder="Enter Email"
              onChange={handleEmail}
              required
            />
            <label style={{color:'black'}}>Password</label>
            <input
              name="password"
              className="login-pass"
              type="password"
              placeholder="Enter password"
              onChange={handlePass}
              required
            />
            <button className="login-submit" type="submit">
              Submit
            </button>
          </form>
          <button className="signUp-button" onClick={handleClick}><u>Sign up?</u></button>  
        </div>  
        <div style={{display:isreg?"none":"block",width: '350px',minWidth: '100px',margin: '10px'}}>
            <Register reg={setregister} misMatch={handleMisMatch} cemail={checkemail}/>
          </div>
        </div>
    </div>
    
  );
}

export default Login;
