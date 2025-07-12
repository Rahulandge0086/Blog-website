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
  const [docu,setDocu]=useState([]);
  const [count,setCount] = useState(0);
  const [bold,setBold] = useState(false);

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
  

  // Textarea auto-grow
  // useEffect(() => {
  //   const allTextareas = document.querySelectorAll('textarea.auto-resize');
  //   allTextareas.forEach(autoResize);
  // }, [docu]);

  // const handleChange1 = (e, index) => {
  //   const updated = [...docu];
  //   updated[index] = e.target.value;
  //   setDocu(updated);
  //   autoResize(e.target);
  // };

  // const autoResize = (el) => {
  //   el.style.height = 'auto';
  //   el.style.height = el.scrollHeight + 'px';
  // };

  function addDocs(){
    setDocu(prevValue => [...prevValue, ""]);
  }
  const editorRef = useRef(null);

  const handleBoldClick = () => {
    const selection = window.getSelection();
    const editor = editorRef.current;

    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);

    // ✅ Make sure selection is within the editor only
    if (editor && editor.contains(range.commonAncestorContainer)) {
      const selectedText = selection.toString();

      if (selectedText.length === 0) return;

      if(!bold){
        // Replace selected text with <strong>wrapped text</strong>
        const strong = document.createElement('strong');
        strong.textContent = selectedText;

        const resetSpan = document.createElement('span');
        resetSpan.appendChild(document.createTextNode('\u200B')); // zero-width space

        range.deleteContents();
        range.insertNode(resetSpan);
        range.insertNode(strong);

        const newRange = document.createRange();
        newRange.setStartAfter(strong);
        newRange.collapse(true); // caret only (not selecting text)

        selection.removeAllRanges();
        selection.addRange(newRange);
        setBold(true);
      }else{
        const strong = document.createElement('span');
        strong.textContent = selectedText;

        const resetSpan = document.createElement('span');
        resetSpan.appendChild(document.createTextNode('\u200B')); // zero-width space

        range.deleteContents();
        range.insertNode(resetSpan);
        range.insertNode(strong);

        const newRange = document.createRange();
        newRange.setStartAfter(strong);
        newRange.collapse(true); // caret only (not selecting text)

        selection.removeAllRanges();
        selection.addRange(newRange);
        setBold(false);
      }
      
    }
    // editorRef.current.focus();
    // document.execCommand('bold');
  };

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

      {/* <div className="submit-button">
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
      </div> */}
      <div class="toolbar-container">
        <div class="toolbar">
          <button id="add-component" onClick={addDocs}>+</button>
          <div id="size-tool">
            <p style={{margin:0}}>A</p>
            <div class="inc-dec-but">
              <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 11L9.5 6L5 11" stroke="rgb(65, 65, 65)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
              <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 6L9.5 11L14 6" stroke="rgb(65, 65, 65)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <div id="font-tool">
            <p style={{margin:0}}>Fonts</p>
            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 6L9.5 11L14 6" stroke="rgb(65, 65, 65)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div id="textColor-tool">
            <p style={{margin:0}}>A</p>
            <div class="color-view"></div>
          </div>
          <button onClick={handleBoldClick}>B</button>
          <button>U</button>
          <button style={{fontFamily:"Italic"}}><i>I</i></button>
          <div class="list">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 6H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 12H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 18H21" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 6H3.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 12H3.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 18H3.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <button id="save-button">Save</button>
      </div>

      <div class="doc-container">
          <div class="doc">
          {docu.map((item, index) => (
              <div className="write-textbox" ref={editorRef} contentEditable suppressContentEditableWarning></div>
              // <textarea key={index} value={item} className="auto-resize write-textbox" onChange={(e) => handleChange1(e, index)}
              // rows={1}></textarea>
            ))}
          </div>
      </div>
    </div>
  );
}

export default Create;
