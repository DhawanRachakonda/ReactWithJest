const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PUBLIC_DOMAIN = 'localhost';
const THIS_SERVER_NAME = 'localhost';

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, 'src/index.js'),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].js',
  },
  devtool: 'source-map',
  module: {
    rules: [
    //   {
    //     enforce: 'pre',
    //     test: /\.(js|jsx)$/,
    //     loader: 'eslint-loader',
    //     exclude: /(node_modules)/,
    //     options: {
    //       emitWarning: true,
    //     },
    //   },
    {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
        }
    },
      {
        test: /\.scss/,
        use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: process.env.NODE_ENV === 'development',
              },
            },
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    
    new CopyWebpackPlugin([{ from:  path.resolve(__dirname, 'dist/assets'), to:  path.resolve(__dirname, 'dist/assets') }]),
    new MiniCssExtractPlugin({
        filename: "style.css"
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'dist/index.html'),
      }),
  ],
  devServer: {
    hot: true,
    inline: true,
    port: 3003,
    public: PUBLIC_DOMAIN,
    proxy: [
      {
        context: ['/api/*'],
        target: {
          host: THIS_SERVER_NAME,
          protocol: 'http:',
          port: 8089,
        },
        secure: false,
        changeOrigin: false,
      },
    ],
  },
};
