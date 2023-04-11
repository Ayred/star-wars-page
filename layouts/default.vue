<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-toolbar-title>
        <nuxt-link
          class="white--text ml-4"
          style="text-decoration: none"
          to="/"
        >
          <v-icon>mdi-sword</v-icon> {{ title }}
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      title: 'Star Wars Movies Catalog',
    };
  },
};
</script>
