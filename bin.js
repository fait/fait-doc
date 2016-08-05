#!/usr/bin/env node

const doc = require('./');
const path = require('path');

const makefiles = process.argv.slice(2).map(file =>
	path.relative(process.cwd(), path.resolve(file))
);

doc.parseMakefiles(makefiles)
	.then(doc.formatBlocks)
	.then(console.log, e => {
		console.error(e.stack);
		process.exit(1);
	});
