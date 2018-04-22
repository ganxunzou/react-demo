# 升级 react , react-dom
## react-hot-loader 升级
- react-hot-loader 升级最新
- webpack.base.conf.js
```
if (env === 'development') {
    // _loaders.unshift('react-hot');
}
```
- .babelrc 增加react-hot-loader配置
```
"plugins": [
    "react-hot-loader/babel"
]
```

# 升级webpack
