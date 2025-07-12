import React, { useState, useEffect } from "react";
import { getData,getBlog, deleteData} from "../../../server.js";
import Blog from "./Blog.jsx";
import BlogView from "./BlogView.jsx";
import Read from "./Read.jsx";
import {Link} from "react-router-dom";
import nature_image from "../../images/nature_image.jpg";
import BeatLoader from "react-spinners/BeatLoader";

function View() {
  const [data, setData] = useState([]);
  const [isClicked, setClick] = useState(false);
  const [read, setRead] = useState([{blog_id:'',email:'',blogcontent:''}]);
  const [isLoading,setLoading] = useState(true);

  async function handleDelete(id) {
    deleteData(id);
    refresh();
    setClick(false);
  }

  useEffect(() => {
    const fetchGallery = async () => {
          try {
            setLoading(true);
            getBlog().then((result)=>{
              setData(result);
              setLoading(false);
            })
            
          } catch (error) {
            console.error('Error fetching gallery:', error);
            setLoading(false);
          }
        };
        fetchGallery();
  }, []);

  function handleClose() {
    setClick(false);
  }

  async function refresh(){
    setLoading(true);
    getBlog().then((result)=>{
      setData(result);
    })
    setLoading(false);
  }

  const loaderStyle = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    left:"50%",
    position:"absolute",
  };

  function blogCards(b) {
    function ReadClick(id) {
      setClick(true);
      const inf = data.filter((x)=>{
        console.log(read);
        return x.blog_id==id;
      })
      setRead(inf);
    }

    return (
      <div className={`k card-div shadow-${b.blog_id % 5}`} style={{marginLeft:'20px'}} onClick={() => {
        ReadClick(b.blog_id);
      }}>
        {/* <BlogView content={b.blogcontent} /> */}
        <Blog imgpath={nature_image} id={b.blog_id} t={b.title} c={b.contents} />
        <button
          className="view-readMore"
          type="submit"
          onClick={() => {
            ReadClick(b.blog_id);
          }}
        >
          Read more....
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{display:isLoading ? "block" : "none"}}>
        <BeatLoader size="10px" color="#ffe6a9" speedMultiplier="0.7" cssOverride={loaderStyle} />
      </div>
      <div
        style={{ display: isClicked ? "none" : "block" }}
        className="See-div"
      >
        <h1 style={{ color: "#809D3C", padding: "20px" }}>My Blogs</h1>
        <div className="View-container">
          <div className="View-space">{data.map(blogCards)}</div>
        </div>
      </div>
      <div
        style={{ display: isClicked ? "block" : "none" }}
        className="Read-div"
      >
        <div className="close-div">
          <div className="viewDiv">
            <Link to={"/document/" + read[0].blog_id}>
              <button className="viewButton">Edit</button>
            </Link>

            <button
              className="viewButton"
              onClick={() => handleDelete(read[0].blog_id)}
            >
              Delete
            </button>
          </div>

          <button
            type="button"
            className="close-tab close"
            onClick={() => {
              handleClose();
            }}
          >
            <span aria-hidden="true" className="cancel">
              <svg xmlns="http://www.w3.org/2000/svg" stroke="black" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </span>
          </button>
        </div>
        
        <BlogView content={read[0].blogcontent} />
      </div>
    </div>
  );
}

export default View;
