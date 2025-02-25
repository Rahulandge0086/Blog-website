import React, { useState, useEffect} from "react";
import Card from "./cards.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from "react-bootstrap";
import { getOrderedlikes} from "../../../server.js";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import viewBlog_img from "../../images/Screenshot 2025-02-25 192001.png";
import create_blogimg from "../../images/pixelcut-export.png";
import AOS from 'aos'; //Using AOS library for scroll animation for cards/div's.
import 'aos/dist/aos.css';

function GalleryCard() {
  const [data, setData] = useState([]);
  const [isLoading,setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
            duration: 1000, // Animation duration in milliseconds
            offset: 150   // Distance in pixels from the viewport when animation starts
          });
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
        <b>Welcome To usblog</b>
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
      <div>
        <div className='galleryICreate-div' data-aos="fade-up" >
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}}>
            <p style={{fontSize:"3rem"}}><b>View All blogs</b></p>
            {/* <p>You can easily view all the blogs written by all the authors in the <b><u>see more</u></b> section</p> */}
          </div>
          <div className="galleryIimgCreate">
            <img src={viewBlog_img} className="galleryICreate-img"/>
          </div>
        </div>
        <div className='galleryICreate-div1' data-aos="fade-up" >
          <div className="galleryIimgCreate1">
            <img src={create_blogimg} className="galleryICreate-img"/>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',width:'500px',padding:'5px'}}>
            <p style={{fontSize:"3rem"}}><b>Create Blogs Easily</b></p>
            <p>You can easily view all the blogs written by all the authors in the <b><u>see more</u></b> section</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;
