<template>
  <div class="m-page">
    <div class="m-top">
      <span class="top-left"><i class="m-left-text">按上班时间排序</i></span>
      <p class="top-right" @click="showPlugin()">
        <span>{{current}}</span>
        <i class="iconfont icon-moreunfold"></i>
      </p>
    </div>
    <b-scroll class="m-wrapper" :data="listData">
      <div class="content">
        <div class="m-ranking">
          <img v-if="myList.rank === 1" class="m-p" src="../../../../static/img/p-1.png">
          <img v-if="myList.rank === 2" class="m-p" src="../../../../static/img/p-2.png">
          <img v-if="myList.rank === 3" class="m-p" src="../../../../static/img/p-3.png">
          <span v-if="3 < myList.rank && myList.rank < 11" class="m-p">{{myList.rank}}</span>
          <img class="m-img" v-lazy="myList.head">
          <div class="m-name">
            <p>我</p>
            <h4 v-if="myList.rank < 11">第{{myList.rank}}名</h4>
            <h4 v-else="">未上榜</h4>
          </div>
          <p class="f-r">{{myList.time | attendanceTime}}</p>
        </div>
        <div class="m-space"></div>

        <ul class="m-list">
          <li class="m-ranking m-item" v-for="(item,index) in listData">
            <img v-if="index === 0" class="m-p" src="../../../../static/img/p-1.png">
            <img v-if="index === 1" class="m-p" src="../../../../static/img/p-2.png">
            <img v-if="index === 2" class="m-p" src="../../../../static/img/p-3.png">
            <span v-if="index>2" class="m-p">{{index + 1}}</span>
            <img class="m-img" v-lazy="item.head">
            <div class="m-name">
              <p class="m-info">{{item.name}}</p>
            </div>
            <p class="f-r" :class="{'time-3': index < 3}">{{item.attendanceTime | attendanceTime}}</p>
          </li>
        </ul>
      </div>
    </b-scroll>
  </div>
</template>

<script>
  import DY from '../../../assets/js/dy'
  import BScroll from '../../common/b-scroll'

  export default {
    components: {BScroll},
    data() {
      return {
        smg: '早到榜',
        current: '今天（' + DY.getTime('YYYY-MM-DD') + '）',   //当前日期
        myList: {
          head: '',
          name: '',
          time: '',
          rank: ''
        },
        listData: []
      }
    },
    created() {
      console.log(typeof(0) === 'number');

      let params = {
        workDate: window.current,    //	上班的日期	string	是	上班的日期
        teacherId: ''    //	老师id	string	是	老师id
      };
      DY.post('/wcsApp/teacher/earlyRank', params, (data) => {
        console.log('早到榜', data);
        if (data.code === 0) {
          this.myList = {
            head: data.data.head,
            name: data.data.name,
            time: data.data.attendanceTime,
            rank: data.data.rank
          };
          this.listData = data.data.rankList;
        }
      }, true)
    },
    methods: {
      showPlugin() {
        let vm = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          value: window.current,
          onConfirm(val) {
            if (val === DY.getTime('YYYY-MM-DD')) {
              vm.current = '今天（' + val + '）';
            } else {
              vm.current = '（' + val + '）';
            }
          }
        })
      }
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .m-wrapper {
    position: absolute;
    top: px2rem(88px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    background-color: #ffffff;
  }

  .m-space {
    width: 100%;
    height: px2rem(20px);
    background-color: #f6f6f6;
  }

  .m-ranking {
    position: relative;
    width: 100%;
    height: px2rem(108px);
    padding: px2rem(14px) px2rem(30px);
    border-top: 1px solid #f6f6f6;
    .m-p {
      position: absolute;
      top: px2rem(20px);
      left: px2rem(30px);
      width: px2rem(60px);
      height: px2rem(60px);
      font-size: 20px; //4-10 样式
      line-height: px2rem(60px);
      text-align: center;
    }
    .m-img {
      width: px2rem(80px);
      height: px2rem(80px);
      margin-left: px2rem(80px);
      border-radius: 50%;
      object-fit: cover;
    }
    .m-name {
      display: inline-block;
      line-height: px2rem(40px);
      margin-left: px2rem(40px);
      vertical-align: top;
      .m-info { // 列表样式
        line-height: px2rem(80px);
      }
      > p {
        font-size: 16px;
      }
    }
    .f-r {
      height: px2rem(80px);
      line-height: px2rem(80px);
      /*font-size: 18px;*/
      @include font-dpr(18px)
    }
  }

  .m-list {
    background-color: #ffffff;
    .m-item:last-child {
      border-bottom: 1px solid #f6f6f6;
    }
  }

  .time-3 {
    color: #20c475;
  }
</style>
