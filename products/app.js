
var express = require("express");
var app = express();
var mongoose = require("mongoose");
var cors = require("cors");
var Addnewprod = require("./model/addnewprod.js");

var addnewprodroutes = require("./routes/addnewprodroutes.js");

require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use('/products',addnewprodroutes);

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connected Database Successfully");
});

app.listen(4000,function(){
    console.log("Server has started on port 4000");
});



