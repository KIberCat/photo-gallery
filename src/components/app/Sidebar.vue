<template>
  <v-navigation-drawer
    v-model="value"
    clipped
    app
  >

    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Меню
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list shaped>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in galery"
          :key="i"
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <v-list shaped>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in settings"
          :key="i"
          :to="item.url"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-divider></v-divider>

    <v-list shaped>
      <v-list-item-group color="primary">
        <v-list-item
          v-for="(item, i) in exit"
          :key="i"
          @click="logout"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'sidebar',
  props: ['value'],
  data: () => ({
    item: 0,
    galery: [
      { icon: 'mdi-contacts', text: 'Фото', url: '/' },
      { icon: 'mdi-history', text: 'Альбомы', url: 'album' },
    ],
    settings: [
      { icon: 'mdi-contacts', text: 'Профиль', url: 'profile' },
      { icon: 'mdi-history', text: 'Настройки', url: 'settings' },
    ],
    exit: [
      { icon: 'mdi-contacts', text: 'Выход'},
    ]
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  }
}
</script>

