// Generated by CoffeeScript 1.9.3
(function() {
  var HttpNodeWrapper, async, nock, should;

  should = require('should');

  async = require('async');

  HttpNodeWrapper = require('../../src/nodejs/HttpWrapper');

  nock = require('nock');

  describe('Http Nodejs Wrapper', function() {
    var contentType, testErrorResult, token;
    token = "token";
    contentType = "application/json";
    testErrorResult = function(error, result) {
      (error === null).should.be["true"];
      return (result !== null).should.be["true"];
    };
    it('tests @request get resource with id', function(done) {
      var httpNodeWrapper;
      nock('https://api.moj.io').get('/v1/Vehicles/1').reply(function(uri, requestBody, cb) {
        this.req.headers.mojioapitoken.should.be.equal(token);
        this.req.headers['content-type'].should.be.equal(contentType);
        return cb(null, [
          200, {
            id: 1
          }
        ]);
      });
      httpNodeWrapper = new HttpNodeWrapper("token");
      return httpNodeWrapper.request({
        method: 'Get',
        resource: "Vehicles",
        id: "1"
      }, (function(_this) {
        return function(error, result) {
          testErrorResult(error, result);
          return done();
        };
      })(this));
    });
    return it('tests @request get resource with id and form url encoding', function(done) {
      var httpNodeWrapper;
      nock('https://api.moj.io').get('/v1/Vehicles/1').reply(function(uri, requestBody, cb) {
        this.req.headers.mojioapitoken.should.be.equal(token);
        this.req.headers['content-type'].should.be.equal(contentType);
        this.req.headers['host'].should.be.equal("api.moj.io");
        return cb(null, [
          200, {
            id: 1
          }
        ]);
      });
      httpNodeWrapper = new HttpNodeWrapper("token", 'https://api.moj.io/v1', true);
      return httpNodeWrapper.request({
        method: 'Get',
        resource: "Vehicles",
        id: "1"
      }, (function(_this) {
        return function(error, result) {
          testErrorResult(error, result);
          return done();
        };
      })(this));
    });
  });

}).call(this);

//# sourceMappingURL=HttpNodeWrapper_test.js.map
