// Generated by CoffeeScript 1.9.3
(function() {
  var MojioAuthSDK, MojioSDK, nock, should;

  should = require('should');

  MojioSDK = require('.././fluent/MojioSDK');

  MojioAuthSDK = require('.././fluent/MojioAuthSDK');

  nock = require('nock');

  describe('Node Mojio Fluent Auth SDK', function() {
    var sdk, testErrorResult;
    sdk = new MojioSDK({
      sdk: MojioAuthSDK,
      test: true
    });
    testErrorResult = function(error, result) {
      (error === null).should.be["true"];
      return (result !== null).should.be["true"];
    };
    it('can authorize with callback', function(done) {
      this.timeout(2000);
      nock('https://accounts.moj.io').get("oauth2/authorize").reply(function(uri, requestBody, cb) {
        return cb(null, [
          200, {
            id: 1
          }
        ]);
      });
      return sdk.authorize({
        type: "token",
        user: "unittest@moj.io",
        password: "mojioRocks"
      }).callback(function(error, result) {
        testErrorResult(error, result);
        return done();
      });
    });
    it('can authorize with promise', function(done) {
      var promise;
      this.timeout(2000);
      nock('https://accounts.moj.io').get("oauth2/authorize").reply(function(uri, requestBody, cb) {
        return cb(null, [
          200, {
            id: 1
          }
        ]);
      });
      promise = sdk.authorize({
        type: "code",
        user: "unittest@moj.io",
        password: "mojioRocks"
      }).submit();
      return promise.then(function(result) {
        testErrorResult(null, result);
        return done();
      })["catch"](function(error) {
        console.log('Handle rejected promise (' + error + ') here.');
        (error === null).should.be["true"];
        return done();
      });
    });
    it('can authorize with stream', function(done) {
      var observer;
      this.timeout(2000);
      nock('https://accounts.moj.io').get("oauth2/authorize").reply(function(uri, requestBody, cb) {
        return cb(null, [
          200, {
            id: 1
          }
        ]);
      });
      return observer = sdk.authorize({
        type: "token",
        user: "unittest@moj.io",
        password: "mojioRocks"
      }).stream();
    });
    return it('can authorize with sync', function(done) {
      var result;
      this.timeout(2000);
      nock('https://accounts.moj.io').get("oauth2/authorize").reply(function(uri, requestBody, cb) {
        return cb(null, [
          200, {
            id: 1
          }
        ]);
      });
      return result = sdk.authorize({
        type: "token",
        user: "unittest@moj.io",
        password: "mojioRocks"
      }).sync();
    });
  });

}).call(this);

//# sourceMappingURL=NodeAuthSDK_test.js.map
