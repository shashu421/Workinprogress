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
    Productname:{
        type:String
    },
    Category:{
        type:String
    },
    Price:{
        type:Number
    },
    Disprice:{
        type:Number
    },
    Metadescription:{
        type:String
    },
    Tags:{
        type:Array
    },
    Productattribute:{
         type:Array
    },
    Productdescription:{
        type:String 
    },
    Image:{
        type:String
    }
});

//creating main schema
// var addnewprodschema = new mongoose.Schema({
//    Productname:{
//        type:String
//    },
//    Category:{
//        type:String,
//    },
//    Price:{
//        type:Number,
//    },
//    Disprice:{
//        type:Number
//    },
//    Metadescription:{
//        type:String
//    },
//    Tags:{
//        type:Array
//    },
//    Productattribute:{
//         type:Array
//    },
//    Productdescription:{
//        type:String 
//    },
//    Image:{
//        type:String
//    }
// });
//create model
// module.exports = mongoose.model("Addnewprod",addnewprodschema);
module.exports = mongoose.model("Tag",tagSchema);
module.exports = mongoose.model("Category",catSchema);
module.exports = mongoose.model("Productattribute",productattributeschema);