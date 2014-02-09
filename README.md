Chainable Api
=============
Make your api calls chainables, with this small library you can get a cool <b>OO</b> syntax for do <b>CRUD</b> against your favorite <b>rest api</b>, and best of all is that it's <b>Promise</b> oriented! :ok_hand:

### Creation
For create a instance of chainable api you only should create your enpoint schema as plain object and latter send as param to the chainableApi
```javascript
var schema = {
  users:{},
  team: {
    players: {},
  },
  list:{
    members:{
      tweets:{}
    }
  }
};

var api = new chainableApi(schema);
```

### Promises
For each endpoint in your api schema the chainableApi create's 4 functions `find`, `create`, `save`, and `delete`. When you call any such functions you will get a native `Promise` object which will be resolved if the request is ok (200 code) or rejected if the request has been errored. Example:
```javascript
api.list.members.find().then(successCb, failCb);
```

For more docu about promises you should check [this amazing post](http://www.html5rocks.com/en/tutorials/es6/promises/) from [Jake Archibald](https://github.com/jakearchibald) .

### Finding records
```javascript
api.list.members.find();
api.list.members.find(id);
api.list.members.find(options);
api.list.members.find(id, options);
```

### Creating records
```javascript
api.list.create(options);
```
### Updating records
```javascript
api.list.members.tweets.save(id, options);
```
### Deleting records
```javascript
api.list.members.tweets.delete(id);
```
### Browser compatibility
The Promise object has no a full browser support; for know the real support you can check [can I use](http://caniuse.com/#search=promise) website.
### Further reading
  * [Specification](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects)
  * [Promises/A+ spec](http://promises-aplus.github.io/promises-spec/)
  * [A polyfill for ES6-style Promises](https://github.com/jakearchibald/es6-promise)
  * [API Reference](http://www.html5rocks.com/en/tutorials/es6/promises/#toc-api)

