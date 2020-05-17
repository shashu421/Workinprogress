var express = require("express");
var app = express();
var path = require("path");
var multer = require("multer");
var bodyParser = require("body-parser");

//Set Storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Init Upload
const upload = multer({
    storage:storage,
    limits:{fileSize: 5000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).single('myImage');

// Check file type
function checkFileType(file,cb){
    //Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true)
    } else {
        cb('Error : Images Only !!');
    }
}

app.set("view engine","ejs");

app.use(express.static('./public'));

//routes
app.get("/",function(req,res){
    res.render("index");
});

app.post("/upload",function(req,res){
    upload(req, res, (err) => {
        if(err){
            res.render('index', {
                msg:err
            });
        } else {
            console.log(req.file);
            if(req.file == undefined){
                res.render('index' , {
                    msg: 'Error: No File Selected!'
                });
            } else {
                res.render('index' , {
                    msg : 'File uploaded!',
                    file : `uploads/${req.file.filename}`
                });
            }
        }
    })
});

app.listen(3000,function(){
    console.log("Server is started on port 3000");
})