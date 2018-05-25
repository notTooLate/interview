<template>
  <div class="page">
    <div v-if="isShow === 2">
      <p class="m-title">在校：{{sum}}人</p>
      <b-scroll class="m-wrapper">
        <ul class="m-list">
          <li class="m-item" v-for="item in contentList">
            <div class="img-wrapper">
              <img class="m-img" v-lazy="item.head">
            </div>
            <p>{{item.studentName}}</p>
          </li>
        </ul>
      </b-scroll>
    </div>

    <div v-if="isShow === 3">
      <p class="m-title">总共在校：{{sum}}人</p>
      <b-scroll class="m-wrapper">
        <div>
          <div v-for="r in 3">
            <p class="m-class"><i></i>一年级一班：5人</p>
            <ul class="m-list">
              <li class="m-item" v-for="item in 6">
                <div class="img-wrapper">
                  <img class="m-img" src="../../assets/img/test-02.jpg">
                </div>
                <p>学生张</p>
              </li>
            </ul>
          </div>
        </div>
      </b-scroll>
    </div>

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
        sum: '',  //在校人数
        contentList: []
      }
    },
    created(){
      console.log(this.$store.state.classId);

      this.sum = this.$route.params.sum;
      if(window.identity === 2){      //教师端
        let param = {
          departid: this.$store.state.classId,   // 班级ID
          attendanceType: 1    // 出勤类型 1 ：在校 2：未到校 3：离校
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
    width: 100%;
    height: px2rem(88px);
    line-height: px2rem(88px);
    padding-left: px2rem(30px);
    font-size: 16px;
  }

  .m-list {
    margin-bottom: 10px;
    background-color: #ffffff;
    &:last-child{
      margin-bottom: 0;
    }
    .m-item {
      display: inline-block;
      width: 25%;
      padding: px2rem(20px) px2rem(24px);
      text-align: center;
      .m-img{
        border-radius: 50%;
        object-fit: cover;
      }
      >p{
        line-height: px2rem(60px);
        color: #333333;
        font-size: 16px;
      }
    }
  }

  .m-class{
    width: 100%;
    height: px2rem(88px);
    line-height: px2rem(88px);
    padding-left: px2rem(30px);
    border-bottom: 1px solid #f6f6f6;
    background-color: #ffffff;
    >i{
      display: inline-block;
      width: px2rem(10px);
      height: px2rem(40px);
      margin-right: px2rem(20px);
      background-color: #20c475;
      vertical-align: text-bottom;
    }
  }
</style>
