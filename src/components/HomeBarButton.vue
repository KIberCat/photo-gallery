<template>
  <v-row
    class="px-10 py-4"
  >
    <div class="my-2 mr-8">
      <v-btn 
        color="primary" 
        :loading="loadingDownloadBtn" 
        @click="downloadImage"
      >
        Загрузить
      </v-btn>

      <input 
        type="file" 
        ref="inputFile" 
        class="button-download" 
        accept="image/*"
        @change="changeFile"
      >
    </div>
    <div class="my-2">
      <v-btn 
        color="primary" 
        :disabled="!activeImage.length || loadingDownloadBtn"
        :loading="loadingDeleteBtn" 
        @click="deleteImage"
      >
        Удалить
      </v-btn>
    </div>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data: () => ({
    loadingDownloadBtn: false,
    loadingDeleteBtn: false,
  }),
  methods: {
    ...mapActions(['savePhoto', 'removePhoto']),
    
    downloadImage() {
      this.$refs.inputFile.click();
    },

    async changeFile(event) {
      this.loadingDownloadBtn = true;

      try {
        const file = event.target.files[0];
        await this.savePhoto(file);
      } catch (e) {}

      this.loadingDownloadBtn = false;
    },

    async deleteImage() {
      this.loadingDeleteBtn = true;

      try {
        await this.removePhoto();
      } catch (e) {}

      this.loadingDeleteBtn = false;
    }
  },
  computed: {
    ...mapGetters(['images', 'activeImage'])
  }
}
</script>

<style scoped lang="scss">
  .button-download {
    display: none;
  }
</style>