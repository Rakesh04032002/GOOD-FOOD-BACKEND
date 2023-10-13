const express =require('express');
const app=express();
require("dotenv").config();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration
const Connection =require('./db.js');
const PORT=process.env.PORT_NO;
// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With,Content-Type,Accept"
//     );
//     next();
// })
app.get("/",function(req,res){
    res.send("hi guys");
});
app.use(express.json());
app.use("/api/",require("./Routes/CreateUser"));
app.use("/api/",require("./Routes/DisplayData"));
app.use("/api/",require("./Routes/OrderData"));
app.listen(PORT,function(){
    console.log(`server is running on ${PORT}`);
});
Connection();