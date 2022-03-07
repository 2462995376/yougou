// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import {
  $http
} from '@escook/request-miniprogram'

Vue.config.productionTip = false
uni.$http = $http
App.mpType = 'app'

$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 请求完成之后做一些事情
$http.afterRequest = function() {
  uni.hideLoading()
}

uni.$showMsg=function(title="数据加载失败",duration=1500){
  return uni.showToast({
    title,
    duration,
    icon:'none'
  })
}

const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
