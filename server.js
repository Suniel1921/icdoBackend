const express = require ("express");
const app = express();
const dotenv = require ("dotenv");
const dbConnection = require("./config/dbConn");
dotenv.config();
const authRoute = require ("./routes/authRoute");
const fileUpload = require("express-fileupload");
const fileUploadRoute = require ("./routes/fileUploadRoute");
const port = process.env.PORT || 5000;
const cors = require ('cors');


//middleware for file uplaod
app.use(fileUpload({useTempFiles: true, tempFileDir: './temp'}))

//middleware for cloudinary connection
const cloudinary = require ('./config/cloudinary');
cloudinary.cloudinaryConnect();



// Middleware for parsing JSON bodies
app.use(express.json());
app.use(cors());

//database connection
dbConnection();

//routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/upload", fileUploadRoute);


app.get("/", (req, res)=>{
    res.send("welcome to Ins Technology")
})


app.listen(port, ()=>{
    console.log(`Server is running on port no : ${port}`)
})

