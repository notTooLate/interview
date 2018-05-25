<template>
  <div ref="wrapper">
    <div class="scroll-content">
      <!--下拉刷新-->
      <transition name="pullDown">
        <Loading class="pullDown" v-show="inPullDown" :loadingWord='pullingDownWord'></Loading>
      </transition>
      <p v-show="inPullDownText" style="text-align: center;height: 30px;">{{pullDownText}}</p>

      <!--内容插槽-->
      <slot></slot>

      <!--上拉加载更多-->
      <div>
        <loading v-show="inPullUp" :loadingWord='pullingUpWord'></loading>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import Loading from './test/loading'

  export default {
    props: {
      /**
       * 1 滚动的时候会派发scroll事件，会截流。
       * 2 滚动的时候实时派发scroll事件，不会截流。
       * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
       */
      probeType: {
        type: Number,
        default: 1
      },
      /**
       * 点击列表是否派发click事件
       */
      click: {
        type: Boolean,
        default: true
      },
      /**
       * 是否开启横向滚动
       */
      scrollX: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发滚动事件
       */
      listenScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 列表的数据
       */
      data: {
        type: Array,
        default: null
      },
      /**
       * 是否派发滚动到底部的事件，用于上拉加载
       */
      pullup: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发顶部下拉的事件，用于下拉刷新
       */
      pulldown: {
        type: Boolean,
        default: false
      },
      /**
       * 是否派发列表滚动开始的事件
       */
      beforeScroll: {
        type: Boolean,
        default: false
      },
      /**
       * 当数据更新后，刷新scroll的延时。
       */
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    components:{Loading},
    data() {
      return {
        inPullDown: false, //下拉状态
        inPullDownText: false,  //下拉文字状态
        pullDownText:'释放更新',
        inPullUp: false,    //上拉状态
        pullingUpWord: '加载中…',    //上拉
        pullingDownWord: '加载中…'   //下拉
      }
    },
    mounted() {
      // 保证在DOM渲染完毕后初始化better-scroll
      setTimeout(() => {
        this._initScroll()
      }, 20)
    },
    methods: {
      _initScroll() {
        if (!this.$refs.wrapper) {
          return
        }
        // better-scroll的初始化
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX: this.scrollX
        })

        // 是否派发滚动事件
        if (this.listenScroll) {
          this.scroll.on('scroll', (pos) => {
            if(pos.y >30){
              this.inPullDownText = true;     // 下拉文字状态
              this.pullDownText = '下拉刷新';
            }
            if(pos.y > 50){
              this.pullDownText = '释放更新';
            }
            this.$emit('scroll', pos)
          })
        }

        // 是否派发滚动到底部事件，用于上拉加载
        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            // 滚动到底部
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              if(!this.inPullUp){
                this.inPullUp = true;
                setTimeout(() => {
                  this.inPullUp = false;
                },1200);
              }
              this.$emit('scrollToEnd')
            }
          })
        }

        // 是否派发顶部下拉事件，用于下拉刷新
        if (this.pulldown) {
          this.scroll.on('touchEnd', (pos) => {
            this.inPullDownText=false;
            // 下拉动作
            if (pos.y > 50) {
              this.inPullDown = true;
              setTimeout(()=>{
                this.inPullDown = false;
              },1200);
              this.$emit('pulldown')
            }
          })
        }

        // 是否派发列表滚动开始的事件
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      disable() {
        // 代理better-scroll的disable方法
        this.scroll && this.scroll.disable()
      },
      enable() {
        // 代理better-scroll的enable方法
        this.scroll && this.scroll.enable()
      },
      refresh() {
        // 代理better-scroll的refresh方法
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        // 代理better-scroll的scrollTo方法
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        // 代理better-scroll的scrollToElement方法
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      }
    },
    watch: {
      // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>

<style ref="stylesheet/scss" lang="scss" scoped>
  .pullDown{
    /*position: absolute;*/
    /*top:0;*/
    /*left:0;*/
  }

  /*下拉动画*/
  .pullDown-enter-active{
    transition:all 0.5s;
  }
  .pullDown-enter, .pullDown-leave-active{
    transform:translateY(-100%);
    transition:all 0.5s;
  }
</style>
