<template>
  <div class="page">
    <div class="m-portrait">
      <div class="f-l">
        <img class="m-photo" src="../../../assets/img/test-tx.jpg">
        <div class="m-info-box">
          <p v-if="isShow === 1" class="m-name" @click="isSelect = !isSelect">同学三
            <img class="m-img" src="../../../assets/img/ls-11.png">
          </p>
          <p v-if="isShow === 1" class="m-class">一年级二班</p>
          <p v-if="isShow === 2" class="m-teach">王老师</p>
        </div>
      </div>
      <div class="m-right">
        <span>挂失</span>
      </div>
    </div>

    <popup v-model="isSelect" width="100%">
      <div class="m-popup">
        <p class="m-select">点击切换</p>
        <ul class="m-list">
          <li class="m-name" v-for="i in 3" @click="getStudent(i)">张三</li>
        </ul>
      </div>
    </popup>

    <div class="m-money">
      <p>余额（元）</p>
      <div class="m-sum">
        <countup :start-val="1" :end-val="balance" :duration="1" :decimals="2" style="font-weight: bold;"></countup>
      </div>
    </div>

    <div class="m-title">
      <span class="title-left" @click="classifyState=!classifyState">分类
        <i class="iconfont icon-moreunfold" v-if="!classifyState"></i>
        <i class="iconfont icon-less" v-else=""></i>
      </span>
      <span class="title-right" @click="$router.push('/monthlyBill')">月账单<i class="iconfont icon-more"></i></span>
    </div>
    <!--分类弹窗-->
    <div class="m-pop" v-show="classifyState">
      <div class="pop-cont">
        <div class="f-l" v-for="(item,index) in classifyList" @click="getClassify(item,index)"
             :class="{'m-active': index === classifyIndex}">
          <i class="iconfont" :class="item.icon"></i>
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>

    <div class="m-top" style="background-color: #f6f6f6">
      <div class="top-left">
        <p class="m-time"><span>本月</span><span>{{current}}</span></p>
        <p class="m-income">支出：￥<span>200.05</span>充值：￥<span>300</span></p>
      </div>
      <p class="top-right" @click="showPlugin()">
        <!--<img src="../../../assets/img/ls-13.png">-->
        <i class="iconfont icon-rili"></i>
      </p>
    </div>

    <ul class="m-info">
      <li class="m-top" v-for="(item,index) in contentList" :key="index">
        <div class="top-left">
          <p class="m-time"><span>{{item.local}}</span></p>
          <p class="m-income"><span>{{item.d}}</span><span>{{item.t}}</span></p>
        </div>
        <p class="top-right"><span>{{item.money}}</span></p>
      </li>
    </ul>

  </div>
</template>

<script>
  import DY from '../../../assets/js/dy'

  export default {
    data() {
      return {
        isShow: window.identity,
        isSelect: false,
        studentList: ['张三', '李四', '王五'],
        studentName: '张三',
        current: window.current,   //当前日期
        classifyState: false,   //分类层
        classifyIndex: 0,
        classifyList: [
          {name: '全部', icon: 'icon-viewgallery'},
          {name: '消费', icon: 'icon-daxiaofei'},
//          {name: '食堂', icon: 'icon-miantiao'},
//          {name: '超市', icon: 'icon-tubiaozhizuomoban'},
          {name: '充值', icon: 'icon-5'}
        ],
        balance: 0,    //余额
        contentList: [],
      }
    },
    created() {
      let params = {
        userid: '',  //	用户id	string	是	用户id 如果是家长请传家长需要查询的学生id
        time: '',    //	时间	string	是	所选年月 格式： 2018-04
        useType: ''  //	使用类型	int	否	非必填 传递数值 充值 2 消费 1
      };
      DY.post('/wcsApp/consume/billRecord', {}, (data) => {
        console.log('我的消费', data);
        if (data.code === 0) {
          this.balance = parseFloat(data.data.balance);   //余额
          let vessel = data.data.resultList;
          vessel.forEach((obj) => {
            let arr = obj.time.split(' ');
            let arr0 = arr[0].split('-');   //年月日
            let arr1 = arr[1].split(':');    //时分秒
            this.$set(obj,'d',arr0[1]+'-'+arr0[2]);
            this.$set(obj,'t',arr1[0]+':'+arr1[1]);
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
      getStudent(item) {
        this.isSelect = false;
        console.log(item);
      },
      getClassify(item, index) {
        this.classifyIndex = index;
        this.classifyState = false;
      },
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/css/mixin";
  .m-popup {
    background-color: #ffffff;
    .m-select {
      height: px2rem(88px);
      line-height: px2rem(88px);
      text-align: center;
      color: #20c475;
      background-color: #f6f6f6;
    }
    .m-list {
      max-height: px2rem(264px);
      overflow-y: auto;
    }
    .m-name {
      height: px2rem(88px);
      line-height: px2rem(88px);
      text-align: center;
      border-bottom: 1px solid #f6f6f6;
      color: #666666;
    }
  }

  .m-portrait {
    width: 100%;
    height: px2rem(168px);
    padding: px2rem(24px);
    background-color: #ffffff;
    @include bottom-1px(red);
    .m-photo {
      width: px2rem(120px);
      height: px2rem(120px);
      border-radius: 50%;
      border: 1px solid #dddddd;
    }
    .m-info-box {
      position: relative;
      display: inline-block;
      height: px2rem(120px);
      padding-left: px2rem(20px);
      vertical-align: top;
      .m-name {
        line-height: px2rem(80px);
        font-size: 16px;
        font-weight: bold;
        .m-img {
          width: px2rem(40px);
          height: px2rem(40px);
          margin-left: 10px;
          vertical-align: sub;
        }
      }
      .m-class {
        font-size: 14px;
        color: #999;
      }
      .m-teach {
        line-height: px2rem(120px);
        /*font-size: 20px;*/
        @include font-dpr(20px)
      }
    }
    .m-right {
      float: right;
      height: px2rem(120px);
      line-height: px2rem(120px);
      > span {
        display: inline-block;
        width: px2rem(120px);
        height: px2rem(60px);
        line-height: px2rem(60px);
        text-align: center;
        border-radius: px2rem(30px);
        color: #ffffff;
        background-color: #20c475;
      }
    }
  }

  .m-money {
    width: 100%;
    height: px2rem(170px);
    padding: px2rem(20px) px2rem(30px);
    margin-top: px2rem(20px);
    background-color: #ffffff;
    > p {
      height: px2rem(60px);
      font-size: 18px;
      color: #999;
    }
    .m-sum {
      position: relative;
      top: -10px;
      font-size: 35px;
      text-align: center;
      color: #20c475;
    }
  }

  .m-title {
    width: 100%;
    height: px2rem(88px);
    line-height: px2rem(88px);
    padding: 0 px2rem(30px);
    font-size: 16px;
    border-top: 1px solid #f6f6f6;
    background-color: #ffffff;
    .title-left {
      color: #20c475;
      > i {
        font-size: 24px;
        vertical-align: middle;
      }
    }
    .title-right {
      float: right;
      color: #4dd091;
      > i {
        font-size: 20px;
        vertical-align: middle;
        padding-left: 5px;
      }
    }
  }

  .m-pop {
    position: absolute;
    top: px2rem(446px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 10;
    background-color: rgba(7, 17, 27, 0.7);
    .pop-cont {
      width: 100%;
      height: px2rem(200px);
      padding: px2rem(40px) px2rem(20px);
      border-top: 1px solid #f6f6f6;
      background-color: #ffffff;
      color: #666666;
      overflow: hidden;
      .f-l {
        width: 20%;
        text-align: center;
      }
      .iconfont {
        font-size: 30px;
      }
      p {
        height: px2rem(80px);
        line-height: px2rem(80px);
        text-align: center;
      }
    }
  }

  .m-top {
    width: 100%;
    height: px2rem(120px);
    line-height: px2rem(120px);
    border-bottom: 1px solid #f6f6f6;
    overflow: hidden;
    .top-left {
      float: left;
      height: px2rem(120px);
      padding: px2rem(10px) px2rem(30px);
      .m-time {
        font-size: 16px;
        line-height: px2rem(60px);
        > span {
          padding-right: px2rem(40px);
        }
      }
      .m-income {
        line-height: px2rem(40px);
        font-size: 14px;
        color: #999;
        > span {
          padding-right: px2rem(40px);
        }
      }
    }
    .top-right {
      float: right;
      height: px2rem(120px);
      .iconfont {
        font-size: px2rem(48px);
        margin-right: px2rem(30px);
        vertical-align: text-bottom;
      }
      > span {
        font-size: 18px;
        margin-right: px2rem(30px);
      }
    }
  }

  .m-info {
    position: absolute;
    top: px2rem(566px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow-y: auto;
    background-color: #ffffff;
  }

  .m-active {
    color: #20c475;
  }


</style>
