//configure the home route
var router = require('express').Router();

router.get("/",function(req,res){
    res.render("home.ejs");
});

module.exports=router;
