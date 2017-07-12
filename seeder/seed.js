const Vendor = require('../models/vendor').Vendor;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/vendor');


// var arr = [{ name: 'Star Wars' }, { name: 'The Empire Strikes Back' }];
// Movies.insertMany(arr, function(error, docs) {});
var items = [
  { id: 1,
    description: "Nacho Chips",
    cost: 50,
    quantity: 3
  },
  {
    id: 2,
    description: "Chocolate Bar",
    cost: 75,
    quantity: 8
  },
  {
    id: 3,
    description: "Bubble Gum",
    cost: 35,
    quantity: 12
  },
  {
    id: 4,
    description: "Can of Soda",
    cost: 100,
    quantity: 10
  },
  {
    id: 5,
    description: "Piece of Candy",
    cost: 10,
    quantity: 153
  }
]
Vendor.insertMany(items, function(err, results) {
  err ? console.log('error: '+err.message) : console.log("Okay?");
});

mongoose.connection.close();
