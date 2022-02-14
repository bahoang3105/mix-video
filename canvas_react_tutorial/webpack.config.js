const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'build'),
	},
	devServer: {
		static: path.join(__dirname, 'build'),
		compress: true,
		port: 3000,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /node_module/,
				use: ['style-loader', 'css-loader'],
			},

			{
				test: /\.js$/,
				exclude: /node_module/,
				loader: 'babel-loader',
				options: {
					presets: [
						['@babel/preset-env', { targets: { esmodules: true } }],
						['@babel/preset-react', { targets: { esmodules: true }, runtime: "automatic" }],
					]
				},
			},

			{
				test: /\.(png|jpe?g|gif)$/i,
				exclude: /node_module/,
				loader: 'file-loader'
			}
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html',
		}),
	],
	mode: 'development',
	externals: {
		'React': 'react',
	},
}