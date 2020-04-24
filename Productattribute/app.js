var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var methodOverride = require("method-override");
var Productattribute = require("./models/productattributes.js");

app.use(methodOverride("_method"));

app.set("view engine","ejs");

//setting up bodyparser
app.use(bodyParser.urlencoded({extended:true}));

//setting up mongoose
mongoose.connect("mongodb://localhost/Products");

//home route
app.get("/",function(req,res){
    res.render("home");
});

//product attribute routes

//show
app.get("/productattribute",function(req,res){
    Productattribute.find({},function(err,prod){
        if(err){console.log(err);}
        else{
            res.render("index",{product:prod});
        }
    });
    
})
//create route
app.get("/productattribute/new",function(req,res){
    res.render("productattribute");
});

app.post("/productattribute/new",function(req,res){
    Productattribute.create(req.body.prodattr,function(err,newset){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/productattribute");
        }
    });
});


//edit route
app.get("/productattribute/:id/edit",function(req,res){
    Productattribute.findById(req.params.id,function(err,foundedprod){
        if(err){
            res.redirect("/productattribute");
        }
        else{
            res.render("edit",{product:foundedprod});
        }
    });
});

//update route
app.put("/productattribute/:id",function(req,res){
    Productattribute.findByIdAndUpdate(req.params.id,req.body.prod,function(err,updatedprod){
        if(err){
            res.redirect("/");
        }
        else{
            res.redirect("/productattribute");
        }
    });
});

//destroy route
app.delete("/productattribute/:id",function(req,res){
    //destroy blog
    Productattribute.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/");
        }
        else{
            //redirect somewhere
            res.redirect("/productattribute");
        }
    });
    
});


app.get("/productattribute/cancel",function(req,res){
    res.redirect("/");
});

//setting up server
app.listen(3000,function(req,res){
    console.log("The Server is started on port 3000");
});