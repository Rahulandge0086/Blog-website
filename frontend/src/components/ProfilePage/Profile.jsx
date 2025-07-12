import React from "react";

function Profile(){
    return(
    <div className="prof-container">
        <div className="showInfo-container">
          <div className="prof-icon"></div>
          <span>Rahul Landge</span>
          <span>test1@usblog.com</span>
        </div>
        {/* <h1>Top Blogs</h1> */}
        <div className="Showblog-contain">
            <div className="blog-rect"></div>
            <div className="blog-rect"></div>
            <div className="blog-rect"></div>
            <div className="blog-rect"></div>
            <div className="blog-rect"></div>
            <div className="blog-rect"></div>
        </div>
    </div>
    )
}

export default Profile;