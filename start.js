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
  .option('r', {
    alias : 'resource',
    demand: false,
    describe: 'socket resource',
  })
  .usage('Usage: start.js [options]')
  .example('start.js -n foo -p 7100 -s 8888 -r /var/www/gospely/socket', 'run Gospel socket')
  .help('h')
  .alias('h', 'help')
  .epilog('Gospely Copyright 2016')
  .argv;

var name = argv.n,
    port = argv.p,
    sshPort = argv.s,
    socketResource = argv.r;

var runBash = 'docker build -t gospel_socket . && docker run -itd -p ' + port + ':3000 -p ' + sshPort + ':22 -w /root/.gospely/.socket -v ' + socketResource + ':/root/.gospely/.socket --name="gospel_socket_' + name + '" gospel_socket';

var result = exec(runBash);

if(result.code !== 0) {
   console.error(result);
}else {
   console.log('Gosple Container is running, SSH: ' + sshPort, 'Socket: ' + port);
}
