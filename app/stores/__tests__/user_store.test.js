const rewire = require("rewire");

// In this store test we want to check that the store updates its state
// in response to a Flux action being dispatched.

// Since stores have no public setter API, we need a reference to the
// stores action handler, so that we can call it with some fake 
// action payloads.

// Then we can use the store's public getters to check that the action
// resulted in the correct internal update.

describe("UserStore", function () {
  beforeEach(function () {
    // rewire returns a new instance each time, which we want so that
    // the results of past tests don't stick around in the store's
    // internal state
    this.UserStore = rewire("../user_store");

    // Using rewire's __get__, we grab a reference to the store's internal
    // action handler and call it with some fake actions in our tests.

    // For this to be possible, the action handler needs to be declared in the
    // top level scope of the store, and not just be an anonymous function passed 
    // to Dispatcher.register
    this.registeredCallback = this.UserStore.__get__("registeredCallback");
  });

  it("doesn't update the internal store when a random action is dispatched", function () {
    this.registeredCallback({
      action: {
        type: "AN_ACTION_THIS_STORE_DOESNT_CARE_ABOUT",
        username: "cottoneyejoe"
      }
    });
    expect(this.UserStore.getUserCount()).toBe(0);
  });

  it("adds a user", function () {
    this.registeredCallback({
      action: {
        type: "ADD_USER",
        username: "clonehighrulez"
      }
    });
    expect(this.UserStore.getMostRecentUser()).toBe("clonehighrulez");
  });

  it("removes a user", function () {
    this.registeredCallback({
      action: {
        type: "ADD_USER",
        username: "clonehighrulez"
      }
    });
    this.registeredCallback({
      action: {
        type: "ADD_USER",
        username: "cottoneyejoe"
      }
    });
    this.registeredCallback({
      action: {
        type: "REMOVE_USER",
        username: "clonehighrulez"
      }
    });
    expect(this.UserStore.getUserCount()).toBe(1);
  });
});
