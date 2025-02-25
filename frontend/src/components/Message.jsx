import React from "react";

function Message({onSubmit,message}){
    return(
    <div className="message-container1">
        <div
        className="message1"
        >
            {message}
            <button
                type="button"
                className="close-message close"
                onClick={() => {
                    onSubmit();
                }}
            >
                <span aria-hidden="true" className="cancel-message">
                &times;
                </span>
            </button>
        </div>
  </div>)
}

export default Message;