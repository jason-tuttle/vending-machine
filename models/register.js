const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  item: String,
  paid: Number,
  date: {type: Date, default: Date.now}
});


const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
