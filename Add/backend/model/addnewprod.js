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

//product attribute
var productattributeschema = new mongoose.Schema({
    Name:{
        type:String
    },
    Variation:{
        type:String
    }
});

//creating main schema
var addnewprodSchema = new mongoose.Schema({
   productName:{
       type:String,
       required:true
   },
   category:{
       type:String,
       required:true
   },
   Price:{
       type:Number,
       required:true
   },
   disPrice:Number,
   metaDescription:String,
   Tags:{
       type:Array,
       required:true
   },
   productAttribute:{
        type:Array,
        required:true
   },
   productDescription:String,
   Image:{
       type:String,
   }
});
//create model
module.exports = mongoose.model("Addnewprod",addnewprodSchema);
module.exports = mongoose.model("Tag",tagSchema);
module.exports = mongoose.model("Category",catSchema);
module.exports = mongoose.model("Productattribute",productattributeschema);