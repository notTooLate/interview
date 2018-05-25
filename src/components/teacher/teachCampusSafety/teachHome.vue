<template>
  <div class="page">
    <ul class="m-box">
      <li class="m-item" @click="$router.push('/myCheck/comings')">
        <img src="../../../../static/img/bg-kaoqin.jpg">
        <div class="m-pos">
          <img src="../../../../static/img/icon-kaoqin.png">
          <p>我的考勤</p>
        </div>
      </li>
      <li class="m-item" @click="$router.push('/mySpending')">
        <img src="../../../../static/img/bg-kaoqin.jpg">
        <div class="m-pos">
          <img src="../../../../static/img/icon-kaoqin.png">
          <p>我的消费</p>
        </div>
      </li>
      <li class="m-item" v-for="(item,index) in classList" @click="goTo(item)">
        <img src="../../../../static/img/bg-class.jpg">
        <div class="m-pos">
          <img src="../../../../static/img/icon-class.png">
          <p>{{item.departname}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import DY from '@/assets/js/dy'
  import {billRecord} from '../../../api/index.js'

  export default {
    components: {},
    data() {
      return {
        classList: [],
        className:''
      }
    },
    created() {
      DY.get('/wcsApp/teacher/manageClassList?userid=UgbxFT0Kzf4done', (data) => {
        console.log('教师-班级列表',data);
        if (data.code === 0) {
          this.classList = data.data.list;
        }
      }, true)
    },
    methods: {
      goTo(item) {
        this.className = item.departname;

        this.$router.push({name: 'teachCheck', params: {id: item.departid, name: item.departname}});
      }
    },
    mounted() {
      //api 接口集合写法
//      billRecord({userid:'6mYY0oL6jY4done',time:'2018-05'},true).then((data) => {
//        console.log('test',data);
//      })
    },
    beforeRouteLeave (to, from , next) {
      if(to.name === 'teachCheck'){
        to.meta.title = this.className;
      }
      next()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .m-box {
    height: 100%;
    overflow-y: auto;
    .m-item {
      float: left;
      width: 50%;
      height: px2rem(250px);
      padding-top: px2rem(40px);
      color: #ffffff;
      text-align: center;
      position: relative;
      &:nth-child(odd) {
        padding-left: px2rem(40px);
        padding-right: px2rem(20px);
        .m-pos {
          width: px2rem(200px);
          height: px2rem(120px);
          position: absolute;
          left: px2rem(40px);
          top: px2rem(48px);
          right: px2rem(20px);
          bottom: 0;
          margin: auto;
        }
      }
      &:nth-child(even) {
        padding-left: px2rem(20px);
        padding-right: px2rem(40px);
        .m-pos {
          width: px2rem(200px);
          height: px2rem(120px);
          position: absolute;
          left: px2rem(20px);
          top: px2rem(48px);
          right: px2rem(40px);
          bottom: 0;
          margin: auto;
        }
      }
      .m-pos{
        > img {
          width: px2rem(60px);
          height: px2rem(60px);
        }
        > p {
          height: px2rem(60px);
          line-height: px2rem(60px);
          font-size: px2rem(28px);
        }
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
