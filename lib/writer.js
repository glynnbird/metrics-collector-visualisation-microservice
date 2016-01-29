var total = 0,
  events = require('events'),
  eventEmitter = new events.EventEmitter();

var push = function(obj, callback) {
  console.log(obj);
  eventEmitter.emit('news', obj);
  callback();
}

var listen = function() {
  return eventEmitter;
}

module.exports = {
  push: push,
  listen: listen
};