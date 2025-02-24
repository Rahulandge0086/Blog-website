import React, { useState, useEffect} from "react";
import Card from "./cards.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import { getOrderedlikes} from "../../../server.js";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

function GalleryCard() {
  const [data, setData] = useState([]);
  const [isLoading,setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
          try {
            setLoading(true);
            getOrderedlikes().then(async (result)=>{
              const updatedData = await Promise.all(
              result.map(async (item) => {
                const blob = new Blob([new Uint8Array(item.image.data)], { type: "image/png" });
                return {
                  ...item,
                  imageUrl: URL.createObjectURL(blob), // Store object URL in each item
                };
              })
            );
            const updatedD=updatedData.slice(0,5);
            setData(updatedD);
            setLoading(false);
            })
          } catch (error) {
            console.error('Error fetching gallery:', error);
          }
        };
    
      fetchGallery();
  }, []);

  function create(b) {
    return (
      <Carousel.Item>
        <Card imgpath={b.imageUrl} title={b.title} content={b.contents} />
      </Carousel.Item>
    );
  }

  const loaderStyle = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    left:"50%",
    position:"absolute",
  };
  
  return (
    <div>
      <div style={{display:isLoading ? "block" : "none"}}>
        <BeatLoader size="10px" color="#ffe6a9" speedMultiplier="0.7" cssOverride={loaderStyle} />
      </div>
      <h1 style={{ padding: "20px", fontSize: "4rem", color: "#FFE6A9" }}>
        Welcome To usblog
      </h1>
      <div className="card-container">
        <div>
          <h1>See Some of the popular Blogs.</h1>
          <Link to="/gallery" style={{ color: "white" }}>
            See more...
          </Link>

        </div>

        <Carousel className="carousel coursel">{data.map(create)}</Carousel>
      </div>
    </div>
  );
}

export default GalleryCard;
