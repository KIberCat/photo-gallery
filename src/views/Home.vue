<template>
  <v-content>
    <v-container
      class="fill-height"
      fluid
      v-if="loading"
    >
      <v-row 
        align="center"
        justify="center"
        class="py-8"
      >
        <Loader/>
      </v-row>
    </v-container>

    <v-container
      class="fill-height"
      fluid
      v-else-if="!imageSrc.length && !loading"
    >
      <v-row
        justify="center"
      >
        <div class="d-flex flex-column align-center">
          <p class="headline font-weight-bold">
            У вас нет загруженных изображений.
          </p>
          <div class="my-2">
            <v-btn color="primary" x-large :loading="loadingBtn" @click="downloadPhoto">Загрузить</v-btn>
            <input 
              type="file" 
              ref="inputFile" 
              class="input-photo" 
              accept="image/*"
              @change="fileChange"
            >
          </div>
        </div>
      </v-row>
    </v-container>
    
    <v-container
      class="fill-height"
      fluid
      v-else
    >
      <v-row
        class="px-10 py-4"
      >
        <div class="my-2 mr-8">
          <v-btn color="primary" :loading="loadingBtn" @click="downloadPhoto">Загрузить</v-btn>
          <input 
            type="file" 
            ref="inputFile" 
            class="input-photo" 
            accept="image/*"
            @change="fileChange"
          >
        </div>
        <div class="my-2">
          <v-btn color="primary" :disabled="!activePhoto || loadingBtn" @click="deletePhoto">Удалить</v-btn>
        </div>
      </v-row>

      <v-row
        justify="start"
        class="px-10 py-3 mx-n4"
      >
        <v-hover 
          v-for="(value, idx) in imageSrc" 
          :key="idx"
          class="mx-2 mb-4"
        >
          <template v-slot:default="{ hover }">
            <v-card
            >
              <v-img
                class="white--text align-end"
                height="200px"
                width="300px"
                :src="value.src"
              >
              </v-img>
              <v-fade-transition>
                <v-overlay
                  v-if="hover || value.active"
                  absolute
                  color="#000"
                  class="d-flex"
                >
                  <v-btn 
                    @click="value.active = !value.active" 
                    text 
                    icon 
                    :color="value.active ? 'blue' : 'white'"
                  >
                    <v-icon>mdi-check-bold</v-icon>
                  </v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>

      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'home',
  data: () => ({
    image: null,
    imageSrc: [],
    loading: true,
    loadingBtn: false
  }),
  methods: {
    ...mapActions(['savePhoto', 'setPhoto', 'removePhoto']),

    downloadPhoto() {
      this.$refs.inputFile.click();
    },

    async fileChange(event) {
      this.loadingBtn = true;

      try {
        const file = event.target.files[0];
        await this.savePhoto(file);
      } catch (e) {}

      this.loadingBtn = false;
    },

    async deletePhoto() {
      console.log(document.location.href);
      try {
        let photo = this.imageSrc.filter(item => {
          if (item.active) {
            return item;
          }
        });

        await this.removePhoto(photo);
      } catch (e) {}
    }
  },
  computed: {
    ...mapGetters(['images']),
    activePhoto() {
      return this.imageSrc.some(item => item.active);
    }
  },
  watch: {
    images(img) {
      this.imageSrc = img;
    }
  },
  async mounted() {
    try {
      if (!this.images.length) {
        await this.setPhoto();
      } else {
        this.imageSrc = this.images;
      }

      this.loading = false;
    } catch (e) {}
  }
}
</script>

<style scoped lang="scss">
  .input-photo {
    display: none;
  }
</style>
