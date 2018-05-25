<template>
  <div class="page">
    <div class="m-portrait">
      <div class="f-l">
        <img class="m-photo" src="../../../assets/img/test-tx.jpg">
        <div class="m-info-box">
          <p class="m-name">赵老师</p>
        </div>
      </div>
    </div>

    <m-tab :tabList="tabList" tabStrip="100px" class="m-tab"></m-tab>

    <router-view/>

  </div>
</template>

<script>
  import MTab from '@/components/common/m-tab'

  export default {
    components: {MTab},
    data() {
      return {
        navActive: '出入记录',
        tabList: [
          {name: '出入记录', url: '/myCheck/comings'},
          {name: '早到榜', url: '/myCheck/ranking'}
        ]
      }
    },
    methods: {},
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../../assets/css/mixin";
  .m-portrait {
    width: 100%;
    height: px2rem(168px);
    padding: px2rem(24px);
    background-color: #ffffff;
    .m-photo {
      width: px2rem(120px);
      height: px2rem(120px);
      border-radius: 50%;
      border: 1px solid #dddddd;
    }
    .m-info-box {
      display: inline-block;
      height: px2rem(120px);
      padding-left: px2rem(20px);
      vertical-align: top;
      .m-name {
        line-height: px2rem(120px);
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

  .m-tab {
    margin-top: px2rem(20px);
  }
</style>
