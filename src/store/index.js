import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    baseUrl: process.env.VUE_APP_API_URL,
    user:null
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setUser(state, user){
      state.user = user;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment')
    },
    login({ commit }, user) {
      commit('setUser', user);
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
    getBaseUrl(state) {
      return state.baseUrl
    },
    loged(state) {
      return !!state.user;
    }
  }
});
