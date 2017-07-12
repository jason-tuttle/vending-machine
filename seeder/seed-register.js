const Register = require('../models/vendor').Register;
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/vendor');

// const registerSchema = new mongoose.Schema({
//   id: { type: Number, required: true, unique: true },
//   item: String,
//   paid: Number,
//   date: {type: Date, default: Date.now}
// });
var sales = [
  { id: 1,
    item: "Nacho Chips",
    paid: 50,
  },
  {
    id: 2,
    item: "Chocolate Bar",
    paid: 75,
  },
  {
    id: 3,
    item: "Bubble Gum",
    paid: 35,
  },
  {
    id: 4,
    item: "Can of Soda",
    paid: 100,
  },
  {
    id: 5,
    item: "Piece of Candy",
    paid: 10,
  },
  {
    id: 6,
    item: "Piece of Candy",
    paid: 10,
  },
  {
    id: 7,
    item: "Piece of Candy",
    paid: 10,
  }
];

Register.insertMany(sales, function(err, results) {
  err ? console.log('error: '+err.message) : console.log("Okay?");
});

mongoose.connection.close();
