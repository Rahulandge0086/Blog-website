import React,{useState} from "react";
import { AnimatePresence, motion } from "motion/react"
import Message from "./Message";

function Registration(){
    const [page, setPage] = useState(0);
    const [Name,setName] = useState(null);
    const [Dob,setDob] = useState(null);
    const [Email,setEmail] = useState(null);
    const [Pass,setPass] = useState(null);
    const [CheckPass,setCheckPass] = useState(null);
    const [country,SetCountry] = useState(null);
    const [source,setSource] = useState(null);
    const [isNext,setIsNext] = useState(0);
    const [isCorrect,setCorrect] = useState(false);
    const [isMail,setMail] = useState(false);

    function CheckEmail(email){
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){    
            setCorrect(true);    
            return false;
        }
        setMail(true);
        return true;
    }

    const next = () => {
        if (page <= 2){
            if(page===0) {
                if(isNext==0) setIsNext(isNext+1);
                if(Name && Dob && CheckEmail(Email)) setPage(page + 1);
            }
            if(page===1) {
                if(isNext==1) setIsNext(isNext+1);
                if(Pass && CheckPass) setPage(page + 1);
            }
            if(page===2) {
                if(isNext==2) setIsNext(isNext+1);
            }
        }      
    };

    const prev = () => {
        if (page > 0) {
            if(isNext===3) setIsNext(isNext - 1)
            setPage(page - 1);
            setIsNext(isNext - 1);
        }
    };

    return(
        <div className="reg-container">
            <AnimatePresence>
                <motion.div 
                    className="orb" 
                    style={{width:'100px',height:'100px',background:'red'}} 
                    initial={{x:0,y:0}} 
                    animate={{x:[70,400,150],y:[70,250,300]}} 
                    exit={{ x: 0, y: 200 }} 
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                        }} />
                <motion.div 
                    className="orb" 
                    style={{width:'100px',height:'100px',background:'blue'}} 
                    initial={{x:200,y:200}} 
                    animate={{x:[500,200,500],y:[70,90,300]}} 
                    exit={{ x: 0, y: 200 }} 
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                        }} />
            </AnimatePresence>
            {/* <motion.div className="orb" initial={{opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}></motion.div> */}
            <div style={{ display: isCorrect ? "block" : "none"}}>
                <Message  onSubmit={()=>{setCorrect(false)}} message="Provide a valid email"/>
            </div>
            <div className="regDiv-con" style={{width:'max-content',height:"500px"}}>
                    <AnimatePresence mode="wait">
                    {page === 0 && (
                        <motion.div
                        key="page1"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        className="reg-div"
                        >
                        <h1>Share some details with Us</h1>
                                <form style={{margin:'30px'}}>
                                    <label>Name</label>
                                    <input value={Name} style={{border:((isNext==1)&&!Name)?("1px solid red"):''}} onChange={(e)=>{setName(e.target.value)}} className="reg-input" type="text" required></input>
                                    <label>DOB</label>
                                    <input value={Dob} style={{border:((isNext==1)&&!Dob)?("1px solid red"):''}} onChange={(e)=>{setDob(e.target.value)}} className="reg-input" type="date" required></input>
                                    <label>Email</label>
                                    <input value={Email} style={{border:((isNext==1) && !Email && !isMail)?("1px solid red"):''}} onChange={(e)=>{setEmail(e.target.value)}}className="reg-input" type="email" required></input>
                                </form>
                        </motion.div>
                    )}

                    {page === 1 && (
                        <motion.div
                        key="page2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        className="reg-div"
                        >
                        <h1>Create Password</h1>
                                <form style={{margin:'30px'}}>
                                    <label>Password</label>
                                    <input value={Pass} style={{border:((isNext==2)&&!Pass)?("1px solid red"):''}} onChange={(e)=>{setPass(e.target.value)}}className="reg-input" type="password" required></input>
                                    <label>Re-Enter Password</label>
                                    <input value={CheckPass} style={{border:((isNext==2)&&!CheckPass)?("1px solid red"):''}} onChange={(e)=>{setCheckPass(e.target.value)}} className="reg-input" type="password" required></input>
                                </form>
                        </motion.div>
                    )}

                    {page === 2 && (
                        <motion.div
                        key="page3"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.5 }}
                        className="reg-div"
                        >
                        <h1>Just small Information</h1>
                            <form style={{margin:'30px'}}>
                                <span>Country Name</span>
                                <select value={country} style={{border:((isNext==3)&&!country)?("1px solid red"):''}} className="reg-input" onChange={(e)=>{SetCountry(e.target.value)}}>
                                    <option value="" disabled selected> Select your country</option>
                                    <option>India</option>
                                    <option>China</option>
                                </select>
                                <span>How do you know About US?</span>
                                <select value={source} style={{border:((isNext==3)&&!source)?("1px solid red"):''}} className="reg-input" onChange={(e)=>{setSource(e.target.value)}}>
                                    <option value="" disabled selected> How do you know US?</option>
                                    <option>Friends</option>
                                    <option>Google</option>
                                    <option>other</option>
                                </select>
                            </form>
                        </motion.div>
                    )}
                    </AnimatePresence>
                    <div className="regNav-con">
                        <motion.button whileTap={{scale:0.8}} className="regNav-btn" onClick={prev} disabled={page === 0} style={{display:(page===0)?'none':''}}>
                            Previous
                        </motion.button>
                        <motion.button whileTap={{scale:0.8}} className="regNav-btn" onClick={next} disabled={page === 2} style={{display:(page===2)?'none':''}}>
                            Next
                        </motion.button>
                        <a href={country&&source?"/login":null}>
                            <motion.button whileTap={{scale:0.8}} className="regNav-btn" onClick={next} style={{display:(page===2)?'':'none'}}>
                                Sign up
                            </motion.button>
                        </a>
                    </div>
            </div>
        </div>
    )
}
export default Registration;