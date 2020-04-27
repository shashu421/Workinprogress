
//setting up dependencies
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var Tag = require("./model/addnewprod.js");
var Category = require("./model/addnewprod.js");
var Productattribute = require("./model/addnewprod.js");

var addnewprodroutes = require("./routes/addnewprodroutes.js");
var imageroutes = require("./routes/imageroutes.js");
var indexroutes = require("./routes/index.js");

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());

//setting up mongoose
mongoose.connect("mongodb://localhost/Products");

//requiring routes
app.use('/addnewproduct',addnewprodroutes);
app.use('/uploadPhoto',imageroutes);
app.use('/',indexroutes);

//Server is listening on port 3000
app.listen(3000,function(req,res){
    console.log("The Server has started!!");
});