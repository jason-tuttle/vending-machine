const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

const customerRouter = require('./routes/customer-router');
const vendorRouter = require('./routes/vendor-router');

// using mongoose to add schema to our MondoDB
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// connect to db
mongoose.connect('mongodb://localhost:27017/vendor');

app.use('/api/customer', customerRouter);
app.use('/api/vendor', vendorRouter);

if (require.main === module) {
  app.listen(3000, function () {
      console.log('Express running on http://localhost:3000/...')
  });
}

module.exports = app;
