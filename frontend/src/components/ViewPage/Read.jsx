import React from "react";

function Read(props) {
  return (
    <div className="Read-page">
      <h1>{props.title}</h1>
      <p style={{ whiteSpace: "pre-line" }}>{props.content}</p>
    </div>
  );
}

export default Read;
