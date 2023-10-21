const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const { dir } = require("console");

const app=express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));

app.listen("3000",function(){
    console.log("server has started on port 3000");
})

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fileds:{
                    FNAME:firstname,
                    LNAME:lastname
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us13.api.mailchimp.com/3.0/lists/13ba1796ca";

    const options={
        method:"POST",
        auth:"yogendra:aaf214f76408aefd7705858992b0686e-us13"
    }

 const request=https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

    response.on("data",function(data){
        console.log(JSON.parse(data));
    })


 })

 request.write(jsonData);
 request.end();


})

app.post("/failure",function(req,res){
    res.redirect("/");
})

//api key
//aaf214f76408aefd7705858992b0686e-us13

//list id
//13ba1796ca