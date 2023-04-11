<template>
  <v-skeleton-loader
    class="mx-auto"
    max-width="900"
    v-if="isLoading"
    type="image, article, article"
  >
  </v-skeleton-loader>
  <v-row v-else>
    <v-col>
      <template>
        <v-card class="mx-auto" max-width="900" color="bg">
          <v-img
            class="white--text align-end"
            height="200px"
            src="/images/characters.jpg"
          >
            <v-card-title class="title-background">{{
              characterDetails.name
            }}</v-card-title>
          </v-img>
          <v-card-text class="text--primary">
            <div class="pb-4">
              <div>Birth: {{ characterDetails.birth_year }}</div>
              <div>Date: {{ characterDetails.birth_year }}</div>
              <div>Gender: {{ characterDetails.gender }}</div>
              <div>Hair Color: {{ characterDetails.hair_color }}</div>
              <div>Eye Color: {{ characterDetails.eye_color }}</div>
              <div class="mt-3">
                <span class="font-weight-black text-subtitle-1">
                  Home World:
                </span>
                <planet-info :planetInfo="planetInfo">
                  <span> See planet info 👉 </span>
                </planet-info>
              </div>
            </div>
            <v-list dense>
              <v-list-item-title class="pl-3">
                Related Films:
              </v-list-item-title>
              <v-list-item v-for="film in relatedFilms" :key="film.url">
                <v-list-item-content>
                  <nuxt-link
                    :to="`/movie-details/${$helpers.getIdFromUrl(film.url)}`"
                  >
                    {{ film.title }}
                  </nuxt-link>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </template>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      relatedFilms: [],
      isLoading: true,
      characterDetails: {},
      planetInfo: {},
    };
  },
  created() {
    this.initialize();
  },
  computed: {},
  methods: {
    async initialize() {
      this.isLoading = true;
      this.characterDetails = await this.$axios.$get(
        `people/${this.$route.params.id}`
      );
      this.planetInfo = await this.$axios.$get(this.characterDetails.homeworld);
      this.relatedFilms = await Promise.all(
        this.characterDetails.films.map((film) => {
          return this.$axios.$get(film);
        })
      );
      this.isLoading = false;
    },
    showPlanetInfo() {
      this.$refs.planetInfo.show();
    },
  },
};
</script>
<style scoped>
.title-background {
  background-image: var(--always-dark-gradient);
  --always-dark-gradient: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
}
</style>
