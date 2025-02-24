import React, { useState, useEffect, useRef} from "react";
import { useParams } from "react-router-dom";
import { save, getById, deleteData } from "../../../server.js";
import Button from "../Button.jsx";
import logo_img from "../../images/JLogo4.png";

function Create(){
  const { id } = useParams();
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgsrc, setImgsrc] = useState(null);
  const [imgPath,setImgpath]=useState(null);
  const [isupload,setUpload]=useState(false);
  const [isClicked, setClicked] = useState(false);

  function handleInput(event) {
    setTitle(event.target.value);
  }

  function handleChange(event) {
    const img = event.target.files[0];
    setImgsrc(img);
  }

  function handleText(event) {
    setContent(event.target.value);
  }

  async function defaultInput(){
    const response = await fetch(logo_img);
    const blob = await response.blob();
    const file = new File([blob], "logo.png", { type: blob.type });
    setImgsrc(file);
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    // Assigning the files to input
    if (fileInputRef.current) {
    fileInputRef.current.files = dataTransfer.files;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (title != "" && content != "" && imgsrc != null) {
      setClicked(true);
      save(title, content,imgsrc);
      fileInputRef.current.value = "";
      setImgsrc(null);
      setUpload(false);
      setTimeout(() => {
        setClicked(false);
      }, 2000);
      setTitle("");
      setContent("");
      defaultInput();
    }
    if (id) {
      deleteData(id);
    }
  }
  function handleMessage() {
    setClicked(false);
  }

  function handleUpload(event){
    event.preventDefault();
    const reader = new FileReader();
    reader.readAsDataURL(imgsrc);
    reader.onloadend = () =>{
      setImgpath(reader.result);
    }
    setUpload(true);
  }
  
  useEffect(() => {
    if (id) {
      getById(id).then((result)=>{
        setTitle(result.title);
        setContent(result.contents);
        // The File constructor expects a Blob or an ArrayBuffer, but the result.image.data is a Uint8Array, it needs to be converted properly.
        // Converting result.image.data to a Blob first
        const blob = new Blob([new Uint8Array(result.image.data)], { type: "image/png" });
        const file = new File([blob], "image.png", { type: "image/png" });
        setImgsrc(file);
      // Used DataTransfer to set file input
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);

      // Assigning the files to input
      if (fileInputRef.current) {
        fileInputRef.current.files = dataTransfer.files;
      }
        })
      }
      else{
        defaultInput();
      }
  }, []); 

  return (
    <div>
      <div className="message-container">
        <div
          className="message"
          style={{ display: isClicked ? "block" : "none"}}
        >
          Saved Successfully
          <button
            type="button"
            className="close-message close"
            onClick={() => {
              handleMessage();
            }}
          >
            <span aria-hidden="true" className="cancel-message">
              &times;
            </span>
          </button>
        </div>
      </div>

      <div className="submit-button">
        <Button
          class="saveButton"
          type="submit"
          text="Save"
          onClick={(event) => handleSubmit(event)}
        />
      </div>
      <div className="card-container3">
        <div className="create-title">
          <div className="create-input">
            <textarea
              className="inputBox"
              type="text"
              placeholder="Enter Title"
              onChange={handleInput}
              value={title}
            />
            <div className="image-div">
              Upload Image* (Default logo will be added.)
              <input
                type="file"
                className="image-input"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleChange}
              ></input>
              <Button class="upload-button" type="submit" text="upload" onClick={handleUpload}/>
            </div>
            <div>
              <img style={{height:"150px",width:"200px",display: isupload ? "block": "none"}} src={imgPath}/>
            </div>
          </div>
        </div>

        <div className="create-content">
          <textarea
            className="textBox"
            type="text"
            placeholder="Start Blog"
            onChange={handleText}
            value={content}
          />
        </div>
      </div>
    </div>
  );
}

export default Create;
