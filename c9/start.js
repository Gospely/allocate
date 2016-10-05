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
  .option('r', {
    alias: 'resource',
    demand: true,
    describe: 'the source of gospel ide'
  })
  .usage('Usage: start.js [options]')
  .example('start.js -n foo -p 7100 -s 8888 -r /var/www/gospel', 'run Gospel docker')
  .help('h')
  .alias('h', 'help')
  .epilog('gospel copyright 2015')
  .argv;

var name = argv.n,
    port = argv.p,
    sshPort = argv.s,
    src = argv.r;

var runBash = "docker run -d --name " + name  + " -p " + port + ":8181 -v " + src + "/plugins:/var/.gospel/plugins -v " + src + "/node_modules:/var/.gospel/node_modules -v " + src + "/NOTICE:/var/.gospel/NOTICE -v " + src + "/README.md:/var/.gospel/README.md -v " + src + "/bin:/var/.gospel/bin -v " + src + "/docs:/var/.gospel/docs -v " + src + "/:/var/.gospel/integrations -v " + src + "/package.json:/var/.gospel/package.json -v " + src + "/scripts:/var/.gospel/scripts -v " + src + "/server.js:/var/.gospel/server.js -v " + src + "/test:/var/.gospel/test -v " + src + "/build:/var/.gospel/build -v " + src + "/configs:/var/.gospel/configs -v " + src + "/local:/var/.gospel/local -v " + src + "/settings:/var/.gospel/settings -v " + src + "/.git:/var/.gospel/.git -p " + sshPort + ":22 ivydom/gospel:latest -D";

var result = exec(runBash);

if(result.code !== 0) {
   console.error(result);
}else {
   console.log('Gosple docker is running, ssh: ' + sshPort, 'IDE port: ' + port);
}
