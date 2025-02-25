import React,{ useContext,useState,useEffect }  from "react";
import { Link} from "react-router-dom";
import { AuthContext } from "../AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {getUser} from "../../server";
import logo from "../images/Screenshot_2025-02-23_010200-removebg-preview.png";

function Header() {
  const { user, setUser, setIsAuthenticated } = useContext(AuthContext);4
  const [currUser,setcurrUser] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("http://localhost:3000/logout", { withCredentials: true });
    setUser(null);
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(()=>{
    getUser().then((res)=>{
      setcurrUser(res.user);
    });
  },[])
  return (
    <div className="headerDiv">
      <div className="routes">
          <nav className="navbar navbar-expand-lg custom-navbar">
            <div className="container-fluid">
            <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
                  <Link className="headerButton" to="/">
                    <img src={logo} style={{width:'150px'}}/>
                  </Link>
                  <p style={{margin:'0px',fontSize:'small'}}>{currUser}</p>
                </div>
              <button style={{backgroundColor:'rgb(244, 227, 165)'}}className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span style={{width:'1em',height:'1em'}} className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                  <button className="headerButton">
                    <Link className="headerButton" to="/create">
                      Create
                    </Link>
                  </button>
                  <button className="headerButton">
                    <Link className="headerButton" to="/view">
                      View
                    </Link>
                  </button>
                  <button className="headerButton">
                    <Link className="headerButton" to="/contact">
                      Contact
                    </Link>
                  </button>
                  <button className="logout-button" onClick={handleLogout} style={{fontSize:"small"}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-right logout-svg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                    <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </nav>
      </div>
    </div>
  );
}

export default Header;
