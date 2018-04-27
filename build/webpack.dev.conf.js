var webpack = require('webpack'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  // ExtractTextPlugin = require('extract-text-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  SOURCE_MAP = true; // 大多数情况下用不到
// SOURCE_MAP = false;

config.mode = 'development';
config.output.filename = '[name].js';
config.output.chunkFilename = '[name].js';

config.devtool = SOURCE_MAP ? 'cheap-source-map' : false;

// add hot-reload related code to entry chunk
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  'webpack/hot/only-dev-server',
  config.entry.app,
];

config.output.publicPath = '/';

// 开发环境 eslint 缓存提高开发效率
config.module.rules.push({
  enforce: 'pre',
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    fix: true,
    cache: true,
    formatter: require('eslint-friendly-formatter'),
  },
});

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
