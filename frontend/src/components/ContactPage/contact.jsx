import React, { useState } from "react";
import Svg from "./svg";
import {storeContact} from "../../../server";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isAuthorized,setAuthorized]= useState(false);

  function handleName(event) {
    setName(event.target.value);
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handleMessage(event) {
    setMessage(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    storeContact(name,email,message).then((res)=>{
      if(res===true){
        setName("");
        setEmail("");
        setMessage("");
      }
      if(res===false){
        setAuthorized(true);
        setTimeout(()=>{
          setAuthorized(false);
        },2000); 
      }
    })
    
  }

  function handleMsg() {
    setAuthorized(false);
  }

  return (
    <div>
      <div className="message-container2">
          <div
            className="message1"
            style={{ display: isAuthorized ? "block" : "none"}}
          >
            Please Enter Registered Email
            <button
              type="button"
              className="close-message close"
              onClick={() => {
                handleMsg();
              }}
            >
              <span aria-hidden="true" className="cancel-message">
                &times;
              </span>
            </button>
          </div>
        </div>
      <div className="contact-container">
        <div className="contact-div">
          <div className="contact-form">
            <h4>Send Us Message</h4>
            <form
              className="contact"
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <input
                type="text"
                placeholder="Name"
                className="contact-input"
                onChange={handleName}
                value={name}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="contact-input"
                onChange={handleEmail}
                value={email}
                required
              />
              <textarea
                type="message"
                placeholder="Message"
                className="contact-message"
                onChange={handleMessage}
                value={message}
                required
              />
              <button className="contact-submit" type="submit" value="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="contactinfo-container">
            <div className="contact-info">
              <h4 style={{ marginBottom: "20px" }}>Contact us</h4>
              <div className="address-div">
                <p style={{ marginTop: "50px" }}>
                  We're open for any suggestion or just to have a chat.
                </p>
                <Svg
                  message="Address: Sector 123,nigdi,pune"
                  path="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"
                />
                <Svg
                  message="+1234567890"
                  path="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                />
                <Svg
                  message="usblog@gmail.com"
                  path="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
