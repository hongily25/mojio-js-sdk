// Generated by CoffeeScript 1.9.3
(function() {
  var Module, MojioPushSDK, MojioSDK, _,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  _ = require('underscore');

  MojioPushSDK = require('./MojioPushSDK');

  Module = require('../Module');

  module.exports = MojioSDK = (function(superClass) {
    var initiate, reset, setObject, setState, setWhere, state;

    extend(MojioSDK, superClass);

    state = {};

    function MojioSDK(options) {
      MojioSDK.__super__.constructor.call(this);
      if (options == null) {
        options = {};
      }
      this.include(options.sdk ? options.sdk : MojioPushSDK);
      delete options.sdk;
      if (!(options.test != null)) {
        options.test = false;
      }
      this.configure(options);
      console.log("test:" + this.test);
      reset();
    }

    MojioSDK.prototype.sync = function() {
      var result;
      sync();
      result = true;
      return result;
    };

    MojioSDK.prototype.callback = function(callback) {
      initiate();
      callback(null, true);
      return true;
    };

    MojioSDK.prototype.submit = function() {
      var promise;
      initiate();
      promise = null;
      return promise;
    };

    MojioSDK.prototype.stream = function() {
      var stream;
      initiate();
      stream = null;
      return stream;
    };

    initiate = function() {};

    reset = function() {
      state.operation = "get";
      state.lmiit = 10;
      state.offset = 0;
      state.desc = false;
      state.type = "all";
      state.where = null;
      return state.object = {};
    };

    setObject = function(object_or_json_string) {
      switch (typeof object_or_json_string) {
        case "string":
          state.object = object_or_json_string;
          break;
        case "object":
          state.object = JSON.stringify(object_or_json_string);
      }
      return state;
    };

    setState = function(operation) {
      reset();
      return state.operation = operation;
    };

    setWhere = function(id_example_or_query) {
      state.type = "all";
      state.where = null;
      if (id_example_or_query !== null) {
        switch (typeof id_example_or_query) {
          case "number":
            state.type = "id";
            state.where = id_example_or_query;
            break;
          case "string":
            state.type = "query";
            state.where = id_example_or_query;
            break;
          case "object":
            state.type = "example";
            state.where = id_example_or_query;
            break;
          default:
            state.type = "query";
            state.where = id_example_or_query;
        }
      }
      return state;
    };

    return MojioSDK;

  })(Module);

}).call(this);

//# sourceMappingURL=MojioSDK.js.map
