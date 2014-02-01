Chainable Api - Make your Api calls chainables!
=============
With this small library you can tr

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

### Usage

```javascript
api.list.members.find();
api.list.members.tweets.delete(1);
```