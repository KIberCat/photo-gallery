import firebase from 'firebase'

export default {
  state: {
    images: []
  },
  mutations: {
    setImages(state, img) {
      state.images = img;
    },
    clearImages(state) {
      state.images = {};
    }
  },
  actions: {
    async savePhoto({commit, dispatch}, data) {
      try {
        const image = data;
        const uid = await dispatch('getUid');

        const fileData = await firebase.storage().ref(`pictures/${uid}/${image.name}`).put(image);
        const imageUrl = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL();
        const pushImg = await firebase.database().ref(`/users/${uid}/images`).push(imageUrl);
        
        const imagesSrc = (await firebase.database().ref(`/users/${uid}/images`).once('value')).val();
        const imgArr = Object.keys(imagesSrc).map(key => ({id: key, src: imagesSrc[key], delete: false}));
        commit('setImages', imgArr);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async setPhoto({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid');
        const imagesSrc = (await firebase.database().ref(`/users/${uid}/images`).once('value')).val();
        
        if (imagesSrc) {
          const imgArr = Object.keys(imagesSrc).map(key => ({id: key, src: imagesSrc[key], active: false}));
          commit('setImages', imgArr);
        } else {
          commit('setImages', []);
        }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async removePhoto({dispatch}, data) {
      try {
        const uid = await dispatch('getUid');
        let obj = {};
        data.map(item => obj[`/users/${uid}/images/${item.id}`] = null);

        await firebase.database().ref().update(obj);
        await dispatch('setPhoto');
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  },
  getters: {
    images: i => i.images
  }
}