#!/usr/bin/env node

const doc = require('./');
const fs = require('fs');

console.log(doc(fs.readFileSync(process.argv[2], 'utf-8')));
