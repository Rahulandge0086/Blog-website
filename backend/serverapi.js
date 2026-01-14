import express from "express";
import cors from "cors";
import pg from "pg";
import bodyParser from "body-parser";
import multer from "multer";
import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import env from "dotenv";

const app=express();
const port = 3000;
const saltRounds = parseInt(process.env.SALT_ROUNDS, 10); //The 10 is the base used by parseInt() to interpret the number(base 10).
env.config(); //To configure env file

app.use(cors({origin: "http://localhost:5173", 
  credentials: true,})); // browser blocks the requests because of (Cross-Origin Resource Sharing) policies to handle this issue we used/allowed cors here 
let currUser;

app.use(
  session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized: true,
    cookie: {
      secure: false, 
      maxAge: 1000 * 60 * 60 * 24, // Cookie expiration time (1 day)
      httpOnly: true, //Makes the cookie inaccessible to JavaScript
      sameSite: 'strict', // Ensures the cookie is only sent with requests to the same origin
    },
  }))

// use multer for handling the files sent from the frontend it processess multipart/form-data
const upload = multer({
  storage: multer.memoryStorage(),     //creating  multer storage
  limits: { fileSize: 50 * 1024 * 1024 },   //By default size is very less we need to manually increase the size to store in express.
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '20mb' }));  

app.use(passport.initialize());
app.use(passport.session());

const db= new pg.Client({
  user : process.env.PG_USER,
  host : process.env.PG_HOST,
  database : process.env.PG_DATABASE,
  password :process.env.PG_PASSWORD,
  port : process.env.PG_PORT
})
db.connect();

passport.use(
  new LocalStrategy (async function verify(username, password, cb){
    try{
      const result = await db.query("SELECT * FROM users WHERE email=$1",[username]);
      if(result.rows.length>0){
        const user = result.rows[0];
        const storedHashPassword = user.password;
        bcrypt.compare(password,storedHashPassword,(err,valid)=>{
          if(err){
            console.error("Error comparing passwords:", err);
            return cb(err);
          }else{
            if(valid){
              //Passed password check
              return cb(null,user);
            }else{
              //Did not pass password check
              return cb(null,false);
            }
          }
        })
      }else{
        return cb(null, false, { message: "User not found" });
      }
    }catch(err){
      console.log(err);
    }
  })
)

app.get('/',(req,res)=>{
  res.send("Welcome to express server.");
});

app.post('/login',upload.none(),passport.authenticate("local"),(req,res)=>{ 
  currUser=req.user.email;
  res.json({ message: "Logged in successfully", user: req.user });
});

app.post('/register',upload.none(),async(req,res)=>{
  try{
    const {username,password,name} = {...req.body};
    const result = await db.query("SELECT * FROM users WHERE email=$1",[username]);
    if(result.rows==0){
      bcrypt.hash(password,saltRounds,async(err, hash)=>{
      if(err){
        console.error("Error hashing password:", err);
      }else{
        await db.query("INSERT INTO users(email,password,name) VALUES ($1,$2,$3)",[username,hash,name])
        res.send(true);
      }
    })
    }else{
      res.send(false);
    }
  }catch(err){
    res.send(false);
    console.log(err);
  }
})

app.get('/auth/status',(req,res)=>{
  if(req.isAuthenticated()){ //isAuthenticated is given by passport library checks if user logged or not, ispredefined and checks for seesion if already exists.
    res.json({ isAuthenticated: true, user: req.user });
  }else{
    res.json({ isAuthenticated: false });
  }
})

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out" });
  });
});

app.post('/api/Savedata',async (req,res)=>{
  const {type,content} ={...req.body};
  console.log(content);
  await db.query("INSERT INTO nblog(email,blogcontent) VALUES($1,$2)",[currUser,content]);
  res.json({message:"Saved"});
});

app.get('/api/getBlogdata',async (req,res)=>{
  const responce=await db.query("SELECT * FROM nblog WHERE email=$1" ,[currUser]);
  res.json(responce.rows);
})

app.post('/api/getdata',upload.single("image"),async (req,res)=>{
    const {title,content}={...req.body}; //destructuring body
      const img = req.file.buffer;
     //It stores the binary data (the sent imagedata comes in req.file)
      await db.query("INSERT INTO blog(email,title,contents,image) VALUES($1,$2,$3,$4)",[currUser,title,content,img]);
    res.json({message:"Saved"});
})

app.get('/api/getblog',async (req,res)=>{
  const responce=await db.query("SELECT * FROM blog WHERE email=$1",[currUser]);
  res.json(responce.rows);
})

app.get('/api/getAllblog',async (req,res)=>{
  const responce=await db.query("SELECT * FROM blog");
  res.json(responce.rows);
})

//upload none is important here because it tells multer to process only text fields from a multipart/form-data request, but not files.
app.post('/api/delete', upload.none(),async(req,res)=>{
  let id = req.body.id;
  id=Number(id);
  await db.query("DELETE FROM nblog WHERE blog_id=$1",[id]);
  res.send("Deleted");
});

app.post('/api/getByid', upload.none(),async(req,res)=>{
    let id = req.body.id;
    id=Number(id);
    const responce = await db.query("SELECT * from nblog WHERE blog_id=$1",[id]);
    res.send(responce.rows[0]);
})

app.get('/api/getlike',async(req,res)=>{
  const responce=await db.query("SELECT b.blog_id, b.title, b.contents,b.image,b.created_at::DATE AS created_date, COUNT(DISTINCT l.like_id) AS count FROM blog b LEFT JOIN likes l ON b.blog_id = l.blog_id GROUP BY b.blog_id, b.title, b.contents");
  res.send(responce.rows);
})

app.get('/api/getorderedlike',async(req,res)=>{
  const responce=await db.query("SELECT b.blog_id, b.title, b.contents,b.image,b.created_at::DATE AS created_date, COUNT(DISTINCT l.like_id) AS count FROM blog b LEFT JOIN likes l ON b.blog_id = l.blog_id GROUP BY b.blog_id, b.title, b.contents ORDER BY count DESC");
  res.send(responce.rows);
})

app.get('/api/userLike',async (req,res)=>{
  const responce = await db.query("SELECT blog_id FROM likes WHERE email=$1",[currUser]);
  res.send(responce.rows);
})

app.post('/api/removeLike',upload.none(),async(req,res)=>{
  let id = req.body.id;
  id=Number(id);
  await db.query("DELETE FROM likes WHERE email=$1 and blog_id=$2",[currUser,id]);
  res.send("Deleted");
})

app.post('/api/addLike',upload.none(),async(req,res)=>{
  let id = req.body.id;
  id=Number(id);
  await db.query("INSERT INTO likes(email,blog_id) VALUES ($1,$2)",[currUser,id]);
  res.send("added");
})

app.post('/api/contact',upload.none(),async(req,res)=>{
  try{
    const {name,email,message}={...req.body};
    await db.query("INSERT INTO contacts(name,email,message) VALUES ($1,$2,$3)",[name,email,message]);
    res.send(true);
  }
  catch(err){
    res.send(false);
    console.log(err);
  }
})

app.get('/api/curruser',(req,res)=>{
  res.json({user:currUser});
})

passport.serializeUser((user, cb) => {
  // console.log('Serialize User:', user);
  cb(null, user.email); // Store email in session
});

passport.deserializeUser(async (email, cb) => {
  // console.log('Deserialize User, email:', email);
  const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
  cb(null, result.rows[0]); // Retrieving user info based on email
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});