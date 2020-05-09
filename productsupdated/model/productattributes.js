var mongoose = require("mongoose");

var productattributeschema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Variation:{
        type:Array,
        required:true
    }
});

module.exports = mongoose.model("Productattribute",productattributeschema);