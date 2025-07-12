import React, { useEffect, useRef ,useState} from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // use snow.css for full styling
import { useParams } from "react-router-dom";
import { getById,deleteData } from "../../../server";

function Document() {
  const {id} = useParams();
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [inSize,setSize] = useState(true);
  const [inOrder,setOrder] = useState(false);
  const [isClicked, setClicked] = useState(false);
  const [isClicked1, setClicked1] = useState(false);
  
  useEffect(() => {
    if(id){
      getById(id).then((result)=>{
        quillRef.current.setContents(result.blogcontent);
      })
    }
    if(window.innerWidth <= '560'){
        setSize(false);
    }
    if(window.innerWidth >= '560'){
        setSize(true);
        setOrder(false);
    }
    function handleResize(){
      if(window.innerWidth <= '560'){
        setSize(false);
      }
      if(window.innerWidth >= '560'){
        setSize(true);
        setOrder(false);
      }
    }
    window.addEventListener('resize',handleResize)
    if (editorRef.current) {
      // const toolbarOptions = [
      //   [{ 'header': [1, 2, 3, false] }],
      //   [{'size':['huge',false,'small']}],
      //   [{ 'align': [] }],
      //   ['bold', 'italic', 'underline'],        
      //   [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      //   ['link', 'image'],
      //   ['blockquote'],

      //   [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      //   ['clean']                                         // remove formatting button
      // ];

      const options = {
        debug: 'false',
        modules: {
          toolbar: '#custom-toolbar',
        },
        theme: 'snow'
      };
      
      quillRef.current=new Quill(editorRef.current, options);
          
      quillRef.current.on('text-change', () => {
        const images = editorRef.current.querySelectorAll('img');
        images.forEach((img) => {
          img.style.maxWidth = '100%'; 
          img.style.height = 'max-content';
          img.style.display = 'block';
          img.style.margin = '0 auto';
        });
      });
    } 
  }, []);

  async function handleSave (){
    const delta = quillRef.current.getContents();
    const isEmpty = delta.ops.length === 1 && delta.ops[0].insert === '\n';

    if(!isEmpty){
      await fetch("http://localhost:3000/api/Savedata",
      {
        method:"POST",
        headers: {
          'Content-Type': 'application/json' 
        },
        body : JSON.stringify({
          type:'delta',
          content:delta,
        }),
      })
      if(id){
        deleteData(id);
      }
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
      }, 2000);
      quillRef.current.setContents();
    }else{
      setClicked1(true);
      setTimeout(()=>{
        setClicked1(false);
      },2000);
    }
    
  }

  function handleMessage() {
    setClicked(false);
  }

  function handleMessage1() {
    setClicked1(false);
  }

  function handleShow(){
    if(inOrder){
      setOrder(false);
    }else{
      setOrder(true);
    }
  }

  return(
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
        
        <div className="message-container">
          <div
            className="message"
            style={{ display: isClicked1 ? "block" : "none"}}
          >
            Please Write Something...
            <button
              type="button"
              className="close-message close"
              onClick={() => {
                handleMessage1();
              }}
            >
              <span aria-hidden="true" className="cancel-message">
                &times;
              </span>
            </button>
          </div>
        </div> 
        <div className="toolbar-container">
          <div id="custom-toolbar" className="toolbar" style={{border:'none'}}>
            <select className="ql-header ql-but" defaultValue="">
              <option value="1" />
              <option value="2" />
              <option value="3" />
              <option value="" />
            </select>
            <select className="ql-size ql-but" defaultValue="">
              <option value="huge" />
              <option value="large" />
              <option value="small" />
              <option value="" />
            </select>
            <div style={{display:inSize?'none':'block'}} onClick={handleShow}>
              <svg style={{cursor:'pointer'}}xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
              </svg>
            </div>
            <div style={{flexWrap:'wrap',gap:'15px',zIndex:'10',display:inSize || inOrder?'flex':'none',position:!inSize || inOrder? 'absolute':'unset',top:!inSize || inOrder? '145px':'0px',width:!inSize || inOrder? '90%':'',backgroundColor:!inSize || inOrder? 'rgb(233 243 254)':'',padding:!inSize || inOrder? '2px':'',border:!inSize || inOrder? '1px solid rgb(177, 202, 220)':''}}>
              <button className="ql-bold" />
              <button className="ql-italic" />
              <button className="ql-underline" />
              <select className="ql-color" />
              <select className="ql-background ql-but" />
              <button className="ql-image ql-but" />
              <button className="ql-link" style={{borderRight:'2px solid rgb(189, 189, 189)',borderRadius:'0px'}}/>
              <select className="ql-align" defaultValue="">
                <option value="" />
                <option value="center" />
                <option value="right" />
                <option value="justify" />
              </select>
              <button className="ql-list" value="ordered"/>
              <button className="ql-list" value="bullet"/>
              <button className="ql-blockquote"/>
              <button className="ql-clean" />
            </div> 
          </div>
          <button style={{display:'inline'}} className="saveButton" onClick={handleSave}>Save</button>
        </div>   
      <div className="editor-container">     
        <div className="editor-div">
          <div ref={editorRef} style={{minHeight:'700px',height:'auto'}} className="edit-container" />
        </div>
      </div>
    </div>
    
  )
}

export default Document;

