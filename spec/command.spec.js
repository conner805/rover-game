const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {

  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });
  it("constructor sets command type", function(){
    let testRover = new Command('abc', 123);
    assert.strictEqual(testRover.commandType, 'abc');
    });
  it("constructor sets a value passed in as the 2nd argument", function(){
    testRover = new Command('abc', 123);
    assert.strictEqual(testRover.value, 123);
});
})