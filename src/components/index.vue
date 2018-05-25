<template>
  <div class="page">
    <scroll
      ref="pullrefresh"
      :pullup="isShow"
      :pulldown="isShow"
      @pulldown="loadDemo"
      @scrollToEnd="loadup">
      <div v-for="item in list" class="lh40 pb30">
        <div class="clear">
          <div style="height: 50px">{{item.name}}</div>
        </div>
        <div>{{item.link}}</div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from './common/test/Scroll'
  import DY from '../assets/js/dy'
//  import Slider from 'base/slider/slider'
//  import {notice} from 'common/js/getData'
  export default {
    components:{Scroll},
    data () {
      return {
        isShow: true,
        list:[],
        page:1
      }
    },
    mounted(){
      this._getDataInfo(1)
    },
    methods:{
      loadDemo(){
        this.list = []
        //下拉刷新重新初始化
        this.$refs.pullrefresh.$emit('pullrefresh.finishLoad');
        setTimeout(()=>{
          this._getDataInfo(1)
        },2000);
      },
      loadup(){
        if(!this.page) return
        this.page ++
        //上拉加载重新初始化
        this.$refs.pullrefresh.$emit('infinitescroll.reInit');
        setTimeout(()=>{
          this._getDataInfo(this.page)
        },2000)

      },
      _getDataInfo(page){
        DY.post('/test',{},(data) => {
          console.log(data);
          if(data.code === 0){
            if(data.list.length >= 10){
              this.list = data.list;
              //单次请求数据加载完毕后
              this.$refs.pullrefresh.$emit('infinitescroll.finishLoad');
            }else{
              //把page设置成false 数据已经加载完毕了 不用在加载了
              this.page = false
              //所有数据加载完毕后
              this.$refs.pullrefresh.$emit('infinitescroll.loadedDone');
            }
          }
        },true)


      }
    }
  }
</script>

<style scoped ref="stylesheet/scss" lang="scss">
  /*@import "~common/stylus/variable"*/
  .ScrollBox{
    width:100%;
    position:fixed;
    top:0px;
    bottom:0px;
  }

</style>
















<!--<template>-->
  <!--<div class="page">-->
    <!--<Loading id="saerchingLoading" v-show="inSearching"></Loading>-->
    <!--<Scroller-->
      <!--id="scroll"-->
      <!--ref="scroll"-->
      <!--:dataList="filmList"-->
      <!--:pullDownRefresh="true"-->
      <!--:pullUpLoad="true"-->
      <!--@onPullUp="pullUpHandle"-->
      <!--@onPullDown="pullDownHandle"-->
    <!--&gt;-->
      <!--<ul>-->
        <!--<li v-for="(item,index) in filmList" style="line-height: 44px">第{{index}}个</li>-->
      <!--</ul>-->
    <!--</Scroller>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import Scroller from './common/test/test'-->
  <!--import Loading from './common/test/loading'-->

  <!--const DEVICE_RATIO = 1;-->
  <!--const DOWN_CONFIG = 1;-->
  <!--const UP_CONFIG = 1;-->


  <!--export default {-->
    <!--name: 'search',-->
    <!--components: {Scroller, Loading},-->
    <!--data() {-->
      <!--return {-->
        <!--filmList: [1,11,123,1234,123145,2,11,123,1234,123145,2,11,123,1234,123145,2,11,123,1234,123145,2,11,123,1234,123145,2],-->
        <!--searchText: "",-->
        <!--inSearching: false,-->
        <!--page: 0-->
      <!--};-->
    <!--},-->
    <!--computed: {-->
      <!--scrollElement() {-->
        <!--return this.$refs.scroll-->
      <!--}-->
    <!--},-->

    <!--mounted() {-->

    <!--},-->
    <!--methods: {-->
      <!--pullUpHandle(val) {     //上拉-->
          <!--this.scrollElement.PullingUpWord = "加载完成";-->
          <!--setTimeout(() => {-->
            <!--this.scrollElement.finish("PullUp");-->
            <!--this.filmList = this.filmList.concat([4,53,123,14,6,567,567,568,67,834,23,53]);-->
          <!--}, 1000)-->
      <!--},-->
      <!--pullDownHandle(val) {   //下拉-->
        <!--setTimeout(() => {-->
          <!--this.scrollElement.finish("PullDown");-->
          <!--this.filmList= [4,53,123,14,6,567,567,568,67,834,23,53,568,67,834,23,53,568,67,834,23,53];-->
        <!--}, 1000)-->
      <!--}-->
    <!--}-->
  <!--};-->
<!--</script>-->

<!--<style lang="scss" scoped>-->
  <!--@import '../assets/css/base';-->

  <!--.film-list {-->
    <!--padding: 0.3125rem;-->
    <!--position: relative;-->
    <!--border-bottom: 0.0312rem solid #ddd;;-->
    <!--@include flex-center;-->
    <!--.film-list__img {-->
      <!--width: 1.7rem;-->
      <!--height: 2.7rem;-->
      <!--img {-->
        <!--width: 100%;-->
        <!--height: auto;-->
      <!--}-->
    <!--}-->
    <!--.film-list__detail {-->
      <!--flex: 1;-->
      <!--padding: 0 0.35rem 0 0.45rem;-->
      <!--p {-->
        <!--@include fz(12px);-->
        <!--padding: 0.0312rem 0;-->
        <!--color: #888;-->
        <!--@include t-overflow(2);-->
        <!--span {-->
          <!--color: #77b59c;-->
        <!--}-->
        <!--&.film-list__detail__title {-->
          <!--padding-bottom: 0.08rem;-->
        <!--}-->
      <!--}-->
    <!--}-->
  <!--}-->

  <!--#scroll {-->
    <!--position: absolute;-->
    <!--top: 0;-->
    <!--left: 0;-->
    <!--right: 0;-->
    <!--bottom: 0;-->
    <!--margin: auto;-->
    <!--overflow: hidden;-->
    <!--background-color: #ffffff;-->
  <!--}-->

  <!--#search {-->
    <!--background: $mainColor;-->
    <!--padding: 0.2rem 1.8rem 0.2rem 0.5rem;-->
    <!--position: relative;-->
    <!--div {-->
      <!--position: relative;-->
      <!--span {-->
        <!--position: absolute;-->
        <!--right: 0;-->
        <!--top: 50%;-->
        <!--font-size: 16px;-->
        <!--transform: translateY(-50%);-->
        <!--color: #888;-->
      <!--}-->
    <!--}-->
    <!--input {-->
      <!--width: 100%;-->
      <!--background: #fff;-->
      <!--border: none;-->
      <!--height: 0.7rem;-->
      <!--padding-left: 0.4rem;-->
      <!--vertical-align: middle;-->
    <!--}-->
    <!--button {-->
      <!--position: absolute;-->
      <!--right: 0;-->
      <!--top: 50%;-->
      <!--margin-top: -0.35rem;-->
      <!--width: 1.5rem;-->
      <!--height: 0.7rem;-->
      <!--line-height: 0.7rem;-->
      <!--text-align: center;-->
      <!--background: none;-->
      <!--border: none;-->
      <!--color: #fff;-->
      <!--vertical-align: middle;-->
      <!--font-size: 14px;-->
    <!--}-->
  <!--}-->

  <!--#saerchingLoading {-->
    <!--position: fixed;-->
    <!--top: 50%;-->
    <!--left: 50%;-->
    <!--transform: translate(-50%, -50%);-->
  <!--}-->
<!--</style>-->
