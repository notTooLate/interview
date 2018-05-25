import Vue from 'vue'
import axios from 'axios'

import {ToastPlugin, LoadingPlugin} from 'vux'

Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);


axios.defaults.timeout = 10000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www=form-urlencoded';

let BASE_API = 'https://easy-mock.com/mock/5ae43c473ed818654bc27fdf';
// let BASE_API = '';

export default {
  fetchGet(url, params = {}, loading) {
    if (!loading) {
      Vue.$vux.loading.show({
        text: "加载中..."
      });
    }
    return new Promise((resolve, reject) => {
      axios.get(url, params).then(res => {
        Vue.$vux.loading.hide();
        if (res.data.code !== 0) {
          Vue.$vux.toast.show({
            text: res.data.msg || '参数有误',
            type: 'text',
            width: "20em",
            time: 1500
          });
        }
        resolve(res.data)
      }).catch(error => {
        Vue.$vux.loading.hide();
        Vue.$vux.toast.show({
          text: error.message || '接口错误',
          type: 'text',
          width: "20em",
          time: 1500
        });
        reject(error)
      })
    })
  },

  fetchPost(url, params = {}, loading) {
    if (!loading) {
      Vue.$vux.loading.show({
        text: "加载中..."
      });
    }
    return new Promise((resolve, reject) => {
      axios.post(BASE_API + url, params).then(res => {
        Vue.$vux.loading.hide();
        if (res.data.code !== 0) {
          Vue.$vux.toast.show({
            text: res.data.msg || '参数有误',
            type: 'text',
            width: "20em",
            time: 1500
          });
        }
        resolve(res.data)
      }).catch(error => {
        Vue.$vux.loading.hide();
        Vue.$vux.toast.show({
          text: error.message || '接口错误',
          type: 'text',
          width: "20em",
          time: 1500
        });
        reject(error)
      })
    })
  }
}
