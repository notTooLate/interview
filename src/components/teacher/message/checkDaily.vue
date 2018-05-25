<template>
  <div class="page">
    <p class="m-top">
      <span>2018-04-26</span><span>学生考勤日报</span>
    </p>

    <div class="m-chart" id="chart"></div>

    <div class="m-cont">
      <div class="m-box">
        <h4 class="m-title"><i class="color-1"></i>迟到2人，迟到率0.8%</h4>
        <p class="m-info"><span>张三</span><span>08:03</span><span>迟到3分钟</span></p>
        <p class="m-info"><span>李四到</span><span>08:03</span><span>迟到3分钟</span></p>
      </div>
      <div class="m-box">
        <h4 class="m-title"><i class="color-2"></i>早退2人，迟到率0.8%</h4>
        <p class="m-info"><span>张三</span><span>08:03</span><span>早退3分钟</span></p>
        <p class="m-info"><span>李四到</span><span>08:03</span><span>早退3分钟</span></p>
      </div>
      <div class="m-box">
        <h4 class="m-title"><i class="color-3"></i>缺卡2人，迟到率0.8%</h4>
        <p class="m-info"><span>张三</span><span>08:03</span><span>缺卡</span></p>
        <p class="m-info"><span>李四到</span><span>08:03</span><span>缺卡</span></p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        smg: '你好',
      }
    },
    methods: {
      chartPie(id) {      //统计学校
        let school = this.$echarts.init(document.getElementById(id));
        school.setOption({
          color: ['#ee7240','#f79954','#eeb428','#00a294','#22b6ac','#ffcb29', '#b8d54b', '#36c2d6', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          calculable: true,
          series: [
            {
              name: '出勤统计',
              type: 'pie',
              radius: [55, 120],
              center: ['50%', '50%'],
              data: [
                {value:21, name:'迟到'},
                {value:15, name:'早退'},
                {value:8, name:'缺卡'},
                {value:47, name:'正常出勤'}
              ]
            }
          ]
        })
      },
    },
    mounted() {
      this.chartPie('chart')
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  .m-top {
    width: 100%;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #f6f6f6;
    >span{
      color: #333333;
      font-size: 16px;
      padding-left: 15px;
    }
  }


  .m-chart{
    width: 100%;
    height: 320px;
    background-color: #ffffff;
  }

  .m-cont{
    width: 100%;
    margin-top: 10px;
    background-color: #ffffff;
    .m-box{
      padding-left: 15px;
      padding-bottom: 10px;
      border-bottom: 1px solid #f6f6f6;
      .m-title{
        width: 100%;
        height: 44px;
        line-height: 44px;
        >i{
          display: inline-block;
          width: 5px;
          height: 16px;
          margin-right: 10px;
          vertical-align: text-top;
        }
      }
      .m-info{
        color: #999999;
        >span{
          display: inline-block;
          width: 30%;
          height: 30px;
          line-height: 30px;
          padding-left: 15px;
        }
      }
    }
  }

  .color-1{background-color: #ee7240;}
  .color-2{background-color: #f79954;}
  .color-3{background-color: #eeb428;}
</style>
