<template>
  <div class="page" style="overflow-y: auto">
    <div class="m-top">
      <span class="top-left"><i class="m-left-text">{{current}}</i></span>
      <p class="top-right" @click="showPlugin()">
        <i class="iconfont icon-rili"></i>
      </p>
    </div>

    <div class="m-cont">
      <p class="m-title"><i></i><em>消费</em><span>-999</span></p>
      <div class="m-chart" id="chart"></div>
      <div class="m-consume">
        <p class="m-consume-title">最高消费：</p>
        <p class="m-list row" v-for="item in 3">
          <span class="col col-33 t-l">超市消费</span>
          <span class="col col-33 t-c">124.45</span>
          <span class="col col-33 t-r">2018-03-12</span>
        </p>
      </div>
    </div>

    <div class="m-foot">
      <p class="m-title"><i></i><em>充值</em><span>+999</span></p>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    components: {},
    data() {
      return {
        current: window.current,   //当前日期
      }
    },
    methods: {
      showPlugin () {
        let vm = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM',
          value: window.current,
          onConfirm (val) {
            vm.current = val;
          }
        })
      },
      chartPie(id) {      //统计学校
        let school = echarts.init(document.getElementById(id));
        school.setOption({
          color: ['#ee7240','#f79954','#eeb428','#00a294','#22b6ac','#ffcb29', '#b8d54b', '#36c2d6', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          calculable: true,
          series: [
            {
              name: '消费统计',
              type: 'pie',
              radius: [55, 120],
              center: ['50%', '50%'],
              data: [
                {value:21, name:'食堂'},
                {value:26, name:'热水'},
                {value:29, name:'请求'},
                {value:20, name:'超市'},
                {value:47, name:'是的'}
              ]
            }
          ]
        })
      },
    },
    mounted() {
      this.chartPie('chart');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/css/mixin";

  .m-cont{
    width: 100%;
    background-color: #ffffff;
    .m-chart{
      width: 100%;
      height: px2rem(600px);
    }
    .m-consume{
      width: 100%;
      padding: 0 px2rem(30px);
      .m-consume-title{
        line-height: px2rem(80px);
        font-weight: bold;
        font-size: 16px;
      }
      .m-list{
        width: 100%;
        height: px2rem(80px);
        line-height: px2rem(80px);
        font-size: 16px;
        color: #666;
      }
    }
  }
  .m-title{
    width: 100%;
    height:  px2rem(100px);
    line-height:  px2rem(100px);
    padding: 0  px2rem(30px);
    border-bottom: 1px solid #f6f6f6;
    >i{
      display: inline-block;
      width:  px2rem(10px);
      height:  px2rem(40px);
      background-color: #20c475;
      vertical-align: text-bottom;
    }
    >em{
      padding-left:  px2rem(20px);
      font-size: 18px;
      font-weight: bold;
    }
    >span{
      float: right;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .m-foot{
    width: 100%;
    height: px2rem(100px);
    line-height:  px2rem(100px);
    margin-top:  px2rem(20px);
    background-color: #ffffff;
  }
</style>
