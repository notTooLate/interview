<template>
  <div class="page">
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

    <b-scroll class="m-wrapper"
              :data="contentList" :pullup="true" :pulldown="true" :listenScroll="true" @pulldown="pullDown()"
              @scrollToEnd="loadData()">
      <ul class="m-list">
        <li class="m-item" v-for="(item,index) in contentList" @click="$router.push({name: 'abnormal',params:{}})">
          <img v-lazy="item.head">
          <div class="m-info">
            <p>张三--{{index+1}}</p>
            <h4><span>迟到3</span><span>|</span><span>早退2</span><span>|</span><span>缺卡1</span></h4>
          </div>
          <i class="iconfont icon-more"></i>
        </li>
        <li v-show="endState" style="height: 44px;text-align: center;line-height: 44px">没有更多数据了</li>
      </ul>
      <!--
      <ul class="m-list">
        <li class="m-item" v-for="item in contentList" @click="$router.push({name: 'abnormal',params:{studentId:item.studentId,time:current,
       late:item.late,earlyRetreat:item.earlyRetreat,absent:item.absent}})">
          <img v-lazy="item.head">
          <div class="m-info">
            <p>{{item.studentName}}</p>
            <h4><span>迟到{{item.late}}</span><span>|</span><span>早退{{item.earlyRetreat}}</span><span>|</span><span>缺卡{{item.absent}}</span></h4>
          </div>
          <i class="iconfont icon-more"></i>
        </li>
      </ul>
      -->
    </b-scroll>

  </div>
</template>

<script>
  import DY from '@/assets/js/dy'
  import BScroll from '../../common/b-scroll'

  export default {
    components: {BScroll},
    data() {
      return {
        smg: '出入',
        current: window.current,   //当前日期
        contentList: [],
        endState: false, //mei么有更多数据了
      }
    },
    created() {
      this.getData();
    },
    methods: {
      pullDown() {
        console.log('下拉刷新');
      },
      loadData() {
        console.log('上下拉出发事件');
        this.sum += 10;
        this.getData();
      },
      showPlugin() {
        let vm = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM',
          value: this.current,
          onConfirm(val) {
            vm.current = val;
            vm.getData();
          }
        })
      },
      getData() {
        let param = {
          departid: this.$store.state.classId,
          attendanceMonth: this.current
        };
        DY.post('/wcsApp/teacher/stuAttendanceRecordList', param, (data) => {
          console.log('班级出入', data);
          if (data.code === 0) {
            //this.contentList = data.data.resultList;
            let vessel=[];
            for (let i = 0; i < 10; i++) {
              vessel.push(i);
            }
            if(this.contentList.length<50){
              this.contentList = this.contentList.concat(vessel);
            }else{
              this.endState = true;
            }

          }
        }, true)
      }
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .m-test {
    text-align: center;
    font-size: 16px;
    line-height: 44px;
    background-color: rgba(7, 17, 27, 0.7);
    color: #ffffff;
  }

  .m-wrapper {
    position: absolute;
    top: px2rem(88px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #ffffff;
    overflow-y: auto;
  }

  .m-list {
    /*position: absolute;*/
    /*top: px2rem(88px);*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*margin: auto;*/
    /*background-color: #ffffff;*/
    /*overflow-y: auto;*/
    .m-item {
      width: 100%;
      height: px2rem(150px);
      padding: px2rem(24px) px2rem(30px);
      border-bottom: 1px solid #f6f6f6;
      img {
        width: px2rem(100px);
        height: px2rem(100px);
        object-fit: cover;
        border-radius: 50%;
      }
      .m-info {
        display: inline-block;
        height: px2rem(100px);
        line-height: px2rem(50px);
        padding-left: px2rem(30px);
        vertical-align: top;
        > p {
          font-size: 16px;
          color: #333333;
        }
        > h4 {
          color: #666666;
          > span {
            padding-right: px2rem(30px);
          }
        }
      }
      .iconfont {
        float: right;
        font-size: 24px;
        line-height: px2rem(100px);
      }
    }
  }
</style>
