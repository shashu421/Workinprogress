var mongoose = require("mongoose");

var imageschema = new mongoose.Schema({
    image:String
});

module.exports = mongoose.model("Image",imageschema);