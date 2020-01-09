<template>
  <v-row
    justify="center"
  >
    <div class="d-flex flex-column align-center">
      <p class="headline font-weight-bold">
        У вас нет загруженных изображений.
      </p>
      <div class="my-2">
        <v-btn color="primary" x-large :loading="loadingBtn" @click="downloadImage">Загрузить</v-btn>
        <input 
          type="file" 
          ref="inputFile" 
          class="button-download" 
          accept="image/*"
          @change="changeFile"
        >
      </div>
    </div>
  </v-row>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  data: () => ({
    loadingBtn: false
  }),
  methods: {
    ...mapActions(['savePhoto']),

    downloadImage() {
      this.$refs.inputFile.click();
    },

    async changeFile(event) {
      this.loadingBtn = true;

      try {
        const file = event.target.files[0];
        await this.savePhoto(file);
      } catch (e) {}

      this.loadingBtn = false;
    },
  }
}
</script>

<style scoped lang="scss">
  .button-download {
    display: none;
  }
</style>