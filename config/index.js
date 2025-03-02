// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 1333,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {},
    proxyTable:{
      // "/gw": {
      //   // target: "http://localhost:28027/gw/op", // mono
      //   target: "http://localhost:28087/gw", // gw
      //   // target: "http://114.132.243.79:28087/gw", //设置调用的接口域名和端口
      //   changeOrigin: true,
      //   pathRewrite: {
      //     "^/gw": "" //用'/api' 代替 'http://218.78.187.216/api/v1'
      //   }
      // }
      "/gw/op": {
        target: "http://192.168.1.125:28027/gw/op", // mono
        // target: "http://114.132.243.79:28027/gw/op", //设置调用的接口域名和端口
        changeOrigin: true,
        pathRewrite: {
          "^/gw/op": "" //用'/api' 代替 'http://218.78.187.216/api/v1'
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
