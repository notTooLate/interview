// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './vux'
import filter from './filters/filter'

// import './mock' // 引入的是我们所编写的mockjs文档

//手机端调试
//import vconsole from 'vconsole';

//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: require('../static/img/default-01.png'),
  loading: require('../static/img/photos_default.jpg')
});

// fastclick解决移动浏览器 300 毫秒的等待时间
import FastClick from 'fastclick';
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}

//添加百度echarts   //改组件中引用 减少首次加载时间
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
