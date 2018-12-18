import Vue from 'vue';
import Vuex from 'vuex';
// import * as mutations from './mutations'
// import * as actions from './action'


Vue.use(Vuex)

// const state = {
//   actionPopup: false
// }

export default new Vuex.Store({
  // actions,
  // mutations,
  state:{
    actionPopup: false
  },
  mutations:{
    updateActionPopup(value){
      return this.actionPopup = value;
    }
  }
})
