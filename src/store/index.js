import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import photo from './photo'
import user from './user'
import album from './album'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    }
  },
  actions: {
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, photo, user, album
  }
})
