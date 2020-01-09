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
      v-else-if="!albums.length && !loading"
    >
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="400px">

          <template v-slot:activator="{ on }">
            <div class="d-flex flex-column align-center">
              <p class="headline font-weight-bold">
                У вас нет созданных альбомов!
              </p>
              <div class="my-2">
                <v-btn color="primary" x-large v-on="on">Создать</v-btn>
              </div>
            </div>
          </template>

          <v-card>
            <v-card-title>
              Введите название альбома.
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  :error-messages="nameErrors"
                  label="Название"
                  v-model="name"
                  name="name"
                  type="text"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeForm">Закрыть</v-btn>
              <v-btn color="blue darken-1" text @click="submitForm">Создать</v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
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
        <v-dialog v-model="dialog" persistent max-width="400px">

          <template v-slot:activator="{ on }">
            <div class="my-2">
              <v-btn color="primary" v-on="on">Создать альбом</v-btn>
            </div>
          </template>

          <v-card>
            <v-card-title>
              Введите название альбома.
            </v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field
                  :error-messages="nameErrors"
                  label="Название"
                  v-model="name"
                  name="name"
                  type="text"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="closeForm">Закрыть</v-btn>
              <v-btn color="primary" text @click="submitForm">Создать</v-btn>
            </v-card-actions>
          </v-card>

        </v-dialog>
      </v-row>
      <v-row
        justify="start"
        class="px-10 py-3 mx-n4"
      >
        <v-card
          v-for="(value, idx) in albumsCard"
          :key="idx"
          class="mx-2 mb-4"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
            height="200"
            width="300"
            v-if="value.hasOwnProperty('albumList')"
          ></v-img>

          <div 
            v-else
            class="album-image"
          >
            <p class="title">Альбом пустой</p>
          </div>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="headline">{{ value.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions>
            <v-row justify="center">
              <v-dialog v-model="value.modal" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                  <v-btn text color="primary" dark v-on="on" @click="pushPhoto">Добавить фото</v-btn>
                </template>

                <v-card>
                  <v-toolbar dark color="primary">
                    <v-btn icon dark @click="value.modal = false">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>

                    <v-toolbar-title>Добавить фото в альбом {{ value.name }}</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-toolbar-items>
                      <v-btn dark text :disabled="!activePhoto" @click="addToAlbum">Добавить</v-btn>
                    </v-toolbar-items>
                  </v-toolbar>
                        <v-container
                          class="fill-height"
                          fluid
                        >
                          <v-row
                            justify="start"
                            class="px-10 py-4"
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
                </v-card>
              </v-dialog>
            </v-row>

            <v-spacer></v-spacer>

            <v-dialog v-model="value.change" persistent max-width="400px">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title>
                  Редактировать название альбома.
                </v-card-title>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      :error-messages="newNameErrors"
                      label="Название"
                      v-model.trim="getName"
                      name="changeName"
                      type="text"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="value.change = false">Закрыть</v-btn>
                  <v-btn color="primary" text @click="changeName">Сохранить</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            

            <v-dialog v-model="value.delete" persistent max-width="400">
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline">Удалить альбом ?</v-card-title>
                <v-card-text>Предупреждение! Вы собираетесь удалить альбом "{{ value.name }}" в котром 10 фотографий.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="value.delete = false">Закрыть</v-btn>
                  <v-btn color="primary" text @click="deleteAlbum">Удалить</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-container>

  </v-content>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'album',
  validations: {
    name: { required },
    newName: { required }
  },
  data: () => ({
    name: '',
    dialog: false,
    loading: true,
    albumsCard: [],
    newName: '',
    imageSrc: []
  }),
  methods: {
    ...mapActions(['createAlbum', 'setAlbum', 'removeAlbum', 'updateName']),
    
    async submitForm() {
      if (this.$v.name.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        name: this.name
      };

      try {
        await this.createAlbum(formData);
        this.dialog = false;
      } catch (e) {}

      this.name = '';
    },

    closeForm() {
      this.name = '';
      this.dialog = false;
    },

    pushPhoto() {
      console.log('Hello');
    },

    async deleteAlbum() {
      let album = this.albumsCard.find(item => item.delete);

      try {
        await this.removeAlbum(album);
        album.delete = false;
      } catch (e) {}
    },

    async changeName() {
      if (this.$v.newName.$invalid) {
        this.$v.$touch()
        return
      }

      let {id} = this.albumsCard.find(item => item.change);
      let data = {
        id,
        name: this.newName
      }

      try {
        await this.updateName(data);
      } catch (e) {}
    },

    async addToAlbum() {
      let data = this.imageSrc;

      console.log(data);
    }
  },
  computed: {
    ...mapGetters(['albums', 'images']),

    activePhoto() {
      return this.imageSrc.some(item => item.active);
    },

    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Введите название!')
      return errors
    },

    newNameErrors () {
      const errors = []
      if (!this.$v.newName.$dirty) return errors
      !this.$v.newName.required && errors.push('Введите название!')
      return errors
    },

    getName: {
      get: function() {
        let data = this.albumsCard.find(item => item.change);
        if (data) {
          this.newName = data.name;
          return data.name;
        }
      },
      
      set: function(value) {
        this.newName = value;
      }
    }
  },
  watch: {
    albums(data) {
      this.albumsCard = data;
    },

    images(img) {
      this.imageSrc = img;
    }
  },
  async mounted() {
    try {
      if (!this.albums.length) {
        await this.setAlbum();
      } else {
        this.albumsCard = this.albums;
      }

      this.loading = false;
    } catch (e) {}
  }
}
</script>

<style scoped lang="scss">
  .album-image {
    background: #cecece;
    height: 200px;
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>