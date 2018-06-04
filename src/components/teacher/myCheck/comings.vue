<template>
  <div class="m-page">
    <div class="m-top">
      <p class="top-left">
        <i class="iconfont icon-clock"></i>
        <span>本月</span>
        <span>{{current}}</span>
      </p>
      <p class="top-right" @click="showPlugin()">
        <i class="iconfont icon-rili"></i>
      </p>
    </div>
    <b-scroll class="m-wrapper">
      <ul class="m-list">
        <li class="m-item" v-for="(item,index) in contentList" :key="index">
          <!--<img v-lazy="item.picPath" @click="bigPhoto(item.picSrc)">-->
          <img v-lazy="item.picPath" @click="bigPhoto('http://img05.tooopen.com/images/20140328/sy_57865838889.jpg')">
          <span>{{item.date | today}}</span>
          <span>{{item.time}}</span>
          <em :class="{'item-active': item.attendanceType === 1}">{{item.attendanceType | turnoverType}}</em>
        </li>
      </ul>
    </b-scroll>

    <big-photo  :popState="popState" :bigUrl="bigUrl" @closeImg = "closeImg"></big-photo>
  </div>
</template>

<script>
  import DY from '../../../assets/js/dy'
  import BScroll from '../../common/b-scroll'
  import BigPhoto from '../../common/big-photo'

  export default {
    components: {BScroll,BigPhoto},
    data() {
      return {
        smg: '出入记录',
        current: window.current,   //当前日期
        contentList: [],
        popState: false,   //大图状态
        bigUrl: ''
      }
    },
    created() {
      let params = {
        attendanceMonth: '',	//  出入记录月份年月	string	是	出入记录月份年月
        teacherId: ''         //	老师id	string	是	老师id
      };
      DY.post('/wcsApp/teacher/teacherAttendanceInfo', params, (data) => {
        console.log('教师-出入',data);
        if(data.code === 0){
          let vessel= data.data.resultList;
          vessel.forEach((obj)=>{
            let arr = obj.attendanceTime.split(' ');
            this.$set(obj,'date',arr[0]);
            this.$set(obj,'time',arr[1]);
          });
          this.contentList = vessel;
        }
      }, true)
    },
    methods: {
      showPlugin() {
        let vm = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM',
          value: window.current,
          onConfirm(val) {
            vm.current = val;
          }
        })
      },
      closeImg(data){
        //console.log(data);
        this.popState = data;
      },
      bigPhoto(url) {
        this.popState = true;
        this.bigUrl = url;
      },
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import '../../../assets/css/mixin';

  .m-wrapper{
    position: absolute;
    top: px2rem(88px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    background-color: #ffffff;
  }
  .m-list {
    border-top: 1px solid #f6f6f6;
    .m-item {
      width: 100%;
      height: px2rem(108px);
      padding: px2rem(14px) px2rem(30px);
      border-bottom: 1px solid #f6f6f6;
      > img {
        width: px2rem(80px);
        height: px2rem(80px);
        object-fit: cover;
        border-radius: 50%;
      }
      > span {
        display: inline-block;
        width: px2rem(200px);
        line-height: px2rem(80px);
        text-align: center;
        vertical-align: bottom;
      }
      > em {
        float: right;
        line-height: px2rem(80px);
      }
      .item-active {
        color: #20c475;
      }
    }
  }
</style>
