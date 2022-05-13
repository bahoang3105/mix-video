const path = require('path');
const webpack = require('webpack');
const Config = require('webpack-config').default;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const PROD_ENV = require('./prod.config');

const NODE_ENV = process.env.NODE_ENV || 'development';
const API_URL = NODE_ENV === 'production' ? PROD_ENV.API_URL : 'http://localhost:3001';
const RTMP_URL = NODE_ENV === 'production' ? PROD_ENV.RTMP_URL : 'http://localhost:8008';
const WEBRTC_URL = NODE_ENV === 'production' ? PROD_ENV.WEBRTC_URL : 'ws://localhost:3333';
const SOCKET_URL = NODE_ENV === "production" ? PROD_ENV.SOCKET_URL : 'http://localhost:3001';
const config = new Config().merge({
	mode: NODE_ENV === 'production' ? NODE_ENV : 'development',
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../build'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
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
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"' + NODE_ENV + '"',
			'process.env.API_URL': '"' + API_URL + '"',
			'process.env.RTMP_URL': '"' + RTMP_URL + '"',
			'process.env.WEBRTC_URL': '"' + WEBRTC_URL + '"',
			'process.env.SOCKET_URL': '"' + SOCKET_URL + '"',
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html',
		}),
		new NodePolyfillPlugin(),
	],
	externals: {
		'React': 'react',
	},
	watch: process.env.WATCH === 'true'
});

module.exports = config;