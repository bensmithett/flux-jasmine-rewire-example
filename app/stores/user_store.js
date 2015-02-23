const EventEmitter = require("events").EventEmitter;
const assign = require("object-assign");
const AppDispatcher = require("../dispatcher/app_dispatcher");

// Create the internal store
let _store = {
  users: []
};

// Create the registered callback in the module's
// top level scope so rewire can find it
const registeredCallback = function (payload) {
  const action = payload.action;

  switch (action.type) {
    case "ADD_USER":
      _store.users.push(action.username)
      break;

    case "REMOVE_USER":
      const index = _store.users.indexOf(action.username);
      if (index !== -1) {
        _store.users.splice(index, 1);
      }
      break;
  }
};

// Register the callback
AppDispatcher.register(registeredCallback);

// Define the store's public getter methods
const UserStore = assign({}, EventEmitter.prototype, {
  getUserCount () {
    return _store.users.length;
  },

  getMostRecentUser () {
    return _store.users[_store.users.length - 1];
  }
});

// Export the public API
module.exports = UserStore;
