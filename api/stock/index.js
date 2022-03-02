const axios = require('axios');

const getStockPrice = async (ticker) => {
	const endpoint = `http://api.marketstack.com/v1/intraday?access_key=${process.env.MARKETSTACK_API_KEY}&symbols=${ticker}&limit=2`;

	const res = await axios.get(endpoint);

	return res.data;
};

module.exports = { getStockPrice };
