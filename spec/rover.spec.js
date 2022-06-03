const assert = require('assert');
const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

describe("Rover class", function(){

  it("constructor sets position and default values for mode and generatorWatts", function(){
    let testRover = new Rover(87382098);
    
    assert.strictEqual(testRover.position, 87382098);
    assert.strictEqual(testRover.mode, 'NORMAL');
    assert.strictEqual(testRover.generatorWatts, 110);
  })

  it("response returned by receiveMessage contains name of message", function(){
   let commands = [new Command('Mode Change', 'Low Power'), new Command('Status Check')];
    let message = new Message("two commands", commands);
    let testRover = new Rover(87382098);
    let response = testRover.receiveMessage(message);
    
    assert.strictEqual(response.message, "two commands")
  })
  
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let testRover = new Rover(87382098);
    let commands = [new Command('Mode Change', 'Low Power'), new Command('Status Check')];
    let message = new Message("two commands", commands);
    let response = (testRover.receiveMessage(message));
    
    assert.strictEqual(response.results.length, 2);
})
  it("responds correctly to status check command", function(){
    let testRover = new Rover(87382098);
    let modeCommand = new Command('Mode Change', 'Low Power');
    let moveCommand = new Command('Move', 12000);
    let statusCommand = new Command('Status Check');
    let commands = [modeCommand, moveCommand, statusCommand];
    let message = new Message("two commands", commands);
    let response = (testRover.receiveMessage(message));
    let statusCheck = ({completed: true, roverStatus: {mode: 'Low Power', generatorWatts: 110, position: 87382098 }
    });

  
  assert.deepStrictEqual(response.results[2], statusCheck);  
  
})

  it("responds correctly to mode change command", function(){
    let testRover = new Rover(87382098);
    let modeCommand = new Command('Mode Change', 'Low Power');
    let moveCommand = new Command('Move', 12000);
    let statusCommand = new Command('Status Check');
    let commands = [modeCommand, moveCommand, statusCommand];
    let message = new Message("two commands", commands);
    let response = (testRover.receiveMessage(message));
    

    assert.strictEqual(response.results[0].completed, true)
    assert.strictEqual(response.results[2].roverStatus.mode, 'Low Power');
  
  })

it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let testRover = new Rover(87382098);
    let modeCommand = new Command('Mode Change', 'Low Power');
    let moveCommand = new Command('Move', 12000);
    let statusCommand = new Command('Status Check');
    let commands = [modeCommand, moveCommand, statusCommand];
    let message = new Message("two commands", commands);
    let response = (testRover.receiveMessage(message));
    
    assert.strictEqual(response.results[1].completed, false);

  })

it("responds with position for move command", function(){
    let testRover = new Rover(87382098);
    let modeCommand = new Command('Mode Change', 'NORMAL');
    let moveCommand = new Command('Move', 12000);
    let statusCommand = new Command('Status Check');
    let commands = [modeCommand, moveCommand, statusCommand];
    let message = new Message("Move Command", commands);
    let response = (testRover.receiveMessage(message));

    assert.strictEqual(testRover.position, 12000);

})

it("completed false and a message for an unknown command", function(){
    let testRover = new Rover(87382098);
    let modeCommand = new Command('Mode Change', 'NORMAL');
    let moveCommand = new Command('Move', 12000);
    let statusCommand = new Command('Status Check');
    let commands = [modeCommand, moveCommand, statusCommand];
    let message = new Message("Move Command", commands);
    let response = (testRover.receiveMessage(message));

//if commandType doesn't correspond with array, completed false and a message for unknown command.
  
  assert.strictEqual(!commands[0].commandType, false);
  assert.strictEqual(!commands[1].commandType, false);
  assert.strictEqual(!commands[2].commandType, false); 
})
});
  
