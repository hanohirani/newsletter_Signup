// jshint esversion:6
 const express=require("express");
 const request=require("request");
 const bodyParser=require("body-parser");
 const app=express();
 const https=require("https");
const { response } = require("express");
const { dirname } = require("path");


 app.use(express.static("public"));
 app.use(bodyParser.urlencoded({extended : true }));



 app.get("/",function(req , res){
     res.sendFile(__dirname+"/singup.html");
 })


 app.post("/" , function(req , res){
     const first=req.body.first;
     const sec= req.body.secound;
     const email= req.body.email;
     const data = {
         members:[
        {
         email_address: email,
         status : "subscribed",
         merge_fields:{
             FNAME:first,
             LNAME:sec
         }
        }
     ]
     };
    const jsonData=JSON.stringify(data);
    const url = "https://us5.api.mailchimp.com/3.0/lists/fcf384c613";

    const options ={
        method :"POST",
        auth :"hana :f539f7b619a8c4ecee1cebd4f1e5463a-us5"
    }
    const request= https.request(url ,options , function(response){
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(--__dirname+"/failure.html")
        }
      response.on("data" , function(data){
      console.log(JSON.parse(data));
        })
       
    })
    
    request.write(jsonData);
    request.end();
    

 });

 app.post("/failure",function(req , res){
     res.redirect("/");
 })

 app.listen(process.env.PORT || 3000 , function(){
     console.log("this server is on port 3000")
 });

//  api key
 // apiKey: "f539f7b619a8c4ecee1cebd4f1e5463a-us5"  

// list id 
// fcf384c613

