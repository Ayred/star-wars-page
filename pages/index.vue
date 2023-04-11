<template>
  <v-row>
    <v-col>
      <v-card color="bg">
        <v-card-title> CATALOG </v-card-title>
        <v-card-text>
          <template>
            <v-container fluid>
              <v-data-iterator
                :items="items"
                :loading="isLoading"
                sort-by="episode_id"
                :sort-desc="sortDesc"
              >
                <template v-slot:header>
                  <v-toolbar color="bg" elevation="0">
                    <v-spacer></v-spacer>
                    <div class="pr-3">Sort by Episode Number:</div>

                    <v-btn-toggle v-model="sortDesc">
                      <v-btn small depressed :value="false">
                        <v-icon>mdi-arrow-up</v-icon>
                      </v-btn>
                      <v-btn small depressed :value="true">
                        <v-icon>mdi-arrow-down</v-icon>
                      </v-btn>
                    </v-btn-toggle>
                  </v-toolbar>
                </template>
                <template v-slot:loading>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                      lg="4"
                      v-for="i in 3"
                      :key="i"
                      ><v-skeleton-loader class="mx-auto" type="card">
                      </v-skeleton-loader
                    ></v-col>
                  </v-row>
                </template>
                <template v-slot:default="{ items }">
                  <v-row>
                    <v-col
                      v-for="item in items"
                      :key="item.title"
                      cols="12"
                      sm="6"
                      md="4"
                      lg="4"
                    >
                      <v-card
                        :to="`/movie-details/${$helpers.getIdFromUrl(
                          item.url
                        )}`"
                        color="#00838F"
                        elevation="12"
                      >
                        <v-card-title class="subheading font-weight-bold">
                          {{ item.title }}
                        </v-card-title>
                        <v-divider></v-divider>
                        <v-list class="pt-6" min-height="240" dense>
                          <v-list-item>
                            <v-list-item-content>
                              Release Date:
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ $helpers.formatDate(item.release_date) }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              Episode Number:
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.episode_id }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              Director:
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.director }}
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              Producer:
                            </v-list-item-content>
                            <v-list-item-content class="align-end">
                              {{ item.producer }}
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-card>
                    </v-col>
                  </v-row>
                </template>
              </v-data-iterator>
            </v-container>
          </template>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      sortDesc: null,
      isLoading: true,
      items: [],
    };
  },
  created() {
    this.initialize();
  },
  computed: {},
  methods: {
    async initialize() {
      this.isLoading = true;
      const { results } = await this.$axios.$get('films');
      this.items = results;
      this.isLoading = false;
    },
  },
};
</script>
