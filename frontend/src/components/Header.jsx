import React,{ useContext,useState,useEffect }  from "react";
import { Link} from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getUser} from "../../server";
import logo from "../images/Screenshot_2025-02-23_010200-removebg-preview.png";

function Header() {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);
  const [currUser,setcurrUser] = useState("");
  const navigate = useNavigate();
  const [isShow, setIsShow] = useState(false);
  const [isSize,setSize] = useState(false);
  const [isClick,setClick] = useState(false);

  const handleLogout = async () => {
    await axios.get("http://localhost:3000/logout", { withCredentials: true });
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };
  
  function handleClick(){
    if(isClick){
      setClick(false);
    }else{
      setClick(true);
    }
  }

  function handleShow(){
    if(isShow){
      setIsShow(false);
    }else{
      setIsShow(true);
    }
  }

  useEffect(()=>{
    getUser().then((res)=>{
      setcurrUser(res.user);
    });
    if(window.innerWidth <= '1000'){
        setSize(true);
    }
    if(window.innerWidth >= '1000'){
        setSize(false);
    }
    function handleResize(){
      if(window.innerWidth <= '1000'){
        setSize(true);
      }
      if(window.innerWidth >= '1000'){
        setSize(false);
        setClick(false);
      }
    }
    window.addEventListener('resize',handleResize);
  },[])
  return (
    <div className="headerDiv">
      <div style={{width:'100%',display:'flex',justifyContent:'space-between',padding:'20px'}}>
        <div>
          <Link to="/">
              logo
          </Link>
        </div>
        <button style={{display:isSize?'block':'none',background:'none',border:'none'}} onClick={handleClick}>
        ☰ 
        </button>
        <div className="nav-links" style={{gap:'50px',display:!isSize || isClick?'flex':'none'}} >
          <div style={{display:'flex',justifyContent:'end'}}>
            <button style={{display:isSize?'block':'none',textAlign:'end',width:'max-content',background:'none',border:'none'}}  onClick={handleClick}>
            ✕
            </button>
          </div>
          <Link to="/">
            <button className="headerButton" onClick={handleClick}>
                Home
            </button>    
          </Link>
          <Link to="/document">
            <button className="headerButton" onClick={handleClick}>
              Create
            </button>
          </Link>
          <Link to="/reg">
            <button className="headerButton" onClick={handleClick}>
              Register
            </button>
          </Link>
          <Link to="/view">
              <button className="headerButton" onClick={handleClick}>View</button>
          </Link>
          <Link to="/contact">
              <button className="headerButton" onClick={handleClick}>Contact</button>
          </Link>
          <div className="profbtn-contain">
            <button className="profile-icon" onClick={handleShow}></button>
            <div style={{display:isShow?'flex':'none'}} className="prof-nav" >
              <Link to="/profile">
                <button className="profile-btn" onClick={handleShow}>Profile</button>
              </Link>
              <button className="logout-button" onClick={handleLogout} style={{color:'white'}}>
                Log Out
                {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-box-arrow-right logout-svg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                  <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg> */}
              </button>
            </div>
          </div>       
        </div>
      </div>
    </div>
  );
}

export default Header;
