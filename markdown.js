#!/usr/bin/env node

var marked = require('marked');
var TerminalRenderer = require('marked-terminal');
var fs = require('fs');

marked.setOptions({
  renderer: new TerminalRenderer(),
});

console.log(marked(fs.readFileSync(process.argv[2], 'utf8').replace(/^##/mg, '')));
