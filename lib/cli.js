var path = require('path')
  , Arguments = require('./Arguments');

function Cli() {

  this.cwd = function () {
    return path.dirname(process.argv[1]);
  };

  this.args = function args() {
    return new Arguments(process.argv.slice(2));
  };

  return this;
}


module.exports = new Cli();
