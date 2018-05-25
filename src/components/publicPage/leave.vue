<template>
  <div class="page">
    <p class="m-title">离校{{sum}}人</p>
    <b-scroll class="m-wrapper">
      <ul class="m-list">
        <li class="m-item" v-for="item in 3">
          <div class="img-wrapper">
            <img class="m-img" src="../../assets/img/test-02.jpg">
          </div>
          <p>学生张</p>
          <h4 v-if="isShow === 2">19:10离校</h4>
          <h4 v-if="isShow === 3">一年级一班</h4>
        </li>
      </ul>
    </b-scroll>

  </div>
</template>

<script>
  import DY from '@/assets/js/dy'
  import BScroll from '../common/b-scroll'

  export default {
    components: {BScroll},
    data() {
      return {
        isShow: window.identity,
        contentList: []
      }
    },
    created(){
      console.log( '班级ID',this.$store.state.classId);

      this.sum = this.$route.params.sum;
      if(window.identity === 2){      //教师端
        let param = {
          departid: this.$store.state.classId,   // 班级ID
          attendanceType: 3    // 出勤类型 1 ：在校 2：未到校 3：离校
        };
        DY.post('/wcsApp/teacher/attendanceStuList',param,(data) => {
          console.log(data);
          if(data.code === 0){
            this.contentList = data.data.resultList;
          }
        },true)
      }
    },
    methods: {},
    mounted() {
      console.log('班级ID',this.$store.state.classId);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/css/mixin";
  .m-wrapper{
    position: absolute;
    top: px2rem(88px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #ffffff;
    overflow-y: auto;
  }

  .m-title {
    width: 100px;
    height: px2rem(88px);
    line-height: px2rem(88px);
    padding-left: px2rem(30px);
    font-size: 16px;
  }

  .m-list {
    /*position: absolute;*/
    /*top: 44px;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*margin: auto;*/
    background-color: #ffffff;
    .m-item {
      display: inline-block;
      width: 25%;
      padding: px2rem(20px) px2rem(24px);
      text-align: center;
      .m-img {
        border-radius: 50%;
        object-fit: cover;
      }
      > p {
        padding-top: px2rem(10px);
        line-height: px2rem(40px);
        color: #333333;
        font-size: 16px;
      }
      > h4 {
        line-height: px2rem(40px);
        font-size: 12px;
        color: #999;
      }
    }
  }
</style>
