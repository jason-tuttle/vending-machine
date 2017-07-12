const express = require('express');
const Vendor = require('../models/vendor').Vendor;
const router = express.Router();

// GET /api/customer/items - get a list of items
// TESTS PASSED
router.get('/items', function (req, res) {
  Vendor.find()
    .select('description')
    .exec(function(err, results) {
      if (err) {
        res.json({'status': 'failed', 'error': err});
      } else {
        res.json({'status': 'success', 'data': results});
      }
    })

});

// POST /api/customer/items/:itemId/purchases - purchase an item
router.post('/items/:itemId/purchases', function (req, res) {
  // Vendor.findOne('id': req.params.itemId)
  //   .select('description')
  Vendor.findOne({'id': req.params.itemId}, function(err, result) {
      if (!result) {
        res.json({'status': 'failed', 'error': 'That item is not available'});
      } else {
        if (result.quantity == 0) {
          res.json({'status': 'failed', 'error': 'That item is sold out'});
        } else if (result.cost > req.body.paid) {
          res.json({'status': 'failed', 'error': 'You don\'t have enough money'});
        } else {
          const purchase = {};
          purchase.item = result.description;
          purchase.changeReceived = req.body.paid - result.cost;
          res.json({'status': 'success', 'data': purchase});
        }
      }
    });
});

module.exports = router;
