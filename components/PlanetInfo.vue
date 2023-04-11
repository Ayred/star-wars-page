<template>
  <span>
    <v-menu transition="fab-transition">
      <template v-slot:activator="{ on, attrs }">
        <slot />
        <v-btn v-bind="attrs" v-on="on" small>
          <v-icon color="blue" class="mr-2">mdi-earth</v-icon>
          {{ planetInfo.name }}
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item>
          <v-list-title class="text-h6">Planet Information</v-list-title>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item> Name: {{ planetInfo.name }} </v-list-item>
        <v-list-item> Population: {{ planetInfo.population }} </v-list-item>
        <v-list-item> Climate: {{ planetInfo.climate }} </v-list-item>
        <v-list-item> Gravity: {{ planetInfo.gravity }} </v-list-item>
      </v-list>
    </v-menu>
  </span>
</template>
<script>
export default {
  props: {
    planetInfo: {
      default: () => ({}),
    },
  },
};
</script>
