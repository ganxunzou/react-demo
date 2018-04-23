var webpack = require('webpack'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  // ExtractTextPlugin = require('extract-text-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  SOURCE_MAP = true; // 大多数情况下用不到
// SOURCE_MAP = false;

config.mode = 'development';
config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.devtool = SOURCE_MAP ? 'cheap-source-map' : false;

// add hot-reload related code to entry chunk
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  'webpack/hot/only-dev-server',
  config.entry.app,
];

config.output.publicPath = '/';

// 开发环境下直接内嵌 CSS 以支持热替换
config.module.rules.push(
  {
    test: /\.css$/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader'}
    ]
  },
  {
    test: /\.less$/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader'},
      {loader: 'less-loader'}
    ]
  },
  {
    test: /\.scss$/,
    use: [
      {loader: 'style-loader'},
      {loader: 'css-loader'},
      {loader: 'sass-loader'}
    ]
  },
);

config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  // new webpack.NoErrorsPlugin(),
  // new ExtractTextPlugin('[name].css'),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    title: 'react-boilerplate-dev',
    // chunks: ['App', 'vendor'], // 指定要加入的entry实例,
    inject: 'body',
  }),
  new BrowserSyncPlugin(
    {
      host: '127.0.0.1',
      port: 9090,
      proxy: 'http://127.0.0.1:9000/',
      logConnections: false,
      notify: false,
    },
    {
      reload: false,
    },
  ),
);

module.exports = config;
