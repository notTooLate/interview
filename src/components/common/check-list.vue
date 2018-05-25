<template>
  <group gutter="0" class="m-group">
    <div v-for="(item,index) in dataList" :key="index">
      <cell
        :title="item.title"
        is-link
        :value="item.num"
        :border-intent="true"
        :arrow-direction="item.show ? 'up' : 'down'"
        @click.native="getActive(item)"
        class="m-cell">
      </cell>

      <div v-if="item.show">
        <ul>
          <li class="sub-item" v-for="r in item.info">
            <i class="m-dian">.</i>
            <em>{{r.studentName}}</em>
            <em>{{r.absentTime}}</em>
            <em>{{r.lateTime}}</em>
            <em v-if="index ===0" class="f-r">正常</em>
            <em v-if="index ===1" class="f-r">迟到{{r.howLong}}</em>
            <em v-if="index ===2" class="f-r">早退{{r.howLong}}</em>
            <em v-if="index === (dataList.length -1)" class="m-card">缺卡</em>
            <button v-if="index === (dataList.length -1)" class="btn f-r"
                    @click="$router.push({name:'reissue',params:{id : r.studentId}})">补卡
            </button>
          </li>
        </ul>
      </div>
      <p style="border-top: 1px solid #f6f6f6"></p>
    </div>
  </group>
</template>

<script>

  export default {
    props: {
      dataList: {
        type: Array,
        default: []
      }
    },
    component: {},
    data() {
      return {
        smg: '你好'
      }
    },
    methods: {
      getActive(item) {
        let state = item.show;
        this.dataList.forEach((obj) => {
          obj.show = false;
        });
        item.show = !state;
      }
    },
    mounted() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>
  @import "../../assets/css/mixin";

  .m-group {
    .m-cell {
      height: px2rem(88px);
    }
    .sub-item {
      width: 100%;
      height: px2rem(88px);
      line-height: px2rem(88px);
      padding-left: px2rem(30px);
      font-size: 14px;
      color: #666;
      background-color: #f6f6f6;
      border-bottom: 1px dashed #ddd;
      &:last-child {
        border-bottom: none;
      }
      > em {
        padding-right: 15px;
      }
      .m-dian {
        display: inline-block;
        position: relative;
        top: px2rem(24px);
        width: px2rem(16px);
        height: px2rem(16px);
        margin-right: px2rem(20px);
        border-radius: 50%;
        font-size: 0;
        background-color: #666666;
      }
      .m-card {

      }
      .btn {
        position: relative;
        top: px2rem(14px);
        right: px2rem(30px);
        width: px2rem(120px);
        height: px2rem(60px);
        color: #20c475;
        background-color: #f6f6f6;
        border: 1px solid #20c475;
        border-radius: px2rem(30px);
      }
    }
  }
</style>
