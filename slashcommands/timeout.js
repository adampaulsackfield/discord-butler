const durations = [
	{ name: '60 seconds', value: 60 * 1000 },
	{ name: '5 minutes', value: 5 * 60 * 1000 },
	{ name: '10 minutes', value: 10 * 60 * 1000 },
	{ name: '30 minutes', value: 30 * 60 * 1000 },
	{ name: '1 hour', value: 60 * 60 * 1000 },
	{ name: '1 day', value: 24 * 60 * 60 * 1000 },
	{ name: '1 week', value: 7 * 24 * 60 * 60 * 1000 },
];

const run = async (client, interation) => {
	let member = interation.options.getMember('user');
	let duration = interation.options.getNumber('duration');
	let reason = interation.options.getString('reason') || 'No reason given';

	if (!member) {
		return interation.reply('Invalid member');
	}

	try {
		await member.timeout(duration, reason);
		return interation.reply(
			`${member.user.tag} has been timed out for ${
				durations.find((d) => duration === d.value)?.name
			} with a reason of ${reason}`
		);
	} catch (error) {
		if (error) {
			console.error(error);
			return interation.reply(`Failed to timeout ${member.user.tag}`);
		}
	}
};

module.exports = {
	name: 'timeout',
	description: 'Timeout a member',
	perm: 'MODERATE_MEMBERS',
	options: [
		{
			name: 'user',
			description: 'The user to timeout',
			type: 'USER',
			required: true,
		},
		{
			name: 'duration',
			description: 'The duration of the timeout',
			type: 'NUMBER',
			choices: durations,
			required: true,
		},
		{
			name: 'reason',
			description: 'Reason for the timeout',
			type: 'STRING',
			required: true,
		},
	],
};
