import React from "react";

function Card(props) {
  return (
    <div className="card-div inter">
      <img className="imgDiv" src={props.imgpath} />
      <p className="card-div-title">{props.title}</p>
      <p>{props.content}</p>
    </div>
  );
}

export default Card;
