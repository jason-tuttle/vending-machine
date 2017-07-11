const express = require('express');
const router = express.Router();

// GET /api/customer/items - get a list of items
router.get('/customer/items', function (req, res) {

});

// POST /api/customer/items/:itemId/purchases - purchase an item
router.post('/customer/items/:itemId/purchases', function (req, res) {

});

// GET /api/vendor/purchases - get a list of all purchases with their item and date/time
router.get('/vendor/purchases', function (req, res) {

});

// GET /api/vendor/money - get a total amount of money accepted by the machine
router.get('/vendor/money', function (req, res) {

});

// POST /api/vendor/items - add a new item not previously existing in the machine
router.post('/vendor/items', function (req, res) {

});

// PUT /api/vendor/items/:itemId - update item quantity, description, and cost
router.put('/vendor/items', function (req, res) {
  
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
