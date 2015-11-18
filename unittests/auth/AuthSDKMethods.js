// Generated by CoffeeScript 1.10.0
(function() {
  var MojioAuthSDK, MojioSDK, should;

  should = require('should');

  MojioSDK = require('../../src/nodejs/sdk/MojioSDK');

  MojioAuthSDK = require('../../src/nodejs/sdk/MojioAuthSDK');

  describe('Node Mojio Auth SDK Methods', function() {
    var call, client_id, client_secret, grant_type, init, password, redirect_url, response_type, testErrorResult, timeout, username;
    call = null;
    timeout = 50;
    client_id = 'client_id';
    client_secret = 'client_secret';
    password = 'password!';
    username = 'username';
    response_type = 'response_type';
    grant_type = 'grant_type';
    redirect_url = "http://localhost:3000/callback";
    init = {
      sdk: MojioAuthSDK,
      client_id: client_id,
      client_secret: client_secret,
      test: true
    };
    testErrorResult = function(error, result) {
      (error === null).should.be["true"];
      return (result !== null).should.be["true"];
    };
    it('can set credentials', function() {
      var sdk, stuff;
      sdk = new MojioSDK(init);
      sdk.credentials(username, password);
      stuff = sdk.show();
      stuff.body.username.should.be.equal(username);
      return stuff.body.password.should.be.equal(password);
    });
    it('can set credentials with object', function() {
      var sdk, stuff;
      sdk = new MojioSDK(init);
      sdk.credentials({
        user: username,
        password: password
      });
      stuff = sdk.show();
      stuff.body.username.should.be.equal(username);
      return stuff.body.password.should.be.equal(password);
    });
    it('can set token parameters', function() {
      var sdk, stuff;
      sdk = new MojioSDK(init);
      sdk.token(redirect_url);
      stuff = sdk.show();
      stuff.method.should.be.equal('POST');
      stuff.endpoint.should.be.equal('accounts');
      stuff.resource.should.be.equal('oauth2');
      stuff.action.should.be.equal('token');
      return stuff.body.redirect_uri.should.be.equal(redirect_url);
    });
    testErrorResult = function(error, result) {
      (error === null).should.be["true"];
      return (result !== null).should.be["true"];
    };
    return it('can set token with string', function(done) {
      var sdk;
      sdk = new MojioSDK(init);
      sdk.token().parse("Token").callback(function(error, result) {
        var stuff;
        testErrorResult(error, result);
        sdk.getToken().access_token.should.be.equal("Token");
        stuff = sdk.show();
        stuff.method.should.be.equal('POST');
        stuff.endpoint.should.be.equal('accounts');
        stuff.resource.should.be.equal('oauth2');
        stuff.action.should.be.equal('token');
        return done();
      });
    });
  });

}).call(this);

//# sourceMappingURL=AuthSDKMethods.js.map
