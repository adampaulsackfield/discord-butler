require('dotenv').config();
const { Client, Collection } = require('discord.js');

const client = new Client({
	intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'],
});

let bot = {
	client,
	prefix: 'bot.',
	owners: ['719997382380617839'],
};

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

client.on('interactionCreate', (interaction) => {
	if (!interaction.isCommand()) return;

	if (!interaction.isGuild()) {
		return interaction.reply('This command can only used in a server');
	}

	const slashCmd = client.slashcommands.get(interaction.commandName);
	if (!slashCmd) return interaction.reply('Invalid slash command');

	if (
		slashCmd.perms &&
		!interaction.member.permissions.has(slashcommand.perm)
	) {
		return interaction.reply('You do not have permission for this command');
	}

	slashCmd.run(client, interaction);
});

module.exports = bot;

client.login(process.env.TOKEN);
