const { getStockPrice } = require('../../api/stock/index');

module.exports = {
	name: 'stock',
	category: 'info',
	permissions: [],
	devOnly: false,
	run: async ({ client, message, args }) => {
		const ticker = args[0].toUpperCase();
		let data = await getStockPrice(ticker);
		message.reply(`Stock Price for ${ticker} is ${data.open}`);
	},
};
