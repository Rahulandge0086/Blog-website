import React, { useState, useEffect} from "react";
import Card from "./cards.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Carousel } from "react-bootstrap";
import { getOrderedlikes} from "../../../server.js";
import { Link } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import viewBlog_img from "../../images/Screenshot 2025-02-25 192001.png";
import create_blogimg from "../../images/pixelcut-export.png";
import animate_video from "../../assets/Timeline 3.mp4";
import AOS from 'aos'; //Using AOS library for scroll animation for cards/div's.
import 'aos/dist/aos.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

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
        <Card imgpath={b.imageUrl} title={b.title} content={b.contents} />
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
      <div>
        <video
          autoPlay
          muted
          playsInline
          width="600"
          style={{ display: 'block' }}
        >
          <source
            src={animate_video}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      <div style={{display:isLoading ? "block" : "none"}}>
        <BeatLoader size="10px" color="#ffe6a9" speedMultiplier="0.7" cssOverride={loaderStyle} />
      </div>
      <div class="main-heading">
          <p className="p-head"><b>Welcome To <br/>USblog</b></p>
          <div className="main-diag"><svg width="600" height="300" viewBox="0 0 582 286" fill="red" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.8" d="M86.5148 64.9209C372.147 -7.9508 793.504 203.009 456.175 108.987C118.846 14.9649 427.755 347.394 445.168 201.318C462.582 55.2418 -187.41 490.001 75.5083 157.252C338.427 -175.497 -199.118 137.793 86.5148 64.9209Z" fill="#FCB859"/>
            </svg>
          </div>
      </div>
      
      <div class="heading-carousel">
        <p>Find The creative Blogs Here</p>
      </div>
      <div className="card-container">
        {/* <div className="see-text">
          <h1>See Some of the popular Blogs.</h1>
          <Link to="/gallery" style={{ color: "rgb(59, 59, 59)",textDecoration:'none',fontSize:'1.5rem'}}>
            See more...
          </Link>
        </div> */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={3}            // Show 3 boxes at once
          // centeredSlides={false}
          navigation={true} // for arrow support
          breakpoints={{
            0: {
              spaceBetween: 50,
              slidesPerView : 1,
            },
            560:{
              spaceBetween: 0,
              slidesPerView : 2
            },
            800: {
              spaceBetween: 50,
              slidesPerView : 3 
            },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          style={{padding:"50px"}}
          className="mySwiper"
          >
              {data.map((item, index) => (
              <SwiperSlide key={index} >
                <div style={{marginLeft:'20px'}}>
                  {create(item)}
                </div>
              </SwiperSlide>
              ))}
        </Swiper>
      </div>
      <div>
        <div className='galleryICreate-div1' data-aos="fade-up" >
           <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',width:'500px',padding:'5px'}}>
            <p style={{fontSize:"3rem"}}><b>View All categories of Blogs</b></p>
          </div>  
          <div className="galleryIimgCreate style">
            <img src="" className="galleryICreate-img"/>
          </div>
        </div>
        <div className='galleryICreate-div1' style={{flexWrap:'wrap-reverse'}} data-aos="fade-up" >
          <div className="galleryIimgCreate style1">
            <img src="" className="galleryICreate-img"/>
          </div>
          <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',width:'500px',padding:'5px'}}>
            <p style={{fontSize:"3rem"}}><b>Edit Blogs as per your interest</b></p>
          </div>          
        </div>
        <div className='galleryICreate-div1' data-aos="fade-up" >
           <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap',width:'500px',padding:'5px'}}>
            <p style={{fontSize:"3rem"}}><b>View All categories of Blogs</b></p>
          </div>  
          <div className="galleryIimgCreate style3">
            <img src="" className="galleryICreate-img"/>
          </div>
        </div>
      </div>
      <div className="Testimonials">
              <div class="testimonial-contain"></div>
      </div>
    </div>
  );
}

export default GalleryCard;
