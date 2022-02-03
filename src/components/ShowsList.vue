<script>
  export default {
    data() {
      return {
        shows: '',
        showName: '',
      }
    },
    watch: {
      showName(a) {
        if (a.length < 3) {
          this.shows = []
        } else {
          this.fetchShows()
        }
      },
    },
    methods: {
      storeShow(index) {
        this.$store.commit('saveShowName', this.shows[index].show.name)
        this.$store.commit('saveShowId', this.shows[index].show.id)
        localStorage.setItem(
          'savedShow',
          JSON.stringify(this.shows[index].show.id)
        )
      },
      fetchShows() {
        this.axios
          .get('https://api.tvmaze.com/search/shows?q=' + this.showName)
          .then((response) => {
            this.shows = response.data
          })
      },
      getYear(index) {
        if (this.shows[index].show.premiered !== null) {
          this.premierYear = this.shows[index].show.premiered.slice(0, 4)
          return this.premierYear
        } else {
          return 'Year Not available'
        }
      },
      getSummary(index) {
        if (this.shows[index].show.summary.length > 350) {
          this.summary = this.shows[index].show.summary.slice(0, 350) + '...'
          return this.summary
        } else {
          return this.shows[index].show.summary
        }
      },
      getImage(index) {
        if (this.shows[index].show.image === null) {
          return './assets/no-image.png'
        } else {
          return this.shows[index].show.image.medium
        }
      },
    },
    props: {
      name: {
        type: String,
        default: 'Star Trek',
        validator: (value) => {
          return value !== ''
        },
      },
    },
  }
</script>

<template>
  <h2>Find tv show</h2>
  <p>Type at least three characters to search.</p>

  <input
    class="form-control-lg mb-4"
    id="showName"
    placeholder="Search here"
    v-model="showName"
    type="text"
  />

  <ol class="shows-list container" v-if="shows.length > 0">
    <li :key="show.show.id" v-for="(show, index) in shows">
      <RouterLink :to="'/show/' + show.show.id">
        <img class="poster" :src="getImage(index)" alt="Show Picture" />
      </RouterLink>
      <div class="shows-list-content">
        <RouterLink class="link-dark lead m-3" :to="'/show/' + show.show.id">
          {{ show.show.name }}
        </RouterLink>
        {{ getYear(index) }}
        <p v-if="show.show.summary" v-html="getSummary(index)" class="mx-3" />
        <p v-else>There is no summary for this show.</p>
        <RouterLink
          class="show-link link-dark mx-3 my-2"
          :to="'/show/' + show.show.id"
        >
          Read more...
        </RouterLink>
      </div>
    </li>
  </ol>
  <p v-if="$store.state.showName.length > 0">{{ $store.state.showName }}</p>
</template>

<style lang="scss" scoped>
  $box-shadow: hsla(0, 100%, 0%, 0.5);

  li {
    background-color: white;
  }

  .shows-list {
    width: 900px;
  }
  .shows-list li {
    display: flex;
    height: 150px;
    margin: 0 0 1.5em 0;
    border-radius: 0.5em;
    box-shadow: 0.25em 0.25em 0.5em 0 $box-shadow;
  }
  .shows-list-content {
    position: relative;
    text-align: left;
    .show-link {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }

  .poster {
    width: 107px;
    height: 150px;
    border-radius: 0.5em 0 0 0.5em;
  }

  .link-dark {
    text-decoration: none;
  }
</style>
