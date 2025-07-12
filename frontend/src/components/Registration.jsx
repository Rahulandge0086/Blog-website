import React,{useState} from "react";
import { AnimatePresence, motion } from "motion/react"

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

    const next = () => {
        if (page <= 2){
            if(page===0) {
                if(isNext==0) setIsNext(isNext+1);
                if(Name && Dob && Email) setPage(page + 1);
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
            <div style={{width:'max-content',height:"500px"}}>
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
                                    <input value={Name} style={{border:((isNext==1)&&!Name)?("2px solid red"):''}} onChange={(e)=>{setName(e.target.value)}} className="reg-input" type="text" required></input>
                                    <label>DOB</label>
                                    <input value={Dob} style={{border:((isNext==1)&&!Dob)?("2px solid red"):''}} onChange={(e)=>{setDob(e.target.value)}} className="reg-input" type="date" required></input>
                                    <label>Email</label>
                                    <input value={Email} style={{border:((isNext==1)&&!Email)?("2px solid red"):''}} onChange={(e)=>{setEmail(e.target.value)}}className="reg-input" type="email" required></input>
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
                                    <input value={Pass} style={{border:((isNext==2)&&!Pass)?("2px solid red"):''}} onChange={(e)=>{setPass(e.target.value)}}className="reg-input" type="password" required></input>
                                    <label>Re-Enter Password</label>
                                    <input value={CheckPass} style={{border:((isNext==2)&&!CheckPass)?("2px solid red"):''}} onChange={(e)=>{setCheckPass(e.target.value)}} className="reg-input" type="password" required></input>
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
                                <select value={country} style={{border:((isNext==3)&&!country)?("2px solid red"):''}} className="reg-input" onChange={(e)=>{SetCountry(e.target.value)}}>
                                    <option value="" disabled selected> Select your country</option>
                                    <option>India</option>
                                    <option>China</option>
                                </select>
                                <span>How do you know About US?</span>
                                <select value={source} style={{border:((isNext==3)&&!source)?("2px solid red"):''}} className="reg-input" onChange={(e)=>{setSource(e.target.value)}}>
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
                        <button className="regNav-btn" onClick={prev} disabled={page === 0} style={{display:(page===0)?'none':''}}>
                            Previous
                        </button>
                        <button className="regNav-btn" onClick={next} disabled={page === 2} style={{display:(page===2)?'none':''}}>
                            Next
                        </button>
                        <a href={country&&source?"/login":null}>
                            <button className="regNav-btn" onClick={next} style={{display:(page===2)?'':'none'}}>
                                Sign up
                            </button>
                        </a>
                    </div>
            </div>
        </div>
    )
}
export default Registration;