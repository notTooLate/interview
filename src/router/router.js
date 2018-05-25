// import Vue from 'vue'
// import VueRouter from 'vue-router'
//
// Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/teachHome',
    },
    {
      path: '*',
      redirect: '/teachHome',
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: 'bscroll上下拉'
      },
      component: resolve => require(['@/components/index'], resolve),
    },
    /*********************** 教师端 ***********************/
    {
      path: '/teachHome',
      name: 'teachHome',
      meta: {
        title: '平安校园'
      },
      component: resolve => require(['@/components/teacher/teachCampusSafety/teachHome'], resolve),
      beforeRouteLeave(){}
    },
    {
      path: '/teachCheck',
      name: 'teachCheck',
      meta: {
        title: '今日考勤'
      },
      component: resolve => require(['@/components/teacher/teachCampusSafety/teachCheck'], resolve)
    },
    {
      path: '/teachCalendar',
      name: 'teachCalendar',
      meta: {
        title: '考勤月历'
      },
      component: resolve => require(['@/components/teacher/teachCampusSafety/teachCalendar'], resolve)
    },
    {
      path: '/teachCome',
      name: 'teachCome',
      meta: {
        title: '出入记录'
      },
      component: resolve => require(['@/components/teacher/teachCampusSafety/teachCome'], resolve)
    },
    {
      path: '/abnormal',
      name: 'abnormal',
      meta: {
        title: '异常明细'
      },
      component: resolve => require(['@/components/teacher/teachCampusSafety/abnormal'], resolve)
    },
    {
      path: '/checkDaily',
      name: 'checkDaily',
      meta: {
        title: '班级考勤日报'
      },
      component: resolve => require(['@/components/teacher/message/checkDaily'], resolve)
    },
    //********************************* 我的考勤 *************************************//
    {
      path: '/myCheck',
      name: 'myCheck',
      component: resolve => require(['@/components/teacher/myCheck/myCheck'], resolve),
      children: [
        {
          path: 'comings',
          name: 'comings',
          meta: {
            title: '出入记录'
          },
          component: resolve => require(['@/components/teacher/myCheck/comings'], resolve)
        },
        {
          path: 'ranking',
          name: 'ranking',
          meta: {
            title: '早到榜'
          },
          component: resolve => require(['@/components/teacher/myCheck/ranking'], resolve)
        }
      ]
    },
    //********************************* 我的消费 *************************************//
    {
      path: '/mySpending',
      name: 'mySpending',
      meta: {
        title: '我的消费'
      },
      component: resolve => require(['@/components/teacher/mySpending/mySpending'], resolve)
    },
    {
      path: '/monthlyBill',
      name: 'monthlyBill',
      meta: {
        title: '月账单'
      },
      component: resolve => require(['@/components/teacher/mySpending/monthlyBill'], resolve)
    },
    /*********************** 公用页面 ***********************/
    {
      path: '/reach',
      name: 'reach',
      meta: {
        title: '在校名单'
      },
      component: resolve => require(['@/components/publicPage/reach'], resolve)
    },
    {
      path: '/nonArrival',
      name: 'nonArrival',
      meta: {
        title: '未到校名单'
      },
      component: resolve => require(['@/components/publicPage/nonArrival'], resolve)
    },
    {
      path: '/leave',
      name: 'leave',
      meta: {
        title: '离校名单'
      },
      component: resolve => require(['@/components/publicPage/leave'], resolve)
    },
    {
      path: '/reissue',
      name: 'reissue',
      meta: {
        title: '补卡'
      },
      component: resolve => require(['@/components/publicPage/reissue'], resolve)
    },
  ]
})
