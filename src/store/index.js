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
      type: '',
      group: ''
    },
    tasks: [{
      id: 12,
      deadline: '2022,05,15',
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
      // console.log('from state', user)
      // console.log('state.user', state)
      state.user.id = user.id
      state.user.name = user.name
      state.user.type = user.user_type
      state.user.group = user.group
    },
    createTasks (state, data) {
      state.tasks = []
      if (data) {
        data.forEach(element => {
          // console.log(element)
          state.tasks.push(element)
        })
      }
    },
    addNewTasks (state, data) {
      state.tasks.push(data)
    },
    saveNewTask (state, data) {
      const task = state.tasks.filter((task) => { return task.id === data.value.id })
      // console.log('F to pay', data)
      task[0].deadline = data.value.deadline
      task[0].description = data.value.description
      task[0].group = data.value.group
      task[0].title = data.value.title
      task[0].shown = data.value.shown
      task[0].subject = data.value.subject
      task[0].examples = data.value.examples
      task[0].tests = data.value.tests
    },
    changeTaskPublished (state, data) {
      const task = state.tasks.filter((task) => { return task.id === data.id })
      // console.log('data', data)
      task[0].published = data.shown
    },
    updateExamples (state, data) {
      const task = state.tasks.filter((task) => { return task.id === data.id })[0]
      // console.log('i = ', data.position)
      task.examples.splice(data.position, 1)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
