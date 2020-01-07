<template>
  <div class="main-wrapper">
    <div 
      v-if="loading" 
      class="main-loading"
    >
      <Loader/>
    </div>
    <div v-else>
      <Navbar @click="drawer = !drawer" />

      <Sidebar v-model="drawer" />

      <router-view/>

      <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        right
        top
      >
        {{ text }}
        <v-btn
          dark
          text
          @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
import messages from '@/utils/messages'
import {mapGetters, mapActions} from 'vuex'

export default {
  data: () => ({
    drawer: true,
    snackbar: false,
    text: '',
    loading: true
  }),
  components: {
    Navbar, Sidebar
  },
  methods: {
    ...mapActions(['sendInfo'])
  },
  computed: {
    ...mapGetters(['error', 'info'])
  },
  watch: {
    error(fbError) {
      if (messages[fbError.code]) {
        this.text = messages[fbError.code]
      } else if (messages[this.$route.query.message]) {
        this.text = fbError
      } else {
        this.text = 'Что то пошло не так(('
      }
      this.snackbar = true
    }
  },
  async mounted() {
    if (!Object.keys(this.info).length) {
      await this.sendInfo();
    }
    this.loading = false;
  }
}
</script>

<style lang="scss" scoped>
  .main-loading {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>