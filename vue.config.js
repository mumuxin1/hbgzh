module.exports = {
  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://120.77.178.176:8080/shared-power-bank-admin',
        changeOrigin: true,
        ws: true,
        pathRewrite: { }
      }
    }
  }
}
