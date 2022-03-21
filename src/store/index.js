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
      name: 'Ivan',
      group: 'IT-191'
    }
  },
  getters: {
  },
  mutations: {
    updateUser (state, user) {
      state.user.name = user.name
      state.user.id = user.id
      state.user.group = user.group
    }
  },
  actions: {
  },
  modules: {
  }
})
