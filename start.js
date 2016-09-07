#!/usr/bin/env node

require('shelljs/global');
var argv = require('yargs')
  .option('n', {
    alias : 'name',
    demand: true,
    describe: 'container name',
    type: 'string'
  })
  .option('p', {
    alias : 'port',
    demand: true,
    describe: 'container port to be exposed',
  })
  .option('s', {
    alias : 'sshport',
    demand: true,
    describe: 'container ssh port to be exposed',
  })
  .usage('Usage: start.js [options]')
  .example('start.js -n foo -p 7100 -sp 8888', 'run Gospel docker')
  .help('h')
  .alias('h', 'help')
  .epilog('gospel copyright 2015')
  .argv;

var name = argv.n,
    port = argv.p,
    sshPort = argv.s;

var runBash = "docker run -d --name " + name  + " -p " + port + ":8181 -v /var/www/c9sdk/plugins:/var/.gospel/plugins -v /var/www/c9sdk/node_modules:/var/.gospel/node_modules -v /var/www/c9sdk/NOTICE:/var/.gospel/NOTICE -v /var/www/c9sdk/README.md:/var/.gospel/README.md -v /var/www/c9sdk/bin:/var/.gospel/bin -v /var/www/c9sdk/docs:/var/.gospel/docs -v /var/www/c9sdk/:/var/.gospel/integrations -v /var/www/c9sdk/package.json:/var/.gospel/package.json -v /var/www/c9sdk/scripts:/var/.gospel/scripts -v /var/www/c9sdk/server.js:/var/.gospel/server.js -v /var/www/c9sdk/test:/var/.gospel/test -v /var/www/c9sdk/build:/var/.gospel/build -v /var/www/c9sdk/configs:/var/.gospel/configs -v /var/www/c9sdk/local:/var/.gospel/local -v /var/www/c9sdk/settings:/var/.gospel/settings -v /var/www/c9sdk/.git:/var/.gospel/.git -p " + sshPort + ":22 gospel:latest -D";

var result = exec(runBash);

if(result.code !== 0) {
   console.error(result);
}else {
   console.log('Gosple docker is running, ssh: ' + sshPort, 'IDE port: ' + port);
}
