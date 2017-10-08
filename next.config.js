require('dotenv').config()
const webpack = require('webpack')
module.exports = {
	webpack: (config) => {
		console.log("CONFIG")
		config.plugins.push(
			// Make ENV variables available client side
			new webpack.EnvironmentPlugin([
				'NODE_ENV',
				'API_URL',
				'TICKER',
				'SITE_TITLE',
			])
		)
		return config
	}
}