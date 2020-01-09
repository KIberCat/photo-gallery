<template>
  <v-row
    justify="start"
    class="px-10 py-3 mx-n4"
  >
    <v-hover 
      v-for="(item, idx) in images" 
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
            :src="item.src"
          >
          </v-img>
          <v-fade-transition>
            <v-overlay
              v-if="hover || item.active"
              absolute
              color="#000"
              class="d-flex"
            >
              <v-btn 
                @click="updateActiveImage(item.id)" 
                text 
                icon 
                :color="item.active ? 'blue' : 'white'"
              >
                <v-icon>mdi-check-bold</v-icon>
              </v-btn>
            </v-overlay>
          </v-fade-transition>
        </v-card>
      </template>
    </v-hover>

  </v-row>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
  methods: {
    ...mapMutations(['updateActiveImage'])
  },
  computed: {
    ...mapGetters(['images'])
  }
}
</script>