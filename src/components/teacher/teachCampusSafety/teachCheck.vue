<template>
  <div class="page">
    <!--<x-header :left-options="{backText: ''}">{{$route.params.name}}</x-header>-->

    <div class="m-head row">
      <div class="col col-33" @click="$router.push({name: 'reach',params:{sum:staySchoolCount}})">
        <div class="m-pos"><p>{{staySchoolCount}}</p><h4>在校</h4></div>
      </div>
      <div class="col col-33" @click="$router.push({name: 'nonArrival',params:{sum:notToSchoolCount}})">
        <div class="m-pos"><p>{{notToSchoolCount}}</p><h4>未到校</h4></div>
      </div>
      <div class="col col-33" @click="$router.push({name: 'leave',params:{sum:leaveSchoolCount}})">
        <div class="m-pos"><p>{{leaveSchoolCount}}</p><h4>离校</h4></div>
      </div>
    </div>

    <div v-if="isShow === 2" class="row m-tab">
      <p class="col col-33"><a class="active">今日考勤</a></p>
      <p class="col col-33" @click="$router.push('/teachCalendar')">考勤月历</p>
      <p class="col col-33" @click="$router.push('/teachCome')">出入记录</p>
    </div>

    <div v-if="isShow === 3" class="row m-tab">
      <p class="col col-50"><a class="active">今日考勤</a></p>
      <p class="col col-50" @click="$router.push('/teachCalendar')">考勤月历</p>
    </div>

    <b-scroll class="m-wrapper">
      <check-list :dataList="cellState"></check-list>
    </b-scroll>

  </div>
</template>

<script>
  import DY from '@/assets/js/dy'
  import BScroll from '../../common/b-scroll'
  import CheckList from '../../common/check-list'

  export default {
    components:{BScroll,CheckList},
    data() {
      return {
        isShow: window.identity,
        staySchoolCount: '',       //在校
        notToSchoolCount: '',       //未到校
        leaveSchoolCount: '',       //离校
        classId: this.$route.params.id,
        cellState: []
      }
    },
    created() {
      if (this.classId) {
        this.$store.commit('add', this.classId);
      }
      console.log('班级ID', this.$store.state.classId);

      DY.post('/wcsApp/teacher/todayAttendanceInfo', {}, (data) => {
        console.log('老师当日考勤', data);
        if (data.code === 0) {
          this.staySchoolCount = data.data.staySchoolCount;       //在校
          this.notToSchoolCount = data.data.notToSchoolCount;       //未到校
          this.leaveSchoolCount = data.data.leaveSchoolCount;       //离校
          this.cellState = [
            {title: '正常出勤', show: false, num: data.data.attendance, info: data.data.attendanceList}, //正常出勤
            {title: '迟到', show: false, num: data.data.late, info: data.data.lateList},            //迟到
            {title: '早退', show: false, num: data.data.earlyRetreat, info: data.data.earlyRetreatList},    //早退
            {title: '缺卡', show: false, num: data.data.absent, info: data.data.absentList}          //缺卡
          ]

        }
      }, true)
    },
    methods: {

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
    height: px2rem(220px);
    background: url("../../../../static/img/bg-1.jpg") no-repeat;
    background-size: 100% 100%;
    .col {
      position: relative;
      line-height: px2rem(60px);
      color: #ffffff;
      text-align: center;
      .m-pos {
        width: 100%;
        height: px2rem(120px);
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        > p {
          font-size: px2rem(48px);
        }
        > h4 {
          font-size: px2rem(32px);
        }
      }
    }
  }

  .m-tab {
    height: px2rem(88px);
    line-height: px2rem(88px);
    margin-top: px2rem(20px);
    text-align: center;
    font-size: 16px;
    background-color: #ffffff;
    border-bottom: 1px solid #f6f6f6;
    .active {
      display: inline-block;
      height: px2rem(88px);
      padding: 0 px2rem(30px);
      color: #20c475;
      border-bottom: 2px solid #20c475;
    }
  }

  .m-wrapper{
    position: absolute;
    top: px2rem(328px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    background-color: #ffffff;
  }

</style>
