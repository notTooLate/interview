import Vue from 'vue'
import {
  Tab, TabItem, Cell, CellBox, Group, Datetime,  Countup, XHeader, InlineCalendar, Popup, XTextarea
} from 'vux'



Vue.component('tab', Tab);
Vue.component('tab-item', TabItem);
Vue.component('cell', Cell);
Vue.component('cell-box', CellBox);
Vue.component('group', Group);
Vue.component('datetime', Datetime);
Vue.component('countup', Countup);
Vue.component('x-header', XHeader);
Vue.component('inline-calendar', InlineCalendar);
Vue.component('popup', Popup);
Vue.component('x-textarea', XTextarea);



import {DatetimePlugin,ConfirmPlugin, ToastPlugin} from 'vux'
Vue.use(ToastPlugin);
Vue.use(ConfirmPlugin);
Vue.use(DatetimePlugin);

//经测试 全局引用 和 组件中引用   首页加载 vendor.js 区别 非常小



