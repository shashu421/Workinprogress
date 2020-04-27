var router = require('express').Router();
var Addnewprod = require("../model/addnewprod.js");
var mongoose = require("mongoose");


//configuring addnewproduct routes

router.get("/",function(req,res){
    res.render("addnewproduct.ejs");
});

router.post("/",function(req,res){
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

//setting up the cancel button

router.get("/cancel",function(req,res){
    res.redirect("/");
});

module.exports = router;