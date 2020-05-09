
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require("cors");

var allproducts = require("./model/addnewprod.js");
var productAttribute = require("./model/productattributes.js");

var addnewprodroutes = require("./routes/addnewprodroutes.js");
var productattributesroutes = require("./routes/productattributes.js");

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use('/products',addnewprodroutes);
app.use('/products/productattribute',productattributesroutes);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected Database Successfully");
});

app.listen(9000,function(req,res){
    console.log("Server is started on port 9000");
})


