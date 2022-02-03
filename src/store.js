import { createStore } from 'vuex'

const mutations = {
    saveShowName(state, n) {
      state.showName = n
    },
    saveShowId(state, n) {
      state.showId = n
    },
  },
  state = {
    showName: '',
    showId: '',
  }

export default createStore({ mutations, state, strict: true })
