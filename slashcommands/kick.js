const run = async (client, interation) => {
	let member = interation.options.getMember('user');
	let reason = interation.options.getString('reason') || 'No reason given';

	if (!member) {
		return interation.reply('Invalid member');
	}

	try {
		await interation.guild.members.kick(member, reason);
		return interation.reply(`${member.user.tag} has been kicked for ${reason}`);
	} catch (error) {
		if (error) {
			console.error(error);
			return interation.reply(`Failed to kick ${member.user.tag}`);
		}
	}
};

module.exports = {
	name: 'kick',
	description: 'Kick a member',
	perm: 'KICK_MEMBERS',
	options: [
		{
			name: 'user',
			description: 'The user to timeout',
			type: 'USER',
			required: true,
		},
		{
			name: 'reason',
			description: 'Reason for the kick',
			type: 'STRING',
			required: true,
		},
	],
};
