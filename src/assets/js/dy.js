/**************************************************
 *  大洋移动功能组件
 *  时间: 2017-05-06
 *  说明：所有组件都作为DY变量的子内容
 ************************************************ */
import Vue from 'vue'
import Axios from 'axios';
import {ToastPlugin, LoadingPlugin} from 'vux'

Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);

console.log('<<<<>>>>>', process.env);
let BASE_API = 'https://easy-mock.com/mock/5ae43c473ed818654bc27fdf';
// let BASE_API = '';
// let BASE_API = '';
// if(process.env.ENV === 'dev'){ // 开发环境
//   BASE_API = '';
// }else if(process.env.ENV === 'test'){ // 测试环境
//   BASE_API = '';
// }else if(process.env.ENV === 'integrate'){ //生产环境
//   BASE_API = '';
// }


const DY = {
  getTime(txt) {
    let date = new Date();//当前时间
    let year = date.getFullYear();  //年
    let month = zeroFill(date.getMonth() + 1);//月
    let day = zeroFill(date.getDate());//日
    let hour = zeroFill(date.getHours());//时
    let minute = zeroFill(date.getMinutes());//分
    let second = zeroFill(date.getSeconds());//秒
    let week = "星期" + "日一二三四五六".charAt(new Date().getDay());

    if (txt === 'YYYY-MM') {
      return year + '-' + month;
    }
    if (txt === 'YYYY-MM-DD') {
      return year + '-' + month + '-' + day;
    }
    if (txt === 'YYYY-MM-DD HH:mm:ss') {
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }
    if (txt === 'HH:mm') {
      return hour + ':' + minute;
    }
    if (txt === 'week') {
      return week;
    }
    window.current = year + '-' + month;

    function zeroFill(i) {
      return i < 10 ? '0' + i : i;
    }
  },
  toast(cont, type) {  // 吐司， 弹出一个弹出，1.2秒消失
    Vue.$vux.toast.show({
      text: cont,
      type: type || 'text', width: "15em",
      time: 1200
    });
  },
  loading() {   // 数据预加载动画
    Vue.$vux.loading.show({
      text: "加载中..."
    });
  },
  loaded() {   // 数据加载完成，关闭加载动画
    Vue.$vux.loading.hide();
  },
  post(url, params, back, loading, fail) {  // post请求封装
    if (typeof(loading) === 'undefined' || loading) {  // 有些不需要加载
      Vue.$vux.loading.show({
        text: "加载中..."
      });
    }
    Axios.post(BASE_API + url, params).then(response => {
      if (typeof(loading) === 'undefined' || loading) {
        Vue.$vux.loading.hide();
      }
      const data = response.data;
      if (data.code === 0) {
        if (typeof back === "function") {
          back(data);
        }
      } else {
        if (typeof fail === "function") {
          fail();
        }
        Vue.$vux.toast.show({
          text: data.msg || '接口错误',
          type: 'text',
          width: "20em",
          time: 1200
        });
      }
    }).catch(error => {
      if (typeof(loading) === 'undefined' || loading) {
        Vue.$vux.loading.hide();
      }
      if (typeof fail === "function") {
        fail();
      }
      Vue.$vux.toast.show({
        text: error.message || '接口错误',
        type: 'warn',
        width: "20em",
        time: 1200
      });
    });
  },
  get(url, back, loading, fail) {         // get请求封装
    if (typeof(loading) === 'undefined' || loading) {
      Vue.$vux.loading.show({
        text: "加载中..."
      });
    }
    Axios.get(BASE_API + url).then(response => {
      if (typeof(loading) === 'undefined' || loading) {
        Vue.$vux.loading.hide();
      }

      const data = response.data;
      if (data.code == 0) {
        if (typeof back === "function") {
          back(data);
        }
      } else {
        if (typeof fail === "function") {
          fail();
        }
        Vue.$vux.toast.show({
          text: data.msg || '接口错误',
          type: 'text',
          width: "20em",
          time: 1200
        });
      }
    }).catch(error => {
      if (typeof(loading) === 'undefined' || loading) {
        Vue.$vux.loading.hide();
      }
      if (typeof fail === "function") {
        fail();
      }
      Vue.$vux.toast.show({
        text: error.message || '接口错误',
        type: 'warn',
        width: "20em",
        time: 1200
      });
    });
  }
};

export default DY;




