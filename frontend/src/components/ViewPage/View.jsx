import React, { useState, useEffect } from "react";
import { getData, deleteData} from "../../../server.js";
import Blog from "./Blog.jsx";
import Read from "./Read.jsx";
import {Link} from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

function View() {
  const [data, setData] = useState([]);
  const [isClicked, setClick] = useState(false);
  const [read, setRead] = useState([{ title: "", contents: "" }]);
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
            getData().then(async (result)=>{
              const updatedData = await Promise.all(
              result.map(async (item) => {
                const blob = new Blob([new Uint8Array(item.image.data)], { type: "image/png" });
                return {
                  ...item,
                  imageUrl: URL.createObjectURL(blob), // Store object URL in each item
                };
              })
            );
            setData(updatedData);
            setLoading(false);
            })
            
          } catch (error) {
            console.error('Error fetching gallery:', error);
          }
        };
    
        fetchGallery();
  }, []);

  function handleClose() {
    setClick(false);
  }

  async function refresh(){
    setLoading(true);
    getData().then(async (result)=>{
      const updatedData = await Promise.all(
      result.map(async (item) => {
        const blob = new Blob([new Uint8Array(item.image.data)], { type: "image/png" });
        return {
          ...item,
          imageUrl: URL.createObjectURL(blob), // Store object URL in each item
        };
      })
    );
    setData(updatedData);
    setLoading(false);
    })
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
        return x.blog_id==id;
      })
      setRead(inf);
    }

    return (
      <div className="k" onClick={() => {
        ReadClick(b.blog_id);
      }}>
        <Blog imgpath={b.imageUrl} id={b.blog_id} t={b.title} c={b.contents} />
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
            <Link to={"/create/" + read[0].blog_id}>
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
              &times;
            </span>
          </button>
        </div>
        <div className="pageContainer">
          <div className="content-page">
            <Read title={read[0].title} content={read[0].contents} />
          </div>
          <img src={read[0].imageUrl} style={{width:'300px',height:'200px'}}/>
        </div>
      </div>
    </div>
  );
}

export default View;
