<template>
  <div>
    <transition name="hasKeep">
      <div v-if="popState" class="m-pops">
        <div class="img-box">
          <p class="m-x" @click="closeBox()">×</p>
          <div class="m-box">
            <img v-lazy="bigUrl">
          </div>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  export default {
    components: {},
    props:{
      popState:{
        type: Boolean,
        default: true
      },
      bigUrl:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        smg: '你好'
      }
    },
    methods: {
      closeBox() {
        this.$emit('closeImg',false);
      }
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/css/mixin";
  .m-pops {
    position: absolute;
    top: px2rem(-276px);
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(7, 17, 27, 0.7);
    .img-box {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 9rem;
      height: 8rem;
      background-color: #f6f6f6;
      padding: px2rem(60px) px2rem(30px) px2rem(30px) px2rem(30px);
      .m-x {
        position: absolute;
        top: px2rem(4px);
        right: px2rem(4px);
        width: px2rem(60px);
        height: px2rem(60px);
        text-align: center;
        line-height: px2rem(60px);
        font-size: px2rem(72px);
        color: #666666;
      }
      .m-box {
        position: relative;
        width: 100%;
        height: 100%;
        text-align: center;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          max-width: 100%;
          max-height: 100%;
          transform: translate(-50%, -50%);
        }
      }

    }
  }

  .hasKeep-enter-active, .hasKeep-leave-active {
    opacity: 1;
    transition: all 0.5s ease;
  }

  .hasKeep-leave-active, .hasKeep-enter {
    opacity: 0;
  }
</style>
