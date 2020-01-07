<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
  >
    <v-app-bar-nav-icon @click.stop="$emit('click')" />

    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-4"
    >
      <span class="hidden-sm-and-down">Фото галерея</span>
    </v-toolbar-title>

    <v-text-field
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down"
    />

    <v-spacer />

    <v-toolbar-items>
      <!-- <v-btn
        text
      >
        <div class="mr-2">{{ info.name }}</div>
        <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          /></v-avatar>
      </v-btn> -->
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <!-- <v-btn
                  color="primary"
                  v-on="on"
                >
                  Dropdown
                </v-btn> -->
                <v-btn
                  text
                  v-on="on"
                >
                  <div class="mr-2">{{ info.name }}</div>
                  <v-avatar
                    size="32px"
                    item
                  >
                    <v-img
                      src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                      alt="Vuetify"
                    /></v-avatar>
                </v-btn>
              </template>
              <v-list>
                <v-list-item to="profile">
                  <v-list-item-content>
                    <v-list-item-title>Профиль</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item @click="logout">
                  <v-list-item-content>
                    <v-list-item-title>Выход</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'navbar',
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    }
  }
}
</script>