var express = require("express");
var router = express.Router({mergeParams:true});
var mongoose = require("mongoose");
var productAttribute = require("../model/productattributes.js");

//configuring Product attributes routes

router.route('/home').get((req,res) => {
    productAttribute.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {

    const Name = req.body.Name;
    const Variation = [req.body.Variation];

    const newProductAttribute = new productAttribute({
        Name,
        Variation
    });
    newProductAttribute.save()
        .then(() => res.json('Product attribute added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    productAttribute.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
    productAttribute.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product attribute deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req,res) => {
    productAttribute.findById(req.params.id)
        .then(product => {
        product.Name = req.body.Name;
        product.Variation = [req.body.Variation];

        product.save()
        .then(() => res.json('Product Attribute Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// router.route('/deleteall').delete((req,res) => {
//     productAttribute.remove({})
//     .then(() => res.json('All products attribute deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

module.exports = router;
