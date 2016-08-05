const parseMakeDefinitions = require('@quarterto/parse-make-definitions');
const parseMakeCommentBlocks = require('@quarterto/parse-make-comment-blocks');
const groupBy = require('lodash.groupby');

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

const formatDefinition = def => {
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


const formatBlock = block => `#### ${formatDefinition(block.definition)}

${block.comment}`;
const formatBlocks = format(formatBlock);

const formatSection = group => ({title, section}) => group[section].length ? `### ${title}

${formatBlocks(group[section])}` : '';
const formatSections = group => format(formatSection(group));

module.exports = src => formatSections(groupBy(
	parse(src).filter(block => block.definition),
	block => block.definition.flavour === 'multiline' ? 'function' : block.definition.type
))([
	{title: 'Rules', section: 'rule'},
	{title: 'Variables', section: 'variable'},
	{title: 'Functions', section: 'function'},
]);
