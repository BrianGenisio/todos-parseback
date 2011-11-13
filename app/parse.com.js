(function() {
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Backbone.ParseCollection = (function() {
    __extends(ParseCollection, Backbone.Collection);
    function ParseCollection() {
      ParseCollection.__super__.constructor.apply(this, arguments);
    }
    ParseCollection.prototype.parse = function(resp, xhr) {
      var data;
      data = ParseCollection.__super__.parse.apply(this, arguments);
      return data.results;
    };
    ParseCollection.prototype.fetch = function(options) {
      if ((options != null ? options.query : void 0) != null) {
        options.data = "where=" + JSON.stringify(options.query);
        delete options.query;
      }
      return ParseCollection.__super__.fetch.apply(this, arguments);
    };
    return ParseCollection;
  })();
  Backbone.ParseModel = (function() {
    __extends(ParseModel, Backbone.Model);
    ParseModel.prototype.setId = function(data) {
      if (!data.id) {
        data.id = data.objectId;
      }
      return data;
    };
    function ParseModel(model) {
      this.setId(model);
      ParseModel.__super__.constructor.apply(this, arguments);
    }
    ParseModel.prototype.parse = function(resp, xhr) {
      return this.setId(ParseModel.__super__.parse.apply(this, arguments));
    };
    ParseModel.prototype.toJSON = function() {
      var result;
      result = ParseModel.__super__.toJSON.apply(this, arguments);
      delete result.createdAt;
      delete result.updatedAt;
      return result;
    };
    return ParseModel;
  })();
}).call(this);
