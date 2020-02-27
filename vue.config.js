module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        //"@":'src' 已默认配置这个别名
        'assets' : '@/assets',
        'common' : '@/common',
        'components' : '@/components',
        'network' : '@/network',
        'views' : '@/views'
      }
    }
  }
}