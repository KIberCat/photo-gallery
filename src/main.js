import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Vuelidate from 'vuelidate'
import Loader from '@/components/app/Loader'

import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.component('Loader', Loader);

firebase.initializeApp({
  apiKey: "AIzaSyBBXRNUz2TYwNMtoSQvTLhBTrcwYATuaWo",
  authDomain: "photo-galery-5dcf4.firebaseapp.com",
  databaseURL: "https://photo-galery-5dcf4.firebaseio.com",
  projectId: "photo-galery-5dcf4",
  storageBucket: "photo-galery-5dcf4.appspot.com",
  messagingSenderId: "243443305072",
  appId: "1:243443305072:web:93f95d677f3491c33182b5",
  measurementId: "G-DEPLVWJG45"
});

firebase.analytics();

let app

firebase.auth().onAuthStateChanged(() => {

  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
  
})




