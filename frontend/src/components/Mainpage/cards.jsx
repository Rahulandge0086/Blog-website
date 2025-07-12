import React from "react";

function Card(props) {
  return (
    <div className="card-div">
      <img className="imgDiv" src={props.imgpath} />
      <div className="card-content">
        <p className="card-div-title">{props.title}</p>
        <p>{props.content}</p>
      </div>
      
    </div>
  );
}

export default Card;
