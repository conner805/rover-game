
const Message = require('./message.js')
const Command = require('./command.js')

class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }
  

  receiveMessage(message) {
      
      let response = {
      message: message.name,
      results: []
      }
     let commands = message.commands;

     for (let i = 0; i < commands.length; i++){
      if (commands[i].commandType == 'Move'){
        if (this.mode == 'Low Power'){
          response.results.push({completed: false});
         }
        else 
          {
          response.results.push({completed: true});
          this.position = commands[i].value;
         }
      }
      if (commands[i].commandType == 'Mode Change') {
      response.results.push({completed: true});
        this.mode = commands[i].value;
      }
      if (commands[i].commandType === 'Status Check') {
        response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
      }
      if(commands[i].commandType != 'Move' && commands[i].commandType != 'Mode Change' && commands[i].commandType != 'Status Check') {
        response.results.push({completed: false});
        response.results.push("Unknown Command");
      }
    }
    return response;
  }
};



module.exports = Rover;