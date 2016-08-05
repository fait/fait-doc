const parseMakeDefinitions = require('@quarterto/parse-make-definitions');
const parseMakeCommentBlocks = require('@quarterto/parse-make-comment-blocks');
const groupBy = require('lodash.groupby');
const fs = require('mz/fs');

const parse = src => parseMakeCommentBlocks(src).map(block => {
	block.definition = parseMakeDefinitions(block.nextLine);
	return block;
});

const variableEmoji = {
	recursive: '🚩',
	simple: '📌',
	append: '📎',
	multiline: '💬',
};

const formatLink = (lineNo, file) =>
	`[🔗](${file}#L${lineNo})`;

const formatDefinition = (def, file) => {
	switch(def.type) {
		case 'variable':
			return `${variableEmoji[def.flavour]} \`$(${def.name})\``;
		case 'rule':
			if(def.targets) { // static pattern rule
				return `📑 \`${def.targets}\`: \`${def.pattern}\` ⬅️ \`${def.prerequisites}\``;
			}

			if(def.prerequisites) { // ordinary pattern or explicit rule
				return `${def.target.indexOf('%') >= 0 ? '📝' : '📄'} \`${def.target}\` ⬅️ \`${def.prerequisites}\``;
			}

			// simple explicit rule
			return `📃 \`${def.target}\``;
	}
};

const format = fn => parts => parts.map(fn).join('\n\n');

const formatBlock = (block) => `#### ${formatDefinition(block.definition)} ${block.lineNumber ? formatLink(block.lineNumber, block.file) : ''}

${block.comment}`;
const formatBlocks = format(formatBlock);

const formatSection = group => ({title, section}) => group[section].length ? `### ${title}

${formatBlocks(group[section])}` : '';
const formatSections = group => format(formatSection(group));

exports.parseMakefiles = files => Promise.all(files.map(
	file => fs.readFile(file, 'utf8').then(src =>
		parse(src).map(block => (block.file = file, block))
	)
)).then(
	files => files.reduce(
		(allBlocks, blocks) => allBlocks.concat(blocks),
		[]
	)
);

exports.formatBlocks = blocks => formatSections(groupBy(
	blocks.filter(block => block.definition),
	block => block.definition.flavour === 'multiline' ? 'function' : block.definition.type
))([
	{title: 'Rules', section: 'rule'},
	{title: 'Variables', section: 'variable'},
	{title: 'Functions', section: 'function'},
]);
