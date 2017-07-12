const express = require('express');
const Vendor = require('../models/vendor').Vendor;
const router = express.Router();

// GET /api/customer/items - get a list of items
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
});

module.exports = router;
