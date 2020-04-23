//setting up dependencies
var express = require("express");
var app = express();

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var multer = require("multer");

var Addnewprod = require("./model/addnewprod.js");
var Image = require("./model/images.js");

//setting ejs
app.set("view engine","ejs");

//setting up bodyparser
app.use(bodyParser.urlencoded({extended:true}));

//setting up mongoose
mongoose.connect("mongodb://localhost/Products");

//Initializing multer constraints
var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage:storage
});

//configure the home route

app.get("/",function(req,res){
    res.render("home");
});

//configuring addnewproduct routes

app.get("/addnewproduct",function(req,res){
    res.render("addnewproduct");
});

app.post("/addnewproduct",function(req,res){
    Addnewprod.create(req.body.prod,function(err,createdproduct){
        if(err){
            console.log(err);
        }
        else{
            console.log(createdproduct);
            res.redirect("/addnewproduct");
        }
    })
});
//configuring the image route

app.get("/uploadphoto",function(req,res){
    res.sendFile(__dirname + '/index.html');
});


app.post("/uploadPhoto",upload.single("myImage"),function(req,res,next){
    
    var image = fs.readFileSync(req.file.path);
    var encode_image =  image.toString('base64');

    //define a JSON Object for the image

    var finalImg = {
        contentType:req.file.mimetype,
        path:req.file.path,
        image:new Buffer(encode_image,'base64')
    };

    //insert the image to database

    Image.create(finalImg,(err,result) => {
        if(err){
            console.log(err);
        }
        else{
            console.log("Saved to databse!");
        }
        
        res.contentType(finalImg.contentType);
        res.send(finalImg.image);
    });
});

//setting up the cancel button

app.get("/addnewproduct/cancel",function(req,res){
    res.redirect("/");
});

//Server is listening on port 3000

app.listen(3000,function(req,res){
    console.log("The Server has started!!");
});
