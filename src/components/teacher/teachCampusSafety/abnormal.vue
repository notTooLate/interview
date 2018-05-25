<template>
  <div class="page">
    <div class="m-portrait">
      <div class="f-l">
        <img class="m-photo" src="../../../assets/img/test-tx.jpg">
        <div class="m-info-box">
          <p class="m-name">同学三</p>
          <p class="m-class"><span>迟到{{late}}</span><span>|</span><span>早退{{earlyRetreat}}</span><span>|</span><span>缺卡{{absent}}</span></p>
        </div>
      </div>
      <p class="m-right">{{$route.params.time}}</p>
    </div>

    <ul class="m-list">
      <li class="m-item" v-for="item in contentList">
        <img v-lazy="item.picPath">
        <p class="m-info"><span>{{item.date}}</span><span>{{item.time}}</span><span>{{item.attendanceType | turnoverType}}</span></p>
        <p class="f-r">{{item.abnormalType | abnormalType}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import DY from '@/assets/js/dy'

  export default {
    components: {},
    data() {
      return {
        smg: '你好',
        contentList: [],
        late: '',           //  迟到
        earlyRetreat: '',   //  早退
        absent: ''          //  缺卡
      }
    },
    created(){
      this.late = this.$route.params.late;
      this.earlyRetreat = this.$route.params.earlyRetreat;
      this.absent = this.$route.params.absent;

      let param = {
        departid: this.$store.state.classId,
        studentId: this.$route.params.studentId,
        attendanceMonth: this.$route.params.time
      };
      DY.post('/wcsApp/teacher/stuAttendanceRecordDetailsList',param,(data) => {
        console.log('异常',data);
        if(data.code === 0){
          let vessel= data.data.resultList;
          vessel.forEach((obj)=>{
            let arr = obj.attendanceTime.split(' ');
            this.$set(obj,'date',arr[0]);
            this.$set(obj,'time',arr[1]);
          });
          this.contentList = vessel;
          console.log(this.contentList);
        }
      },true)

    },
    methods: {},
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/css/mixin";
  .m-portrait{
    position: relative;
    width: 100%;
    height: px2rem(168px);
    padding: px2rem(24px);
    margin-bottom: px2rem(20px);
    background-color: #ffffff;
    .m-photo{
      width: px2rem(120px);
      height: px2rem(120px);
      border-radius: 50%;
      border: 1px solid #dddddd;
    }
    .m-info-box{
      display: inline-block;
      height: px2rem(120px);
      padding-left: px2rem(20px);
      vertical-align: top;
      .m-name{
        line-height: px2rem(80px);
        font-size: 16px;
        font-weight: bold;
      }
      .m-class{
        >span{
          padding-right: px2rem(30px);
          font-size: 14px;
          color: #999;
        }
      }
    }
    .m-right{
      position: absolute;
      top: px2rem(24px);
      right: px2rem(44px);
      height: px2rem(80px);
      line-height: px2rem(80px);
    }
  }
  .m-list{
    position: absolute;
    top: px2rem(188px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #ffffff;
    overflow-y: auto;
    .m-item{
      width: 100%;
      height: px2rem(108px);
      padding: px2rem(14px) px2rem(30px);
      border-bottom: 1px solid #f6f6f6;
      img{
        width: px2rem(80px);
        height: px2rem(80px);
        object-fit: cover;
        border-radius: 50%;
      }
      .m-info{
        display: inline-block;
        height: px2rem(80px);
        line-height: px2rem(80px);
        padding-left: px2rem(30px);
        vertical-align: top;
        >span{
          color: #666666;
          padding-right: px2rem(30px);
        }
      }
      .f-r{
        height: px2rem(80px);
        line-height: px2rem(80px);
        padding-right: px2rem(20px);
      }
    }
  }
</style>
