const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('./src'))
      .set('assets', resolve('./src/assets'))
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('static', resolve('src/static'))
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //路径指向本地主机地址及端口号
        ws: true,
        changeOrigin: true,
        pathRewrite:{
          '^/api': '/data' //路径转发代理
        }
      }
    }
  }
}

