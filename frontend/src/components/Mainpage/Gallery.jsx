import React, { useState, useEffect } from "react";
import { getById , getlikes, getuserLikes, removeLike , addLike} from "../../../server.js";
import Read from "../ViewPage/Read.jsx";
import BeatLoader from "react-spinners/BeatLoader";
import dayjs from 'dayjs';  //libraries to format the date correctly
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import AOS from 'aos'; //Using AOS library for scroll animation for cards/div's.
import 'aos/dist/aos.css';

function Gallery() {
  const [data, setData] = useState([]);
  const [userLike,setUserlike] = useState([]);
  const [isClicked, setClicked] = useState(false);
  const [info, setInfo] = useState({title:"",contents:""});
  const [isLoading,setLoading] = useState(false);

  dayjs.extend(utc);//Enables UTC mode in Day.js. Allows to parse and format dates as Coordinated Universal Time (UTC).
  dayjs.extend(timezone);//Allows to convert dates to different time zones. Must be used with the utc plugin because the timezone plugin works based on UTC.

  useEffect(() => {
    getuserLikes().then((result)=>{
      setUserlike(result);
    })

    AOS.init({
        duration: 800, // Animation duration in milliseconds
        offset: 150   // Distance in pixels from the viewport when animation starts
      });

    const fetchGallery = async () => { 
      try {
        setLoading(true);
        getlikes().then(async (result)=>{
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
    setClicked(false);
  }
  
  async function refresh(){
    getlikes().then(async (result)=>{
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
  function handleClick(id) {
    setClicked(true);
    getById(id).then(async (result)=>{
      const blob = new Blob([new Uint8Array(result.image.data)], { type: "image/png" });
      result.imageUrl=URL.createObjectURL(blob);
      setInfo(result);
    });
  }
  const loaderStyle = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    left:"50%",
    position:"absolute",
  };
  
  function galleryCards(d) {
    function handleLike(id) {
      getuserLikes().then((result)=>{
        setUserlike(result);
      })
      refresh();
      const isLiked = userLike.some((x) => x.blog_id == id) ? true : false;
      if(isLiked){
          removeLike(id);
      }else if(!isLiked){
        addLike(id);
      }
      getuserLikes().then((result)=>{
        setUserlike(result);
      })
      refresh();
    }
    return (
      <div className="gallery-center" data-aos="fade-up" >
        <div className="gallery-div" onClick={() => {
        handleClick(d.blog_id);
      }}>
          <div className="galleryImg-div">
            <img className="gallery-img" src={d.imageUrl} />
          </div>
          <div className="gallery-content">
            <div className="gallery-title">{d.title}</div>
            <div className="gallery-con">{d.contents}</div>
            <div className="galleryReadMore-div">
              <button
                className="galleryReadMore-button"
                onClick={() => {
                  handleClick(d.blog_id);
                }}
              >
                Read more..
              </button>
            </div>
          </div>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',paddingLeft:'10px'}}>
        <div style={{fontSize:'small',display:'flex',alignItems:'center'}}>
          <i style={{height:'min-content'}}>Posted On: {dayjs.utc(d.created_date).tz('Asia/Kolkata').format('YYYY-MM-DD')}</i>
        </div>
        {/* {userLike} */}
        <span className="gallery-span">
          Likes &nbsp;
          <svg
            onClick={() => {
              handleLike(d.blog_id);
            }}
            className="gallery-svg"
            width="18"
            height="17"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Give path tag fill property so that the svg background chages */}
            <path
              d="M 50,15 C 35,-10 0,0 0,37 C 0,75 50,100 50,100 C 50,100 100,75 100,37 C 100,0 65,-10 50,15 Z"
              fill={userLike.some((x) => x.blog_id == d.blog_id) ? "red" : "none"} // it return true or false rather than filter which return empty array if no match found 
              stroke="red"
              stroke-width="7"
            />
          </svg>
          {d.count}
        </span>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      <div style={{display:isLoading ? "block" : "none"}}>
        <BeatLoader size="10px" color="#ffe6a9" speedMultiplier="0.7" cssOverride={loaderStyle} />
      </div>
      <div style={{ display: isClicked ? "none" : "flex" }} className="galleryCards-container">
        {data.map(galleryCards)}
      </div>
      <div
        style={{ display: isClicked ? "block" : "none" }}
        className="galleryRead-container"
      >
        <div className="galleryClose-div">
          <button
            type="button"
            className="gallery-close close"
            onClick={() => {
              handleClose();
            }}
          >
            <span aria-hidden="true" className="cancel">
              &times;
            </span>
          </button>
        </div>

        <div className="gallery-read">
          <Read title={info.title} content={info.contents} />
          <img src={info.imageUrl} className="galleryRead-img"/>
        </div>
      </div>
    </div>
  );
}

export default Gallery;
