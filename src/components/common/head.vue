<template>
  <div class="m-head">
    <i class="iconfont icon-back" @click="goBack"></i>
    <span class="m-tit">{{title}}</span>

    <div class="m-more">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props:{
      title:{
        type: String,
        default: '平安校园'
      },
      to:{
        type: String,
        default: ''
      }
    },
    data(){
      return {};
    },
    mounted(){
      window.RouterTo = this.to;
      window.RouterObj = this;
    },
    methods:{
      goBack(){
//        this.$router.go(-1);
        window.history.back();
        this.$router.isBack=true;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/css/mixin";
  .m-head {
    position: relative;
    width: px2rem(750px);
    height: px2rem(88px);
    line-height: px2rem(88px);
    background-color: #20c475;
    color: #fff;
    z-index: 500;
    .icon-back {
      position: absolute;
      left: 0;
      top: 0;
      padding: 0 px2rem(20px);
      z-index: 5;
      font-size: px2rem(52px);
    }
    .m-tit {
      position: absolute;
      left: px2rem(140px);
      right: px2rem(140px);
      z-index: 5;
      line-height: px2rem(88px);
      font-size: px2rem(40px);
      text-align: center;
      overflow: hidden;
      word-wrap: normal;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .m-more{
      position: absolute;
      top: 0;
      right: 0;
      width: px2rem(120px);
      height: px2rem(88px);
      line-height: px2rem(88px);
      text-align: center;
    }
  }
</style>
