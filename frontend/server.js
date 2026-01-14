export async function save(title, content,imgsrc) {
      //creating a new form data which stores data in multipart,allows swnding img,txt,videos
      const formData = new FormData();
      formData.append("image",imgsrc);
      //appending each data to formData
      formData.append("title",title);
      formData.append("content",content);
      const result=await fetch("http://localhost:3000/api/getdata",
        {
          method:"POST",
          body : formData, //Passing formData as it is and not JSON.stringify()
        })
}

export async function getBlog(content) {
      const result = await fetch('http://localhost:3000/api/getBlogdata')
      const responce = await result.json();
      console.log(responce);
      return responce;
}

export async function getData() {
  const response = await fetch('http://localhost:3000/api/getblog');
  const result = await response.json();
  return result;
}

export async function getAlldata(){
  const responce = await fetch('http://localhost:3000/api/getAllblog');
  const result  = await responce.json();
  return result;
}

export async function deleteData(id) {
  const formdata = new FormData();
    formdata.append("id",id);
    const result=await fetch('http://localhost:3000/api/delete',
    {
      method : 'POST',
      body : formdata,
    });
}

export async function getById(id) {
  const formdata = new FormData();
    formdata.append("id",id);
    const result=await fetch('http://localhost:3000/api/getByid',
    {
      method : 'POST',
      body : formdata,
    })
    const responce = result.json();
  return responce;
}

export async function getlikes(){
  const responce = await fetch("http://localhost:3000/api/getlike");
  const result = responce.json();
  return result;
} 

export async function getOrderedlikes(){
  const responce = await fetch("http://localhost:3000/api/getorderedlike");
  const result = responce.json();
  return result;
} 

export async function getuserLikes(){
  const responce = await fetch("http://localhost:3000/api/userLike");
  const result  = responce.json();
  return result;
}

export async function removeLike(id){
  const formdata = new FormData();
    formdata.append("id",id);
    const result=await fetch('http://localhost:3000/api/removeLike',
    {
      method : 'POST',
      body : formdata,
    })
}

export async function addLike(id){
    const formdata = new FormData();
    formdata.append("id",id);
    const result=await fetch('http://localhost:3000/api/addLike',
    {
      method : 'POST',
      body : formdata,
    })
}

export async function checklogin(email){
  const formdata = new FormData();
  formdata.append("email",email);
  const result=await fetch('http://localhost:3000/api/checklogin',
    {
      method : 'POST',
      body : formdata
    })
    const res = result.json();
  return res;
}

export async function getAuthenticate(email,password){
  const formdata = new FormData();
  formdata.append("email",email);
  formdata.append("password",password)
  const result=await fetch('http://localhost:3000/api/login',
    {
      method : 'POST',
      body : formdata
    })
    const res = result.json();
  return res;
}

export async function storeContact(name,email,message){
  const formdata=new FormData();
    formdata.append('name',name);
    formdata.append('email',email);
    formdata.append('message',message);

    const result = await fetch('http://localhost:3000/api/contact',{
      method:'POST',
      body:formdata,
    })
    const res = result.json();
    return res;
}

export async function getUser(){
  const responce = await fetch("http://localhost:3000/api/curruser");
  const result = responce.json();
  return result;
}