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
      v-else-if="!images.length && !loading"
    >

      <HomeEmpty/>
      
    </v-container>
    
    <v-container
      class="fill-height"
      fluid
      v-else
    >

      <HomeBarButton/>

      <HomeCardImage/>

    </v-container>
  </v-content>
</template>

<script>
import HomeEmpty from '@/components/HomeEmpty'
import HomeBarButton from '@/components/HomeBarButton'
import HomeCardImage from '@/components/HomeCardImage'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'home',
  components: {
    HomeCardImage, 
    HomeBarButton,
    HomeEmpty
  },
  data: () => ({
    loading: true,
    loadingBtn: false
  }),
  methods: {
    ...mapActions(['getPhoto'])
  },
  computed: {
    ...mapGetters(['images'])
  },
  async mounted() {
    try {
      if (!this.images) {
        await this.getPhoto();
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
