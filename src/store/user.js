import firebase from 'firebase'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, data) {
      state.info = data;
    }
  },
  actions: {
    async sendInfo({dispatch, commit}) {
      const uid = await dispatch('getUid');
      const userInfo = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();

      commit('setInfo', userInfo);
    }
  },
  getters: {
    info: i => i.info
  }
}