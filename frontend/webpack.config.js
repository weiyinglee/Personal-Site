
module.exports = {
	entry: "./src/javascripts/app.js",
	output: {
		path: "./src/javascripts/",
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ["react-hot", 'babel?presets[]=es2015,presets[]=stage-0,presets[]=react'],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				loaders: ["style-loader", "css-loader", "sass-loader"]
			},
			{
				loaders: ["url-loader", "img-loader"],
				test: /\.png$/
			}
		]
	}
}