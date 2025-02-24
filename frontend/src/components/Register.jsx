import React,{useState} from "react";

function Register({reg,misMatch,cemail}){
    const [username,setUsername] = useState("");
    const [password,setPass] = useState("");
    const [checkpass,setCheckpass]=useState("");
    const [ismatched,setMatched] = useState(false);
    const [name,setName]=useState("");

    function handleEmail(event){
        setUsername(event.target.value);
    }

    function handleName(event){
        setName(event.target.value);
    }

    function handlePass(event){
        setPass(event.target.value);
    }

    function handleBack(event){
        event.preventDefault();
        reg();
    }

    function handleCheckPass(event){
        setCheckpass(event.target.value);
        if(event.target.value == ""){
            setMatched(false);
        }
        if(event.target.value != password){
            setMatched(true);
        }else if(event.target.value === password){
            setMatched(false);
        }
    }
    
    async function handleSubmit(event){
        event.preventDefault();
        if(checkpass===password){
            const formdata = new FormData();
            formdata.append('username',username);
            formdata.append('password',password);
            formdata.append('name',name);
            await fetch('http://localhost:3000/register',{
                method:"POST",
                body:formdata,
            }).then((res) => res.json())
            .then((result) => {
              console.log(result);
              if(result==false){
                cemail();
              }else{
                reg();
              }
            })
            .catch((err) => console.error(err));
        }else{
            misMatch();
        }
    }
    
    return(
        <div className="register-form">
            <div style={{display:'flex',justifyContent:'center'}}>
                <h6 style={{color:'black'}}>Sign Up</h6>
            </div>
            <form className="login-form" onSubmit={handleSubmit}>
                <label style={{color:'black'}}>Name</label>
                <input name="Name" type="text" className="login-email" placeholder="Enter Name" onChange={handleName}
                    required/>
                <label style={{color:'black'}}>Email</label>
                <input
                    name="email"
                    className="login-email"
                    type="email"
                    placeholder="Enter Email"
                    onChange={handleEmail}
                    required
                />
                <label style={{color:'black'}}>Set a Password</label>
                <input
                    name="password"
                    className="login-pass"
                    type="password"
                    placeholder="Enter password"
                    onChange={handlePass}
                    required
                />
                <label style={{color:'black'}}>Re-enter Password</label>
                <input
                    style={{border:ismatched ? '1.6px solid red':'1.6px solid rgb(72, 72, 232)'}}
                    name="Checkpassword"
                    className="login-pass"
                    type="password"
                    placeholder="Re-enter password"
                    onChange={handleCheckPass}
                    required
                />
                <button className="login-submit" type="submit">
                    Save
                </button>
            </form>
            <button style={{background:'none'}} type="submit" onClick={handleBack} className="Regback-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" className="bi bi-arrow-left arrow-svg" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
            </svg>back
            </button>
        </div>
    )
}

export default Register;