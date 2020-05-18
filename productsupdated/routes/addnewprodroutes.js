var express = require("express");
var router = express.Router({ mergeParams: true });
// var addNewProd = require("../model/addnewprod.js");
var mongoose = require("mongoose");
var allproducts = require("../model/addnewprod.js");

//configuring addnewproduct routes

router.route("/").get((req, res) => {
  allproducts
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const Productname = req.body.Productname;
  const Category = req.body.Category;
  const Price = Number(req.body.Price);
  const Disprice = Number(req.body.Disprice);
  const Skuid = Number(req.body.skuid);
  const Metadescription = req.body.Metadescription;
  const Tags = req.body.Tags;
  const Productattribute = req.body.Productattribute;
  const Productdescription = req.body.Productdescription;
  const Image = req.body.Image;
  const Date = req.body.Date;

  const newProduct = new allproducts({
    Productname,
    Category,
    Price,
    Disprice,
    Skuid,
    Metadescription,
    Tags,
    Productattribute,
    Productdescription,
    Image,
    Date
  });
  console.log(newProduct);
  newProduct
    .save()
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  allproducts
    .findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  console.log(req.params.id);
  allproducts
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Product deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  allproducts
    .findById(req.params.id)
    .then((product) => {
      console.log(req.body.Productname);
      product.Productname = req.body.Productname;
      product.Category = req.body.Category;
      product.Price = Number(req.body.Price);
      product.Disprice = Number(req.body.Disprice);
      product.Skuid = Number(req.body.Skuid);
      product.Metadescription = req.body.Metadescription;
      product.Tags = req.body.Tags;
      product.Productattribute = req.body.Productattribute;
      product.Productdescription = req.body.Productdescription;
      product.Image = req.body.Image;
      product.Date = req.body.Date;
      console.log(product);
      product
        .save()
        .then((product) => res.json(product))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// router.route('/deleteall').delete((req,res) => {
//     productAttribute.remove({})
//     .then(() => res.json('All products deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;

// Example set = {
//     "Tags": [
//         "Marvel"
//     ],
//     "Productattribute": [
//         "XXL"
//     ],
//     "_id": "5eb25705cba8b922f1bebb3d",
//     "Productname": "Tshirt",
//     "Category": "Jeans",
//     "Price": 456,
//     "Disprice": 300,
//      "Skuid":110,
//     "Metadescription": "Hello",
//     "Productdescription": "Great one with Nylon fibre",
//     "__v": 0
// }
