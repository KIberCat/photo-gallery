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
            <v-toolbar-title>Регистрация</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                :error-messages="nameErrors"
                label="Имя"
                v-model="name"
                name="name"
                prepend-icon="mdi-account"
                type="text"
              />

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

              <v-text-field
                :error-messages="confirmPasswordErrors"
                v-model="confirmPassword"
                label="Повторите пароль"
                name="confirmPassword"
                prepend-icon="mdi-lock"
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click="submitHandler" color="primary">Регистрация</v-btn>
          </v-card-actions>
          <v-card-actions>
            <v-spacer/>
            Есть аккаунт ?
            <v-btn to="login" text color="primary">Авторизироваться</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { required, sameAs, minLength, email } from 'vuelidate/lib/validators'

export default {
  validations: {
    password: { required, minLength: minLength(8) },
    confirmPassword: { required, sameAsPassword: sameAs('password') },
    email: { required, email },
    name: { required, minLength: minLength(6) }
  },

  data: () => ({
    password: '',
    confirmPassword: '',
    email: '',
    name: ''
  }),

  computed: {
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Минимальный пароль 8 символов!')
      !this.$v.password.required && errors.push('Введите пароль!')
      return errors
    },
    confirmPasswordErrors () {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.required && errors.push('Повторите пароль!')
      !this.$v.confirmPassword.sameAsPassword && errors.push('Неверный пароль!')
      return errors
    },
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Некорректный e-mail!')
      !this.$v.email.required && errors.push('Введите e-mail!')
      return errors
    },
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.required && errors.push('Введите имя!')
      !this.$v.name.minLength && errors.push('Имя должно содержать не меннее 6 символов!')
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
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
      
    }
  },
}
</script>