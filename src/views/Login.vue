<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Авторизация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                :error-messages="emailErrors"
                label="E-mail"
                v-model="email"
                name="email"
                prepend-icon="mdi-account"
                type="text"
              />

              <v-text-field
                :error-messages="passwordErrors"
                v-model="password"
                label="Пароль"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click="submitHandler" color="primary">Войти</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-spacer/>
            Нету аккаунта ?
            <v-btn to="register" text color="primary">Зарегистрироваться</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'
import messages from '@/utils/messages'

export default {
  validations: {
    password: { required, minLength: minLength(8) },
    email: { required, email },
  },

  data: () => ({
    password: '',
    email: '',
  }),

  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Минимальный пароль 8 символов!')
      !this.$v.password.required && errors.push('Введите пароль!')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Некорректный e-mail!')
      !this.$v.email.required && errors.push('Введите e-mail!')
      return errors
    },
  },

  methods: {
    async submitHandler () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  },

  mounted() {
    if (messages[this.$route.query.message]) {
      this.$store.commit('setError', messages[this.$route.query.message]);
    }
  }
}
</script>