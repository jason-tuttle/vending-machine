const express = require('express');
const Register = require('../models/vendor').Register;
const Vendor = require('../models/vendor').Vendor;
const router = express.Router();



// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
// TEST PASSED
router.get('/purchases', function (req, res) {
  Register.find()
    .select('item date')
    .exec(function(err, results) {
      if (err) {
        res.json({'status': 'failed', 'error': err});
      } else {
        res.json({'status': 'success', 'data': results});
      }
    });
});

// GET /api/vendor/money - get a total amount of money accepted by the machine
// TEST PASSED
router.get('/money', function (req, res) {
  var summa = {}
  summa.map = function() { emit(this.item, this.paid) };
  summa.reduce = function(key, val) { return Array.sum(val) };
  Register.mapReduce(summa, function(err, result) {
    if (err) {
      res.json({'status': 'failed', 'error': err});
    } else {
      total = result.reduce(function(sum, element) {
        return sum + element.value;
      }, 0);
      res.json({'status': 'success', 'data': total});
    }
  });
});

// POST /api/vendor/items - add a new item not previously existing in the machine
// TEST PASSED
router.post('/items', function (req, res) {
  // pull last record, need last.id++
  let lastId = 0;
  Vendor.find()
    .select('id')
    .sort({'id': 1})
    .exec(function(err, array) {
      if (err) {
        res.json({'status': 'failed', 'error': err});
      } else {
        console.log(`last id: ${array[array.length-1].id}`)
        lastId = array[array.length-1].id;
        const newItem = {
          id: ++lastId,
          description: req.body.newDescription,
          cost: req.body.newCost,
          quantity: req.body.newQuantity
        };
        // do the insert
        Vendor.create(newItem, function(err, newThing) {
          if (err) {
            res.json({'status': 'failed', 'error': err});
          } else {
            res.json({'status': 'success', 'data': newThing});
          }
        });
      }
    });
});

// PUT /api/vendor/items/:itemId - update item quantity, description, and cost
// TESTS PASSED
router.put('/items', function (req, res) {
  const newItem = {
    description: req.body.newDescription,
    cost: req.body.newCost,
    quantity: req.body.newQuantity
  };
  // Vendor.update({'id': itemId}, { SET PARAMS HERE });
  // query.findOneAndUpdate(conditions, update, options, callback)
  Vendor.findOneAndUpdate(
    {'id': req.params.itemId},
    newItem,
    { new: true },
    function(err, doc) {
      if (err) {
        res.json({'status': 'failed', 'error': err})
      } else {
        res.json({'status': 'success', 'data': doc})
      }
    }
)
});

module.exports = router;
/*
GET /api/customer/items - get a list of items
POST /api/customer/items/:itemId/purchases - purchase an item
GET /api/vendor/purchases - get a list of all purchases with their item and date/time
GET /api/vendor/money - get a total amount of money accepted by the machine
POST /api/vendor/items - add a new item not previously existing in the machine
PUT /api/vendor/items/:itemId - update item quantity, description, and cost
*/
