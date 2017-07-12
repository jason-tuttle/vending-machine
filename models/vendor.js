const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  description: String,
  cost: Number,
  quantity: Number
});

const registerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  item: String,
  paid: Number,
  date: {type: Date, default: Date.now}
});

const Vendor = mongoose.model('Vendor', vendorSchema);
const Register = mongoose.model('Register', registerSchema);

module.exports = {Vendor, Register};

// {
//       "id": 1,
//       "description": "Corn chips",
//       "cost": 65,
//       "quantity": 4
//     },
//     {
//       "id": 2,
//       "description": "Gum",
//       "cost": 35,
//       "quantity": 10
//     }
