<template>
  <v-app>
    <NavBar />
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped></style>
