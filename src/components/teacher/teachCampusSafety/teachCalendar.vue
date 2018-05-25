<template>
  <div class="page">
    <div class="m-head">
      <p class="top-right">
        <span>{{current}}</span>
        <span>{{week}}</span>
      </p>
    </div>

    <inline-calendar
      ref="calendar"
      @on-change="onChange"
      @on-view-change="onViewChange"
      class="inline-calendar"
      v-model="current"
      start-date="2000-04-01"
      end-date="2028-05-30"
      :disable-future="true"
      :show-last-month="false"
      :show-next-month="false"
      :highlight-weekend="true"
      :hide-header="false">
    </inline-calendar>

    <b-scroll class="m-wrapper">
      <check-list :dataList="cellState"></check-list>
    </b-scroll>


  </div>
</template>

<script>
  import DY from '../../../assets/js/dy'
  import BScroll from '../../common/b-scroll'
  import CheckList from '../../common/check-list'

  export default {
    components: {BScroll,CheckList},
    data() {
      return {
        smg: '日历',
        value: '',
        current: DY.getTime('YYYY-MM-DD'),   //当前日期
        week: DY.getTime('week'),
        cellState:[
          {title:'正常出勤',show:false},
          {title:'异常出勤',show:false},
          {title:'迟到',show:false},
          {title:'早退',show:false},
          {title:'缺卡',show:false},
        ]
      }
    },
    created() {

    },
    methods: {
      onChange (val) {
        console.log('on-change', val);
        this.week = "星期"+"日一二三四五六".charAt(new Date(val).getDay());
        this.getData();
      },
      onViewChange (val, count) {
        console.log('on view change', val, count)
      },
      getData() {
        DY.post('/wcsApp/teacher/todayAttendanceInfo', {}, (data) => {
          console.log('考勤日历', data);
          if (data.code === 0) {
            this.cellState = [
              {title: '正常出勤', show: false, num: data.data.attendance, info: data.data.attendanceList}, //正常出勤
              {title: '迟到', show: false, num: data.data.late, info: data.data.lateList},            //迟到
              {title: '早退', show: false, num: data.data.earlyRetreat, info: data.data.earlyRetreatList},    //早退
              {title: '缺卡', show: false, num: data.data.absent, info: data.data.absentList}          //缺卡
            ]
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
  .m-head {
    width: 100%;
    height: px2rem(88px);
    line-height: px2rem(88px);
    background-color: #ffffff;
    .top-right {
      height: px2rem(88px);
      font-size: 16px;
      color: #999999;
      >span{
        padding-left: px2rem(30px);
      }
    }
  }
  .inline-calendar{
    background: #f6f6f6;
  }

  .m-wrapper{
    position: absolute;
    top: px2rem(576px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    background-color: #ffffff;
  }
</style>
