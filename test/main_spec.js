var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var should = require("should");
var chainableApi = require('../app/chainable-api').chainableApi;
// var assert = require('assert');
var chai = require('chai');
var assert = chai.assert;
var API_SCHEMA = {
  list: {
    members: {
      tweets: {

      }
    }
  }
};
var api = new chainableApi(API_SCHEMA);
var id = 1;
var callback = function(data) {
  console.log('callback', data);
};
var options = {
  greeting: 'hi'
};
//FIND METHOD
// api.list.members.tweets.find();
// api.list.members.tweets.find().then(callback);
// api.list.members.tweets.find(options);
// api.list.members.tweets.find(options).then(callback);
// api.list.members.tweets.find(id);
// api.list.members.tweets.find(id).then(callback);
// api.list.members.tweets.find(id).then(callback, callback);
// api.list.members.tweets.find(id, options);
// api.list.members.tweets.find(id, options).then(callback);
//CREATE METHOD
// api.list.members.tweets.create(options).then(callback);
// api.list.members.tweets.create().then(callback);
//SAVE METHOD
// api.users.save(id, options);
// api.users.save(id, options).then(callback);
//DELETE METHOD
// api.users.delete(id);
// api.users.delete(id).then(callback);
//
describe("Chainable Api", function() {
  it("should have a object for each enpoint", function() {
    assert.typeOf(api.list, 'object');
    assert.typeOf(api.list.members, 'object');
    assert.typeOf(api.list.members.tweets, 'object');
  });
  it("each enpoint should have four CRUD functions", function() {
    assert.typeOf(api.list.find, 'function');
    assert.typeOf(api.list.create, 'function');
    assert.typeOf(api.list.save, 'function');
    assert.typeOf(api.list.delete, 'function');
  });
});