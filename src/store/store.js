// import Vue from 'vue'
// import Vuex from 'vuex'
//
// Vue.use(Vuex);

const state = {
  classId:'',
  showBack: true,
  userInfo: ''
};

const mutations={
  add(state,id){
    state.classId = id;
  },
  remove(state){
    state.classId = '';
  },

  getUserInfo(state,text){
    state.userInfo = text;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
