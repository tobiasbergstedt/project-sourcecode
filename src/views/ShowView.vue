<script>
  export default {
    created() {
      this.fetchShow()
    },
    data() {
      return {
        isFetching: true,
        show: '',
        genres: '',
        showLink: '',
        previous: '',
        cast: '',
      }
    },
    computed: {
      sliceYear() {
        return this.show.premiered.slice(0, 4)
      },
    },
    methods: {
      async fetchShow() {
        await this.axios
          .get(
            'https://api.tvmaze.com/shows/' +
              this.$route.params.showid +
              '?embed=cast'
          )
          .then((response) => {
            this.show = response.data
            this.genres = this.show.genres
            this.showLink = this.show.externals.imdb
            this.getPrevious()
            this.isFetching = false
            this.cast = this.show._embedded.cast.slice(0, 5)
          })
      },
      getYear() {
        if (
          (this.show.premiered === null) |
          (this.show.premiered === undefined)
        ) {
          return 'År ej tillgängligt'
        } else {
          return this.sliceYear
        }
      },
      getImage() {
        if (this.show.image === null) {
          return './assets/no-image-large.png'
        } else {
          return this.show.image.original
        }
      },
      getGenre(index) {
        this.genre = this.show.genres[index]
        return this.genre
      },
      getPrevious() {
        if (
          (this.show._links.previousepisode === null) |
          (this.show._links.previousepisode === undefined)
        ) {
          return 'Year Not available'
        } else {
          this.axios
            .get(this.show._links.previousepisode.href)
            .then((response) => {
              this.previous = response.data
            })
          return this.previous
        }
      },
    },
  }
</script>

<template>
  <div class="container" v-if="!isFetching">
    <div>
      <img class="poster" :src="getImage()" alt="Show Picture" />
    </div>
    <div class="text-wrapper">
      <h1>{{ this.show.name }} ({{ getYear() }})</h1>
      <div>
        <p v-if="this.show.network">
          Network: {{ this.show.network.name }},
          {{ this.show.network.country.name }}
        </p>
        <p v-else-if="this.show.webChannel">
          Platform: {{ this.show.webChannel.name }}
        </p>
        <p v-else>Network: No information about network/platform.</p>
      </div>
      <div>
        <p
          v-if="
            (typeof this.show.premiered !== null) &
            (typeof this.show.ended !== null)
          "
        >
          Original run: {{ this.show.premiered }} - {{ this.show.ended }}
        </p>
        <p v-else>Original run: No information.</p>
      </div>
      <div v-if="this.show._embedded.cast.length > 0" class="cast">
        <dl>
          Main cast:
          <dd :key="member.person.id" v-for="member in cast">
            {{ member.person.name }} as {{ member.character.name }}
          </dd>
        </dl>
      </div>
      <div v-else>
        <p>Main cast: No information available.</p>
      </div>
      <div>
        <p v-if="this.show.summary" v-html="this.show.summary" />
        <p v-else>Summary: No summary available.</p>
      </div>
      <div>
        <p v-if="this.show.language">Language: {{ this.show.language }}</p>
        <p v-else>Language: No information.</p>
      </div>
      <div>
        <dl v-if="this.show.genres.length">
          Genres:
          <dd :key="genre.length" v-for="(genre, index) in genres">
            {{ getGenre(index) }}
          </dd>
        </dl>
        <dl v-else>
          Genres:
          <dd>No genres available.</dd>
        </dl>
      </div>
      <div>
        <p v-if="this.show.rating.average">
          Average rating: {{ this.show.rating.average }}
        </p>
        <p v-else>Average rating: No information.</p>
      </div>
      <div>
        <p v-if="this.show.externals.imdb">
          IMDb Page:
          <a :href="'https://www.imdb.com/title/' + this.show.externals.imdb">
            https://www.imdb.com/title/{{ this.show.externals.imdb }}
          </a>
        </p>
        <p v-else>IMDb Page: No link available.</p>
      </div>
      <div>
        <p v-if="this.show._links.previousepisode">
          Previous episode:
          {{ this.previous.name }}
          {{ this.previous.airdate }}
        </p>
        <p v-else>Previous episode: No information.</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .container {
    margin-top: 2em;
    display: flex;
  }
  .text-wrapper {
    margin: 1em 2em 2em 2em;
  }
  .poster {
    height: 500px;
  }
  .my-container {
    text-align: center;
  }

  .cast {
    display: flex;
  }
</style>
