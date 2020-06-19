<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>Performance Review</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="loggedInUser" color="white" text dark @click="logout">
      <v-icon>
        mdi-logout
      </v-icon>
      Log out
    </v-btn>
    <nuxt-link v-else to="/login">
      <v-btn color="white" text>Login</v-btn>
    </nuxt-link>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['loggedInUser'])
  },

  methods: {
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>
