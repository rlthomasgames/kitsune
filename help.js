const colors = require('colors');
colors.enable();

console.log('\r ##########'.bgCyan.black.italic)
console.log(' H.E.L.P'.bgCyan.black.italic)
console.log('\r ##########\n'.bgCyan.black.italic)
process.stdout.write("\n\x\r\r\n");
const help = `\n\n\n\n \r\b\X\r
  Lifecycle scripts included in ${process.env.npm_package_name}:
  start
    node server.js
    
    rest server was running mongodb version:
    
    
${process.env.COLORTERM.colors}    
  > mongod --version
    db version v6.1.1
    Build Info: {
        "version": "6.1.1",
        "gitVersion": "nogitversion",
        "openSSLVersion": "OpenSSL 3.1.4 24 Oct 2023",
        "modules": [],
        "allocator": "tcmalloc",
        "environment": {
            "distarch": "x86_64",
            "target_arch": "x86_64"
        }
    }
    
    mongod launch cmd :
    
    > sudo mongod --dbpath ~/mongodb/ --bind_ip 127.0.0.1 --port 27017

available via \`npm run-script\`:
  watch
    run-p watch:build watch:run
    Run in development mode and rebuild/restart when changes are made
  watch
:build
    npm run build:dev -- --watch
    Probably don't need this (would be nice to be able to omit tasks like this)
  watch:run
    nodemon --watch build/ --inspect
    ...`

console.log(`${" 🦊 "}`.bgBlack.cyan.bold.italic.italic);
console.log(`${help}`.bgCyan.black.bold);
console.log(`${" 🦊 "}`.bgBlack.cyan.bold.italic.italic);

`${process.env.SHELL}`
