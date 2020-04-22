//setting up dependencies
var express = require("express");
var app = express();

var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");
var multer = require("multer");

var Addnewprod = require("./model/addnewprod.js");
//setting up bodyparser
app.use(bodyParser.urlencoded({extended:true}));

//setting up mongoose
mongoose.connect("mongodb://localhost/imageupload");

var imageschema = new mongoose.Schema({
    image:String
});

var Image = mongoose.model("Image",imageschema);

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


//configuring the home route

app.get("/",function(req,res){
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

//Server is listening on port 3000

app.listen(3000,function(req,res){
    console.log("The Server has started!!");
});