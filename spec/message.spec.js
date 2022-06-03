const assert = require('assert');
const Message = require('../message.js');
const Command = require('../command.js');

describe('Message class', function(){

  it("throws error if a name is NOT passed into the constructor as the first parameter", function(){
    assert.throws(
      function() {
        new Message();
      },
      {
        message: 'name required.'
      }
    );
  });
  it('constructor sets name', function(){
    let commands = [new Command('Mode Change', 'Low Power'), new Command('Status Check')];
    let message = new Message('two commands', commands);
    assert.strictEqual(message.name, 'two commands');
    });
  it("contains a commands array passed into the constructor as 2nd argument", function(){
     let commands = [new Command('Mode Change', 'Low Power'), new Command('Status Check')];;
      let message = new Message('two commands', commands);
    assert.strictEqual(message.commands, commands); 
  })
  })




