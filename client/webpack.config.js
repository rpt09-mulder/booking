const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {


return {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './public'),
    filename: './app.js'
  },
  module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" }
          ]
        }
      ]
    },


    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ]
  }
}