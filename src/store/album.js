import firebase from 'firebase'

export default {
  state: {
    albums: {}
  },
  mutations: {
    setAlbums(state, data) {
      state.albums = data;
    }
  },
  actions: {
    async createAlbum({commit, dispatch}, data) {
      try {
        const uid = await dispatch('getUid');

        const pushAlbum = await firebase.database().ref(`/users/${uid}/albums`).push(data);
        const albumsObj = (await firebase.database().ref(`/users/${uid}/albums`).once('value')).val();
        const albumsData = Object.keys(albumsObj).map(key => (
          {
            ...albumsObj[key], 
            id: key, 
            delete: false, 
            modal: false,
            change: false
          }
        ));
        
        commit('setAlbums', albumsData);
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async setAlbum({commit, dispatch}) {
      try {
        const uid = await dispatch('getUid');
        const albumsObj = (await firebase.database().ref(`/users/${uid}/albums`).once('value')).val();

        if (albumsObj) {
          const albumsData = Object.keys(albumsObj).map(key => (
            {
              ...albumsObj[key], 
              id: key, 
              delete: false, 
              modal: false,
              change: false
            }
          ));
          console.log(albumsData)
          commit('setAlbums', albumsData);
        } else {
          commit('setAlbums', []);
        }
        await dispatch('getPhoto');
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async removeAlbum({dispatch}, data) {
      try {
        const uid = await dispatch('getUid');
        let obj = {[`/users/${uid}/albums/${data.id}`]: null};

        await firebase.database().ref().update(obj);
        await dispatch('setAlbum');
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    },

    async updateName({dispatch}, data) {
      try {
        const uid = await dispatch('getUid');
        let obj = {[`/users/${uid}/albums/${data.id}/name`]: data.name};

        await firebase.database().ref().update(obj);
        await dispatch('setAlbum');
      } catch (e) {
        commit('setError', e);
        throw e;
      }
    }
  },
  getters: {
    albums: i => i.albums
  }
}