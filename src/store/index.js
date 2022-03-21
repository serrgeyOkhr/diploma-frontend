import { createStore } from 'vuex'

export default createStore({
  state: {
    style: {
      colors: {
        yellow: '#F8D57E',
        purple: '#9672F7'
      }
    },
    user: {
      name: '',
      group: ''
    }
  },
  getters: {
  },
  mutations: {
    updateUser (state, user) {
      state.user.name = user.name
      state.user.type = user.type
      state.user.group = user.group
    }
  },
  actions: {
  },
  modules: {
  }
})
