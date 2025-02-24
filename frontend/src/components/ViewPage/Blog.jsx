import React from "react";

function Blog(props) {
  return (
    <div className="blogCard">
      <div className="viewImg">
        <img src={props.imgpath} alt="nature image" className="blogCardImg" />
      </div>
      <div className="titleDiv">
        <h3>{props.t}</h3>
      </div>
      <div className="viewCards">
        <h6>{props.c}</h6>
      </div>
    </div>
  );
}

export default Blog;
