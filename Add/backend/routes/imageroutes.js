
var router = require('express').Router();
var Image = require("../model/images.js");
var mongoose = require("mongoose");
var path = require("path");
var fs = require("fs");
var multer = require("multer");

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

//configuring the image route

router.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});


router.post("/",upload.single("myImage"),function(req,res,next){
    
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


module.exports = router;