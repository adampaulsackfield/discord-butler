const { getStockPrice } = require('../../api/stock/index');

module.exports = {
	name: 'stock',
	category: 'info',
	permissions: [],
	devOnly: false,
	run: async ({ client, message, args }) => {
		let data = await getStockPrice(args[0].toUpperCase());
		message.reply(
			`Stock Price for ${args[0].toUpperCase()} is ${data.data[0].open}`
		);
	},
};
