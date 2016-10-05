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
    sshPort = argv.s;

var runBash = 'docker build -t gospel_socket . && docker run -itd -p ' + port + ':3000 -p ' + sshPort + ':22 -w /var/www/socket --name="gospel_socket_' + name + '" gospel_socket';

var result = exec(runBash);

if(result.code !== 0) {
   console.error(result);
}else {
   console.log('Gosple Container is running, SSH: ' + sshPort, 'Socket: ' + port);
}
