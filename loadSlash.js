require('dotenv').config();
const { Client, Collection } = require('discord.js');

// GUILD === SERVER

const client = new Client({
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
});

let bot = {
	client,
	prefix: 'n.',
	owners: ['719997382380617839'],
};
const guildId = process.env.GUILD_ID;

client.commands = new Collection();
client.events = new Collection();
client.slashcommands = new Collection();

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload);
client.loadCommands = (bot, reload) =>
	require('./handlers/commands')(bot, reload);
client.loadSlashCommands = (bot, reload) =>
	require('./handlers/slashCommands')(bot, reload);

client.loadEvents(bot, false);
client.loadCommands(bot, false);
client.loadSlashCommands(bot, false);

client.on('ready', async () => {
	const guild = client.guilds.cache.get(guildId);

	if (!guild) {
		return console.error('Target guild not found');
	}
	await guild.commands.set([...client.slashcommands.values()]);
	console.log(`Successfully loaded in ${client.slashcommands.size} commands`);
	process.exit(0);
});
