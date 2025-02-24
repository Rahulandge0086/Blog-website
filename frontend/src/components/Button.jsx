import React from "react";

function Button(props) {
  return (
    <button className={props.class} type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
