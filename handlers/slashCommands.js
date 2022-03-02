const fs = require('fs');
const { getFiles } = require('../utils/functions');

module.exports = (bot, reload) => {
	const { client } = bot;

	let slashCommands = getFiles(`./slashcommands/`, '.js');

	if (slashCommands.length === 0) {
		console.log('No slash commands loaded');
	}

	slashCommands.forEach((file) => {
		if (reload) {
			delete require.cache[require.resolve(`../slashcommands/${file}`)];
		}

		const slashCmd = require(`../slashcommands/${file}`);
		client.slashcommands.set(slashCmd.name, slashCmd);
	});
};
