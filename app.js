const express = require('express');
const app = express();
const apiRouter = require('./routes/api-router');
// using mongoose to add schema to our MondoDB
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

// connect to db
mongoose.connect('mongodb://localhost:27017/vendor');

app.use('/api', apiRouter);

if (require.main === "module") {
  app.listen(3000, function () {
      console.log('Express running on http://localhost:3000/...')
  });
}
