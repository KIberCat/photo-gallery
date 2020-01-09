import firebase from 'firebase'

export default {
  state: {
    images: null
  },
  mutations: {
    setImages(state, data) {
      state.images = data;
    },
    clearImages(state) {
      state.images = null;
      // state.images = {};
    },
    updateActiveImage(state, id) {
      state.images.map(item => {
        if (item.id === id) item.active = !item.active;
      });
    }
  },
  actions: {
    async savePhoto({commit, dispatch}, data) {
      try {
        // const image = data;
        const uid = await dispatch('getUid');

        const fileData = await firebase.storage().ref(`pictures/${uid}/${data.name}`).put(data);
        const imageUrl = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL();
        const pushImg = await firebase.database().ref(`/users/${uid}/images`).push(imageUrl);
        
      // Преобразуем объект с ключами в массив объектов.
        const imagesSrc = (await firebase.database().ref(`/users/${uid}/images`).once('value')).val();
        const imageArr = Object.keys(imagesSrc).map(key => ({id: key, src: imagesSrc[key], active: false}));

        commit('setImages', imageArr);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async getPhoto({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid');
        const imagesSrc = (await firebase.database().ref(`/users/${uid}/images`).once('value')).val();
        
        if (imagesSrc) {
          const imagesArr = Object.keys(imagesSrc).map(key => ({id: key, src: imagesSrc[key], active: false}));
          commit('setImages', imagesArr);
        } else {
          commit('setImages', []);
        }
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async removePhoto({dispatch, getters}, data) {
      try {
        const uid = await dispatch('getUid');
        let obj = {};
        getters.activeImage.map(item => obj[`/users/${uid}/images/${item.id}`] = null);
        
        await firebase.database().ref().update(obj);
        await dispatch('getPhoto');
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  },
  getters: {
    images: i => i.images,

    activeImage: i => i.images.filter(item => {
      if (item.active) return item;
    })
  }
}