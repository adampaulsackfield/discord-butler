const run = async (client, interation) => {
	let member = interation.options.getMember('user');
	let reason = interation.options.getString('reason') || 'No reason given';

	if (!member) {
		return interation.reply('Invalid member');
	}

	try {
		await interation.guild.bans(member, { reason });
		return interation.reply(`${member.user.tag} has been banned for ${reason}`);
	} catch (error) {
		if (error) {
			console.error(error);
			return interation.reply(`Failed to ban ${member.user.tag}`);
		}
	}
};

module.exports = {
	name: 'ban',
	description: 'Ban a member',
	perm: 'KICK_MEMBERS',
	options: [
		{
			name: 'user',
			description: 'The user to ban',
			type: 'USER',
			required: true,
		},
		{
			name: 'reason',
			description: 'Reason for the ban',
			type: 'STRING',
			required: true,
		},
	],
};
