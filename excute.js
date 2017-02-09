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
  .option('c', {
    alias: 'command',
    demand: false,
    describe: 'excute command',
  })
  .option('f', {
    alias: 'script file name',
    demand: false,
    describe: 'script file name',
  })
  .usage('Usage: excute.js [options]')
  .example('start.js -n foo -f start.sh -p 7100 -c "npm start"',
    'run Gospel socket')
  .help('h')
  .alias('h', 'help')
  .epilog('Gospely Copyright 2016')
  .argv;

var name = argv.n,
  port = argv.p,
  command = argv.c,
  file = argv.f;
var runBash = 'sh /root/gospely/deploy/shell/boot/' + file + ' ' + name + ' ' + port;

if(command != null && command!= undefined) {
    runBash = runBash + " '" + command + "'";
}
console.log(runBash);
exec();
var result = exec(runBash);

if (result.code !== 0) {
  console.error(result);
} else {
  console.log('success');
}
