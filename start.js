#!/usr/bin/env node
 //
require('shelljs/global');
var argv = require('yargs')
  .option('n', {
    alias: 'name',
    demand: false,
    describe: 'container name',
    type: 'string'
  })
  .option('p', {
    alias: 'port',
    demand: false,
    describe: 'container port to be exposed',
  })
  .option('s', {
    alias: 'sshport',
    demand: false,
    describe: 'container ssh port to be exposed',
  })
  .option('r', {
    alias: 'resource',
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
  .option('o', {
    alias: 'host',
    demand: true,
    describe: 'host name'
  })
  .option('c', {
    alias: 'creator',
    demand: true,
    describe: 'docker creator'
  })
  .usage('Usage: start.js [options]')
  .example('start.js -n foo -p 7100 -s 8888 -r /var/www/gospely/socket',
    'run Gospel socket')
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
  creator = argv.c,
  filePath = argv.f,
  hostName = argv.o;
console.log(filePath);
var imageName = filePath;
if (filePath == 'c++') {
  imageName == cpp;
}
var split = filePath.split(":");



if (split[1] != "lastest") {
  filePath = split[0] + "/" + split[1];
}
//var cloneCmd = " && git clone " + git + "  /var/www/storage/codes/" + name +" && rm -rf .git"

// if(imageName == 'nodejs' || imageName == 'vue-f7'){
//   imageName = 'socket';
// }
if (socketResource == null || socketResource == undefined || socketResource ==
  '') {
  socketResource = "/var/www/gospely/socket";
}

var sshCmd = "echo 'root:" + password + "' | chpasswd ";
var runBash = '';
if (split[0] == 'nodejs') {

  runBash = 'docker run -itd ' +
    ' -v /var/www/storage/codes/' + creator + "/" + name +
    ':/root/workspace  -p ' + port + ':3000 -p ' + appPort +
    ':8086 -p ' +
    sshPort + ':22 ' + ' -h ' + hostName +
    ' -w /root/workspace --name="gospel_project_' + name + '"  gospel-' +
    imageName;
}
console.log(split[0]);
if(split[0] == 'vue-f7') {

  runBash = 'docker run -itd ' +
    ' -v /var/www/storage/codes/' + creator + "/" + name +
    ':/root/workspace  -p ' + port + ':3000 -p ' + appPort +
    ':8086 -p ' +
    sshPort + ':22 ' + ' -h ' + hostName +
    ' -w /root/workspace --name="gospel_project_' + name + '"  gospel-' +
    imageName;
}
if (split[0] == 'php' || split[0] == 'wordpress') {

  runBash =
    'docker run -itd -e "VIRTUAL_HOST=localhost" ' +
    ' -v /var/www/storage/codes/' + creator + "/" + name +
    ':/root/workspace  -p ' + port + ':3000 -p ' + appPort +
    ':80 -p ' +
    sshPort + ':22 ' + ' -h ' + hostName +
    ' -w /root/workspace --name="gospel_project_' + name + '"  gospel-' +
    imageName;
}

console.log(runBash);
exec(
  "bash -c 'cd /var/www/storage/codes/" +
  creator + "/" + name + " && rm -rf .git'");
var result = exec(runBash);

if (result.code !== 0) {
  console.error(result);
} else {
  console.log('Gosple Container is running, SSH: ' + sshPort, 'Socket: ' + port);
}
