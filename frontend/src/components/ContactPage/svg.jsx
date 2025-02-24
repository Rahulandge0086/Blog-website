import React from "react";

function Svg(props) {
  return (
    <div className="svg-div">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-geo-alt-fill"
        viewBox="0 0 16 16"
      >
        <path d={props.path} />
      </svg>
      <p className="contact-text">{props.message}</p>
    </div>
  );
}

export default Svg;
