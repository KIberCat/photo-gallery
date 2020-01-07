<template>
  <v-content>
    <router-view/>
    <v-snackbar
      v-model="snackbar"
      :timeout="time"
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
  </v-content>
</template>

<script>
import messages from '@/utils/messages'

export default {
  data: () => ({
    snackbar: false,
    time: 3000,
    text: ''
  }),
  computed: {
    error() {
      return this.$store.getters.error
    }
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
  }
}
</script>