#!/usr/bin/env node

require('shelljs/global');
var argv = require('yargs')
  .option('n', {
    alias : 'name',
    demand: false,
    describe: 'container name',
    type: 'string'
  })
  .option('p', {
    alias : 'port',
    demand: false,
    describe: 'container port to be exposed',
  })
  .option('s', {
    alias : 'sshport',
    demand: false,
    describe: 'container ssh port to be exposed',
  })
  .usage('Usage: start.js [options]')
  .example('start.js -n foo -p 7100 -s 8888', 'run Gospel socket')
  .help('h')
  .alias('h', 'help')
  .epilog('Gospely Copyright 2016')
  .argv;

var name = argv.n,
    port = argv.p,
    sshPort = argv.s,

var runBash = '';

var result = exec(runBash);

if(result.code !== 0) {
   console.error(result);
}else {
   console.log('Gosple Socket is running, SSH: ' + sshPort, 'Socket: ' + port);
}
