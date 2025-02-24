import {createContext,useEffect , useState} from 'react';
import axios from 'axios';
import BeatLoader from "react-spinners/BeatLoader";

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoading,setLoading] = useState(true);

    const loaderStyle = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
        left:"50%",
        position:"absolute",
      };
      
  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/status', { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(res.data.isAuthenticated);
        setUser(res.data.user || null);
      })
      .catch(() => {
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the API request completes
      });
  }, []);

  if (isLoading) {
    return(
        <div style={{display:isLoading ? "block" : "none"}}>
         <BeatLoader size="10px" color="#ffe6a9" speedMultiplier="0.7" cssOverride={loaderStyle} />
        </div>    
    )
    
  }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setUser, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}