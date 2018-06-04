<template>
  <div class="page">
    <p class="m-title"><span>张三</span><span>2018-05-02 9:00</span><span>缺卡</span></p>
    <div class="m-cont">
      <div class="m-info">
        <span>补卡时间</span>
        <p class="f-r"><span>2018-05-02 9:00</span></p>
      </div>
      <div class="m-box">
        <p class="m-cause">补卡原因：</p>
        <!--<textarea class="m-text" rows="5" placeholder="请输入" v-model="cause"></textarea>-->
        <group gutter="0">
          <x-textarea :max="50" v-model="cause" placeholder="请输入补卡原因" @on-focus="onEvent('focus')" @on-blur="onEvent('blur')"></x-textarea>
        </group>
      </div>
    </div>
    <button class="btn m-btn" @click="mySubmit">提交</button>

  </div>
</template>

<script>
  import DY from '../../assets/js/dy'

  export default {
    components: {},
    data() {
      return {
        smg: '你好',
        cause: '',  //原因
        cardTime: '2018-05-02 9:00'

      }
    },
    created() {
      console.log(this.$route.params);
    },
    methods: {
      onEvent (event) {
        console.log('on', event)
      },
      mySubmit() {
        let vm =this;
        if(this.cause === ''){
          this.$vux.confirm.show({
            content: '请输入补卡原因'
          })
        }else {
          this.$vux.confirm.show({
            title: '补卡操作',
            content: '您的补卡时间：'+ vm.cardTime,
            onConfirm () {
              let params = {
                studentId: '',
                repairAttendanceTime: vm.current,     //时间
                repairAttendanceReasons: vm.cause   //原因
              };
              DY.post('/wcsApp/teacher/repairAttendance',params,(data) => {
                console.log(data);
                if(data.code === 0){
                  vm.$router.go(-1);
                  setTimeout(()=>{
                    vm.$vux.toast.show({
                      text: '补卡成功'
                    })
                  },550)
                }
              },true)
            }
          })

        }

      }
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/css/mixin";
  .m-title {
    width: 100%;
    height: px2rem(88px);
    line-height: px2rem(88px);
    span {
      padding-left: px2rem(30px);
      color: #666666;
      font-size: 16px;
    }
  }

  .m-cont {
    width: 100%;
    background-color: #ffffff;
    .m-info {
      width: 100%;
      height: px2rem(88px);
      line-height: px2rem(88px);
      padding: 0 px2rem(30px);
      border-bottom: 1px solid #f6f6f6;
      > span {
        font-size: 16px;
      }
      .f-r {
        span {
          /*padding-right: 10px;*/
          font-size: 16px;
        }
      }
      .iconfont{
        font-size: 24px;
        vertical-align: sub;
      }
    }
    .m-box{
      font-size: 0;
      .m-cause{
        line-height: px2rem(60px);
        font-size: 16px;
        padding-left: px2rem(30px);
        padding-top: px2rem(10px);
      }
      .m-text{
        box-sizing: border-box;
        width: 100%;
        line-height: px2rem(48px);
        padding: 0 px2rem(30px) px2rem(20px) px2rem(30px);
        font-size: 14px;
        color: #666;
        border: none;
        &:focus {
          outline: 0;
        }
      }
    }

  }

  .m-btn{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: px2rem(100px);
    font-size: px2rem(36px);
    color: #20c475;
    background-color: #ffffff;
  }
</style>
