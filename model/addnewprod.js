var mongoose = require("mongoose");

//catschema
var catSchema = new mongoose.Schema({
    Name:String,
    parentCategory:String,
    Description:String,
    defaultType:String
});

//tagschema
var tagSchema = new mongoose.Schema({
    Name:String,
    Description:String,
    parentTag:String
});

//creating main schema
var addnewprodSchema = new mongoose.Schema({
   productName:{
       type:String,
       required:true
   },
   category:[catSchema],
   Price:{
       type:Number,
       required:true
   },
   disPrice:Number,
   metaDescription:String,
   Tags:[tagSchema],
   productDescription:String,
   Image:{
       type:String,
       required:true
   }
});
//create model
module.exports = mongoose.model("Addnewprod",addnewprodSchema);