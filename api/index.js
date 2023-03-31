import  express  from "express";
const app = express()
import userRoutes from "./routes/usersR.js"
import postRoutes from "./routes/postsR.js"
import commentRoutes from "./routes/commentsR.js"
import relationshipRoutes from "./routes/relationshipR.js"
import likeRoutes from "./routes/likesR.js"
import authRoutes from "./routes/authR.js"
import searchRoutes from "./routes/searchR.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";

//middlewares
app.use((req,res,next)=>{
    res.header("Access-control-Allow-Credentials", true)
    next()
});
app.use(express.json())
app.use(
    cors({
        origin:["http://localhost:3000","https://client-host-ixw7.onrender.com"]
    })
);
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
  })
  
  const upload = multer({ storage: storage })

  app.post("/api/upload", upload.single("file"),(req,res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  })

app.use('/api/users',userRoutes);
app.use('/api/posts',postRoutes);
app.use('/api/comments',commentRoutes);
app.use('/api/likes',likeRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/relationship',relationshipRoutes);
app.use('/search',searchRoutes);

app.listen(8800, ()=>{
    console.log('working');
});