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
  const [showPassword, setShowPassword] = useState(false);

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
      navigate("/");
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
          <h6 style={{fontFamily:'inter',color:'black'}}>Sign in</h6>
          <p style={{fontFamily:'inter',fontSize:'small'}}>log-in to your account and get started</p>
          <form className="login-form" onSubmit={handleSubmit}>
            <label style={{fontFamily:'inter',color:'black',marginBottom:'7px'}}>Email</label>
            <div className={`input-contain ${username ? 'has-content' : ''}`}>
              <input
                name="email"
                style={{margin:'0'}}
                className="login-email"
                type="email"
                value={username}
                placeholder="Your Email"
                onChange={handleEmail}
                required
              />
            </div>
              <div className={`input-contain1 ${password ? 'has-content1' : ''}`} >
                <label style={{fontFamily:'inter',color:'black',marginBottom:'10px'}}>Password</label>
                <input
                  name="password"
                  className="login-pass"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  id="pwd"
                  placeholder="Your Password"
                  onChange={handlePass}
                  required
                />
                <div style={{display:'flex',justifyContent:'end',gap:'5px',fontFamily:'inter'}}>
                  <span style={{fontSize:'small'}}>show password </span> 
                  <input type="checkbox" onChange={(e) => setShowPassword(e.target.checked)}></input>
                </div>
            </div>
            
            <button className="login-submit" type="submit">
              Sign In
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
