const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  productionSourceMap: false,//打包后不会有map文件（map文件用于输出代码报错的位置）
  transpileDependencies: true,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api': '' },
      }
    }
  }
})
