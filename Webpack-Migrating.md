# Webpack 迁移到V4版本指南

## 需要升级的npm库列表

* "webpack": "^4.6.0",
* "webpack-cli": "^2.0.15",
* "webpack-dev-middleware": "^3.1.2",
* "webpack-hot-middleware": "^2.22.1",
* "file-loader": "^1.1.11",
* "url-loader": "^1.0.1",
* "html-webpack-plugin": "^3.2.0",
* "less": "^3.0.4",
* "less-loader": "^4.1.0",


## webpack.config.js 调整


### plugins 配置调整
* remove extract-text-webpack-plugin
* remove NoErrorsPlugin
* remove DedupePlugin
* remove NamedModulesPlugin
* remove HashedModulesPlugin
* rename webpack.optimize.OccurenceOrderPlugin to webpack.optimize.OccurrenceOrderPlugin
* remove CommonsChunkPlugin 改用 optimization.runtimeChuck 和 optimization.splitChunks
* uglifyjs-webpack-plugin 默认情况，optimization.minimize = true, webpack 会自动加上此配置，如果不作特别处理，可以删除。
* add mini-css-extract-plugin （替换extract-text-webpack-plugin，实现css抽离到单独文件）
* add optimize-css-assets-webpack-plugin （优化css资源）

  我的插件列表：

  ```JS
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
  );
  ```


### 增加 `optimization`

```JS
onfig.optimization = {
  minimize: true,
  minimizer: [
    // 
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true, // set to true if you want JS source maps
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
  // runtimeChunk: 'single', // 测试发现这个设置成true或者single首页空白，无任何报错，因此暂时不做设置。
  splitChunks: {
    chunks: 'all',
    minSize: 30000,
    minChunks: 1,
    maxAsyncRequests: 5,
    maxInitialRequests: 3,
    automaticNameDelimiter: '~',
    name: true,
    cacheGroups: {
      vendors: {
        name: 'vendors',
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
      },
      default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true,
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

```


### 添加 mode
* 开发环境添加

  ```JS
  module.exports = {
    mode: 'development'
  }
  ```

* 生产环境

  ```JS
  module.exports = {
    mode: 'production'
  }
  ```

### module 配置调整

module.loaders 变成 module.rules

```JS
module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ]
}

// change
// 注意新版本的loader不能省略，即：style-loader 不能写成 style
module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"]},
          {loader: "css-loader"]},
        ]
      },
    ]
}
```


# Q&A

* `Error: Cannot find module 'webpack/lib/ConcatSource'`

  解决办法，移除：extract-text-webpack-plugin插件。（这里需要考虑如何抽离CSS）

* `OccurenceOrderPlugin has been renamed to OccurrenceOrderPlugin`

  解决办法，修改 OccurenceOrderPlugin 成 OccurrenceOrderPlugin

* `ERROR in ./assets/images/icons/search.svg`

  详细报错信息如下：

  ```
  ERROR in ./assets/images/icons/search.svg
  Module build failed: TypeError: Cannot read property 'context' of undefined
      at Object.loader (/Users/drew/Sites/my-site/node_modules/file-loader/dist/index.js:34:49)
  @ ./styles.sass 6:40863-40906
  ```

  解决办法：升级 `url-loader` 和 `file-loader`

* `Cannot read property 'lessLoader' of undefined`

  详细报错信息如下：

  ```
  ERROR in ./src/views/antdemo.less
  Module build failed: ModuleBuildError: Module build failed: TypeError: Cannot read property 'lessLoader' of undefined
      at Object.module.exports (/Users/gxz/workspace_js/react-demo/node_modules/less-loader/index.js:50:18)
      at runLoaders (/Users/gxz/workspace_js/react-demo/node_modules/webpack/lib/NormalModule.js:244:20)
      at /Users/gxz/workspace_js/react-demo/node_modules/loader-runner/lib/LoaderRunner.js:364:11
      at /Users/gxz/workspace_js/react-demo/node_modules/loader-runner/lib/LoaderRunner.js:230:18
      at runSyncOrAsync (/Users/gxz/workspace_js/react-demo/node_modules/loader-runner/lib/LoaderRunner.js:143:3)
      at iterateNormalLoaders (/Users/gxz/workspace_js/react-demo/node_modules/loader-runner/lib/LoaderRunner.js:229:2)
      at Array.<anonymous> (/Users/gxz/workspace_js/react-demo/node_modules/loader-runner/lib/LoaderRunner.js:202:4)
      at Storage.finished (/Users/gxz/workspace_js/react-demo/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:43:16)
      at provider (/Users/gxz/workspace_js/react-demo/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:79:9)
      at /Users/gxz/workspace_js/react-demo/node_modules/graceful-fs/graceful-fs.js:78:16
      at FSReqWrap.readFileAfterClose [as oncomplete] (fs.js:532:3)
  @ ./src/views/antddemo.js 44:0-25
  @ ./src/routes/antd.js
  @ ./src/routes/index.js
  ```
  
  解决办法：升级 `less` 和 `less-loader`