const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html'
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: isProduction } },
          { loader: 'postcss-loader', options: { sourceMap: isProduction } },
          { loader: 'sass-loader', options: { sourceMap: isProduction } }
        ]
      },
      {
        test: /\.html$/,
        use: [ 'html-loader' ]
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images'
            }
          }
        ]
      }
    ]
  }
};
