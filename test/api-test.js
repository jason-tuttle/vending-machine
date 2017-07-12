const request = require('supertest');
const assert = require('assert');
const app = require('../app');

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
      .get("/api/customer/items/3/purchases")
      .expect(200)
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(function(res) {
        assert.equal(res.body['status'], "success");
      })
      .end(done);
  });
  it("should return json data", function(done) {
    request(app)
      .get("/api/customer/items/3/purchases")
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 0);
      })
      .end(done);
  });
  it("should return 2 data items", function(done) {
    request(app)
      .get("/api/customer/items/3/purchases")
      .expect(function(res) {
        assert.notEqual(res.body.data.length, 2);
      })
      .end(done);
  });
});

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
