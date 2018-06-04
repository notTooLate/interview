<template>
  <div id="app">
    <!--<x-header :left-options="{backText: ''}">{{$route.meta.title}}</x-header>-->
    <m-head :title="$route.meta.title"></m-head>

    <transition :name="hasKeep">
      <!--<keep-alive include="teachCheck">-->
        <router-view class="m-router"/>
      <!--</keep-alive>-->
    </transition>

  </div>
</template>

<script>
  import DY from './assets/js/dy'
  import MHead from './components/common/head'

  export default {
    name: 'App',
    components: {MHead},
    data() {
      return {
        hasKeep: 'slide-left',  // 默认动态路由变化为slide-right
      }
    },
    created() {
      window.userid = 'UgbxFT0Kzf4done';

      DY.getTime();   //获得当前时间
      let url = window.location.search;

      let reg = new RegExp("(^|&)" + 'userid' + "=([^&]*)(&|$)", "i");
      let str = url.match(reg);
      if (str) {
        //判断是否是管理员
        DY.post('/wcsApp/index/getUser?userId=3YB9AG1lk4wdone&objectId=mecupxmasjune3dgodone', {}, (data) => {
          console.log('是否管理员', data);
          if (data.code === 0) {
            (data.data.type === 0) && (window.identity = 3);   //管理员
            (data.data.type === 1) && (window.identity = 1);   //学生
            (data.data.type === 2) && (window.identity = 2);   //教师
            (data.data.type === 3) && (window.identity = 1);   //家长
            this.goHome();
          }
        }, true);

      } else {
//        window.identity = 1;   //学生，家长
        window.identity = 2;   //教师
        //window.identity = 3 ;   //管理员
        this.goHome();
      }

      this.$router.afterEach((to, from, next) => {  //设置title
        document.title = to.meta.title;
      });
    },
    methods: {
      goHome() {
        if (window.location.hash === '#/') {
          window.identity === 1 && this.$router.push('/stuHome/come');
          window.identity === 2 && this.$router.push('/teachHome');
          window.identity === 3 && this.$router.push('/adminHome');
        }
      }
    },
    watch: {
      '$route'(to, from) {            //  监听路由变化时的状态为前进还是后退
        let isBack = this.$router.isBack;
        if (isBack) {
          this.hasKeep = 'slide-right';
        } else {
          this.hasKeep = 'slide-left';
        }
        this.$router.isBack = false;
      }
    }
  }
</script>

<style ref="stylesheet/scss" lang="scss">
  @import "assets/css/reset.css";
  @import "assets/css/common.scss";
  @import "assets/css/mixin";
  @import "assets/fonts/iconfont.css";

  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .weui-cell_access .weui-cell__ft {
    padding-right: 30px !important;
  }

  .vux-label {
    font-size: 16px !important;
  }

  .vux-header {
    background-color: #20c475 !important;
  }

  .vux-header .vux-header-left .left-arrow:before {
    border-color: #ffffff !important;
    border-width: 2px 0 0 2px !important;
  }

  .weui-cells:before {
    border: none !important;
  }

  .vux-tab-container, .vux-tab, .vux-tab-item {
    height: px2rem(88px) !important;
    line-height: px2rem(88px) !important;
  }

  .vux-tab .vux-tab-item {
    font-size: 16px !important;
  }

  .vux-x-textarea.weui-cell {
    padding-top: 0 !important;
  }

  /*路由动画*/
  .m-router {
    position: absolute;
    width: 100%;
    transition: all .5s ease;
  }

  .slide-left-enter, .slide-right-leave-active {
    opacity: 0;
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active, .slide-right-enter {
    opacity: 0;
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>
