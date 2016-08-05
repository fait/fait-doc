#!/usr/bin/env node

const doc = require('./');

doc.parseMakefiles(process.argv.slice(2))
	.then(doc.formatBlocks)
	.then(console.log, e => {
		console.error(e.stack);
		process.exit(1);
	});
