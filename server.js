const express=require("express");
const dotenv=require("dotenv");
const morgan=require("morgan");
const bodyparser=require("body-parser")
const path=require("path")
const upload=require('express-fileupload')

const connectDB=require('./server/database/connection')

const app=express();


dotenv.config({path:'config.env'})
const port=process.env.PORT;

//log requests
app.use(morgan('tiny'))

//MongoDB connection

connectDB();

//parse requests to body parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))


//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')))
app.use('/img',express.static(path.resolve(__dirname,'assets/img')))
app.use('/js',express.static(path.resolve(__dirname,'assets/js')))

app.use('/',require('./server/routes/router'))

app.use(upload());

app.listen(port,()=>{
    console.log(`Listening to http://localhost:${port}`);
})