const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './index',
	output: {
		path: `${__dirname}/public`,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['es2015', 'react']
				}
			},
			{
				test: /(\.scss|\.css)$/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('bundle.css', {allChunks: true})
	]
};
