#!/usr/bin/env node
//
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
  .option('f', {
    alias: 'file',
    demand: true,
    describe: 'docker file path'
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
    memory = argv.m,
    filePath = argv.f;
    console.log(filePath);
var imageName = filePath;
if(filePath == 'c++'){
  imageName == cpp;
}

var cloneCmd = "";
if(imageName == 'nodejs') {
  cloneCmd = " && git clone https://github.com/Gospely/hello_node.git  /var/www/storage/codes/" + name +" && rm -rf .git"
}
if(imageName == 'vue-f7') {
  cloneCmd = " && git clone https://github.com/Gospely/vue-f7.git /var/www/storage/codes/" + name + " && rm -rf .git"
}
// if(imageName == 'nodejs' || imageName == 'vue-f7'){
//   imageName = 'socket';
// }
if(socketResource == null || socketResource == undefined || socketResource == ''){
  socketResource = "/var/www/gospely/socket";
}
var sshCmd = " /bin/bash -c 'echo root:" +password+ " | chpasswd '";
var runBash = 'docker build -t gospel_' + imageName + ' /root/gospely/allocate/df/' + filePath + ' '+ cloneCmd +' && docker run -itd -v /var/www/storage/codes/' + name + ':/root/workspace/' + name + ' -m '+ memory +'  -p ' + port + ':3000 -p ' + appPort + ':8086 -p ' + sshPort + ':22 -w /root/.gospely/.socket -v ' + socketResource + ':/root/.gospely/.socket --name="gospel_project_' + name + '" gospel_socket ' + sshCmd ;
console.log(runBash);
var result = exec(runBash);



if(result.code !== 0) {
   console.error(result);
}else {
   console.log('Gosple Container is running, SSH: ' + sshPort, 'Socket: ' + port);
}
