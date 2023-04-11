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
          <v-img class="white--text align-end" height="200px" :src="poster">
            <v-card-title class="title-background">{{
              movieDetails.title
            }}</v-card-title>
          </v-img>
          <v-card-subtitle class="pb-0">
            Episode {{ movieDetails.episode_id }}
          </v-card-subtitle>
          <v-card-text class="text--primary">
            <div>
              Release Date: {{ $helpers.formatDate(movieDetails.release_date) }}
            </div>
            <div>Director: {{ movieDetails.director }}</div>
            <div>Producer: {{ movieDetails.producer }}</div>

            <div>
              <div class="crawl mt-2">
                <div id="titles">
                  <p class="text-center">Opening Crawl:</p>
                  <p>
                    {{ movieDetails.opening_crawl }}
                  </p>
                </div>
              </div>
            </div>

            <v-list dense>
              <v-list-item-title class="pl-3">
                Characters names:
              </v-list-item-title>
              <v-list-item v-for="character in characters" :key="character.url">
                <v-list-item-content>
                  <nuxt-link
                    :to="`/characters/${$helpers.getIdFromUrl(character.url)}`"
                    >{{ character.name }}</nuxt-link
                  >
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
      poster: '',
      characters: [],
      isLoading: true,
      movieDetails: {},
    };
  },
  created() {
    this.initialize();
  },
  computed: {},
  methods: {
    async getPicture() {
      try {
        const { Poster } = await this.$axios.$get(
          `https://www.omdbapi.com/?t=${this.movieDetails.title}&apikey=${process.env.imageApiKey}`
        );
        return Poster;
      } catch {
        return '/images/star-wars.jpg';
      }
    },
    async initialize() {
      this.isLoading = true;
      this.movieDetails = await this.$axios.$get(
        `films/${this.$route.params.id}`
      );
      this.characters = await Promise.all(
        this.movieDetails.characters.map((character) => {
          return this.$axios.$get(character);
        })
      );
      this.poster = await this.getPicture();
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
.crawl {
  background: #1e1e1e;
  font-family: Helvetica;
  text-transform: uppercase;
}

#titles {
  font-weight: bold;
  text-align: justify;
  -webkit-transform-origin: 50% 100%;
  -moz-transform-origin: 50% 100%;
  -o-transform-origin: 50% 100%;
  -ms-transform-origin: 50% 100%;
  transform-origin: 50% 100%;
  -webkit-transform: perspective(300px) rotateX(25deg);
  -moz-transform: perspective(300px) rotateX(25deg);
  -o-transform: perspective(300px) rotateX(25deg);
  -ms-transform: perspective(300px) rotateX(25deg);
  transform: perspective(300px) rotateX(25deg);
}

.title-background {
  background-image: var(--always-dark-gradient);
  --always-dark-gradient: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
}
</style>
