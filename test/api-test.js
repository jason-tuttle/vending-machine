const request = require('supertest');
const assert = require('assert');
const app = require('../app');
const mongoose = require('mongoose');
const Vendor = require('../models/vendor').Vendor;
const Register = require('../models/vendor').Register;

// BEGIN CUSTOMER FUNCTION TESTS
describe("GET /api/customer/items", function () {
  it("should return successfully", function (done) {
    request(app)
      .get("/api/customer/items")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });
  it("should return json data", function(done) {
    request(app)
      .get("/api/customer/items")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });
  it("should return 5 data items", function(done) {
    request(app)
      .get("/api/customer/items")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body.data.length, 5);
      })
      .end(done);
  });
});

describe("POST /api/customer/items/:id/purchases", function () {
  it("should return successfully", function(done) {
    request(app)
      .post("/api/customer/items/3/purchases")
      .type("form")
      .send({"paid": "100"})
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });
  it("should return json data", function(done) {
    request(app)
      .post("/api/customer/items/3/purchases")
      .type("form")
      .send({"paid": "100"})
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });
  it("should return 2 data items, item and change", function(done) {
    request(app)
      .post("/api/customer/items/3/purchases")
      .type("form")
      .send({"paid": "100"})
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 2);
      })
      .end(done);
  });
  it("should not allow bogus purchase", function(done) {
    request(app)
      .post("/api/customer/items/15/purchases")
      .type("form")
      .send({"paid": "100"})
      .expect(function(res) {
        assert.equal(res.body.status, "failed");
      })
      .end(done);
  });
});
// BEGIN VENDOR FUNCTION TESTS
describe("GET /vendor/purchases", function () {
  it("should return successfully", function (done) {
    request(app)
      .get("/api/vendor/purchases")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });
  it("should return json data", function(done) {
    request(app)
      .get("/api/vendor/purchases")
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });
  it("should return 7 data items", function(done) {
    request(app)
      .get("/api/vendor/purchases")
      .expect(function(res) {
        assert.equal(res.body.data.length, 7);
      })
      .end(done);
  });
});

describe("GET /vendor/purchases", function () {
  it("should return successfully", function (done) {
    request(app)
      .get("/api/vendor/money")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });
  it("should return json data", function(done) {
    request(app)
      .get("/api/vendor/money")
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });
  it("should return a sum", function(done) {
    request(app)
      .get("/api/vendor/money")
      .expect(function(res) {
        assert.equal(res.body['data'], 290);
      })
      .end(done);
  });
});

describe("POST /api/vendor/items", function () {

  afterEach("remove the item we added", function(done) {
    Vendor.deleteOne({'id': 6}).then(() => done()).catch(done);
  });

  it("should return successfully", function (done) {
    request(app)
      .post("/api/vendor/items")
      .type('form')
      .send({'newDescription': "Cheezy Poofs",
            'newCost': '120',
            'newQuantity': '10'})
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });
  it("should return json data", function(done) {
    request(app)
      .post("/api/vendor/items")
      .type('form')
      .send({'newDescription': "Cheezy Poofs",
            'newCost': '120',
            'newQuantity': '10'})
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });
  it("should return the new item", function(done) {
    request(app)
      .post("/api/vendor/items")
      .type('form')
      .send({'newDescription': "Cheezy Poofs",
            'newCost': '120',
            'newQuantity': '10'})
      .expect(function(res) {
        assert.equal(res.body['data'].description, 'Cheezy Poofs');
      })
      .end(done);
  });
});

describe("PUT /api/vendor/items", function () {

  afterEach("undo the update", function(done) {
    Vendor.update(
      {'description': "Cheezy Curls"},
      {'description': "Cheezy Poofs"},
      {new: true})
      .then(() => done())
      .catch(done);
  });

  it("should return successfully", function (done) {
    request(app)
      .post("/api/vendor/items")
      .type('form')
      .send({'newDescription': "Cheezy Curls"})
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function (res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });
  it("should return json data", function(done) {
    request(app)
      .post("/api/vendor/items")
      .type('form')
      .send({'newDescription': "Cheezy Curls"})
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });
  it("should return the new item", function(done) {
    request(app)
      .post("/api/vendor/items")
      .type('form')
      .send({'newDescription': "Cheezy Curls"})
      .expect(function(res) {
        assert.equal(res.body['data'].description, 'Cheezy Curls');
      })
      .end(done);
  });
});
