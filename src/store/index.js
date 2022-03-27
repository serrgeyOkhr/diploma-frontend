import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

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
    },
    tasks: [{
      id: 12,
      deadline: '05.10.2022',
      subject: 'Предмет 1',
      name: 'Поиск цифр в строке',
      description: 'В этом задании требуется найти все цифры в заданной строке. Функция должна вернуть строку цифр',
      published: true,
      group: 'ИТ-181'
    }]
  },
  getters: {
  },
  mutations: {
    updateUser (state, user) {
      state.user.name = user.name
      state.user.type = user.type
      state.user.group = user.group
    },
    updateTasks (state, data) {
      state.tasks = []
      data.forEach(element => {
        state.tasks.push(element)
      })
    },
    changeTaskPublished (state, data) {
      const task = state.tasks.filter((task) => { return task.id === data.id })
      task[0].published = data.published
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
