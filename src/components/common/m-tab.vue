<template>
  <div>
    <tab :custom-bar-width="tabStrip">
      <tab-item v-for="(item, index) in tabList" :selected="navActive===item.name" :key="index">
        <router-link :to="item.url" tag="div" replace>{{item.name}}</router-link>
      </tab-item>
    </tab>
  </div>
</template>

<script>

  export default {
    props: {
      tabList: {
        type: Array,
        default: []
      },
      tabStrip: {
        type: String,
        default: ''
      }
    },
    components: {},
    data() {
      return {
        navActive: ''
      }
    },
    methods: {},
    mounted() {
      this.tabList.forEach((obj) => {
        let arr = obj.url.split('/');
        if (this.$route.name === arr[arr.length - 1]) {
          this.navActive = obj.name;
        }
      })
    },
    watch: {
      '$route'(to, from) {
        this.tabList.forEach((obj) => {
          let arr = obj.url.split('/');
          if (to.name === arr[arr.length - 1]) {
            this.navActive = obj.name;
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style ref="stylesheet/scss" lang="scss" scoped>

</style>
