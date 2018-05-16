var webpack = require('webpack'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  path = require('path'),
  // ExtractTextPlugin = require('extract-text-webpack-plugin'),
  SOURCE_MAP = false;

const UglifyJsPlugin = require('webpack-parallel-uglify-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

var rootPath = path.resolve(__dirname, '..'), // 项目根目录
  src = path.join(rootPath, 'src'); // 开发源码目录
var commonPath = {
  rootPath: rootPath,
  dist: path.join(rootPath, 'dist'), // build 后输出目录
  indexHTML: path.join(src, 'index.html'), // 入口基页
  staticDir: path.join(rootPath, 'static'), // 无需处理的静态资源目录
};

config.mode = 'production';
config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[name].[chunkhash:6].js';

config.devtool = SOURCE_MAP ? 'source-map' : false;

// 生产环境下分离出 CSS 文件
config.module.rules.push(
  {
    enforce: 'pre',
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    // options: {
    //   fix: true,
    //   cache: true,
    //   formatter: require('eslint-friendly-formatter'),
    // },
  },
  {
    test: /\.css$/,
    use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
  },
  {
    test: /\.less$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
      { loader: 'less-loader' },
    ],
  },
  {
    test: /\.scss$/,
    use: [
      { loader: MiniCssExtractPlugin.loader },
      { loader: 'css-loader' },
      { loader: 'sass-loader' },
    ],
  },
);

// webpack4 new attribute
config.optimization = {
  minimize: true,
  minimizer: [
    new UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        pure_funcs: ['console.log'],
      },
      cache: true,
      parallel: true,
      sourceMap: true, // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
  // runtimeChunk: 'single',
  splitChunks: {
    chunks: 'async',
    minSize: 200 * 1024, // 200K
    minChunks: 2,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    name: true,
    cacheGroups: {
      default: {
        minChunks: 1,
        priority: -20,
        reuseExistingChunk: true,
      },
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
      },
      styles: {
        name: 'styles',
        test: /\.(css|less|sacc)$/,
        chunks: 'all',
        enforce: true,
      },
    },
  },
};

config.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[name].[hash:6].css',
  }),
  new CleanWebpackPlugin('dist', {
    root: commonPath.rootPath,
    verbose: false,
  }),
  new CopyWebpackPlugin([
    // 复制高度静态资源
    {
      context: commonPath.staticDir,
      from: '**/*',
      ignore: ['*.md'],
    },
  ]),
  // new webpack.optimize.DedupePlugin(),
  // new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     warnings: false,
  //   },
  // }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  // new webpack.optimize.CommonsChunkPlugin({
  //   // 公共代码分离打包
  //   names: ['vendor', 'mainifest'],
  // }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000,
  }),
  // new ExtractTextPlugin('[name].[contenthash:6].css', {
  //   allChunks: true, // 若要按需加载 CSS 则请注释掉该行
  // }),
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: 'src/index.html',
    title: 'react-boilerplate-dev',
    // chunks: ['App', 'vendor'], // 指定要加入的entry实例,
    inject: 'body',
  }),
  new webpack.optimize.ModuleConcatenationPlugin(),
);

module.exports = config;
