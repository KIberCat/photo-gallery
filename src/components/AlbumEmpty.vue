<template>
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
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapActions } from 'vuex'

export default {
  validations: {
    name: { required }
  },
  data: () => ({
    dialog: false,
    name: ''
  }),
  methods: {
    ...mapActions(['createAlbum']),

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
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Введите название!')
      return errors
    }
  }
}
</script>