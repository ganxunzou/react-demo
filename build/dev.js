var express = require('express'),
  webpack = require('webpack'),
  // favicon = require('express-favicon'),
  config = require('./webpack.dev.conf'),
  app = express();

var compiler = webpack(config);

// var commonPath = {
//   rootPath: rootPath,
//   dist: path.join(rootPath, 'dist'), // build 后输出目录
//   indexHTML: path.join(src, 'index.html'), // 入口基页
//   staticDir: path.join(rootPath, 'static'), // 无需处理的静态资源目录
// };
// for highly stable resources
app.use('/static', express.static('static'));
// app.use('/static', express.static('/dist/static/'));

// app.use(favicon(path.join(__dirname, '../favicon.ico')));

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(
  require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }),
);

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler));
// app.use(require('webpack-hot-middleware')(compiler));

app.listen(9000, '127.0.0.1', function(err) {
  err && console.log(err);
});
