import React,{useEffect,useRef} from 'react';
import Quill from "quill";
import "quill/dist/quill.snow.css"; // use snow.css for full styling
import { getBlog } from '../../../server';

function BlogView(props){
    const viewRef = useRef(null);

    useEffect(()=>{
        const quill=new Quill(viewRef.current,{readOnly:true});
        console.log(props.content)
        quill.setContents(props.content)
        const images = viewRef.current.querySelectorAll('img');
            images.forEach((img) => {
                img.style.maxWidth = '100%'; 
                img.style.height = '300px';
                img.style.display = 'block';
                img.style.margin = '0 auto';
            });
    },[props.content])

    return(
        <div style={{width:'100%'}}>
            <div className="readBlog-container">
                <div ref={viewRef} className="ReadBlog-div" style={{minHeight:'500px',padding:'50px'}}></div>
            </div>
        </div>
    )
}

export default BlogView;