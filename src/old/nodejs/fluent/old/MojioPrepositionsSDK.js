// Generated by CoffeeScript 1.9.3
(function() {
  var MojioPrepositionsSDK, MojioRestSDK,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  MojioRestSDK = require('./MojioRestSDK');

  module.exports = MojioPrepositionsSDK = (function(superClass) {
    extend(MojioPrepositionsSDK, superClass);

    function MojioPrepositionsSDK(options) {
      if (options == null) {
        options = {};
      }
      MojioPrepositionsSDK.__super__.constructor.call(this, options);
    }

    MojioPrepositionsSDK.prototype["with"] = function() {
      return this;
    };

    MojioPrepositionsSDK.prototype.from = function() {
      return this;
    };

    MojioPrepositionsSDK.prototype.into = function() {
      return this;
    };

    MojioPrepositionsSDK.prototype.outof = function() {
      return this;
    };

    return MojioPrepositionsSDK;

  })(MojioRestSDK);

}).call(this);

//# sourceMappingURL=MojioPrepositionsSDK.js.map
