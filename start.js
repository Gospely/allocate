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
  .option('a', {
    alias: 'appport',
    demand: true,
    describe: 'application port'
  })
  .option('w', {
    alias: 'password',
    demand: true,
    describe: 'shh password'
  })
  .option('m', {
    alias: 'memory',
    demand: true,
    describe: 'docker memory'
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
    socketResource = argv.r,
    appPort = argv.a,
    password = argv.w,
    memory = argv.m;

if(socketResource == null || socketResource == undefined || socketResource == ''){
  socketResource = "/var/www/gospely/socket";
}

var runBash = 'docker build -t gospel_socket . && docker run -itd -v /var/www/storage/codes/' + name + ':/root/workspace/' + name + ' -m '+ memory +'  -p ' + port + ':3000 -p ' + appPort + ':8086 -p ' + sshPort + ':22 -w /root/.gospely/.socket -v ' + socketResource + ':/root/.gospely/.socket --name="gospel_project_' + name + '" gospel_socket && docker exec  gospel_project_' + name +' && echo "root:' +password+ '"| chpasswd';
console.log(runBash);
var result = exec(runBash);



if(result.code !== 0) {
   console.error(result);
}else {
   console.log('Gosple Container is running, SSH: ' + sshPort, 'Socket: ' + port);
}
