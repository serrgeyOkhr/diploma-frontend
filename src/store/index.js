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
      type: 69,
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
      state.user.name = user.name
      state.user.type = user.type
      state.user.group = user.group
    },
    createTasks (state, data) {
      state.tasks = []
      if (data.value) {
        data.value.forEach(element => {
          state.tasks.push(element)
        })
      }
    },
    addNewTasks (state, data) {
      // console.log('store data', data)
      // for (const element in data) {
      state.tasks.push(data)
      // }
      // data.forEach(element => {
      // })
    },
    saveNewTask (state, data) {
      const task = state.tasks.filter((task) => { return task.id === data.value.id })
      // console.log(data.value.id)
      task[0].deadline = data.value.deadline
      task[0].description = data.value.description
      task[0].group = data.value.group
      task[0].name = data.value.name
      task[0].published = data.value.published
      task[0].subject = data.value.subject
      task[0].examples = data.value.examples
    },
    changeTaskPublished (state, data) {
      const task = state.tasks.filter((task) => { return task.id === data.id })
      task[0].published = data.published
    },
    updateExamples (state, data) {
      const task = state.tasks.filter((task) => { return task.id === data.id })[0]
      // const i = task.examples.map((item, index) => item).indexOf(data.position)
      console.log('i = ', data.position)
      task.examples.splice(data.position, 1)
      // console.log('ex', data.tests)
      // console.log('id', data.id)
      // console.log('task', task.examples)
      // delete task.examples[data.position]
      // Reflect.deleteProperty(task.examples, data.position)
      // // data.tests.forEach(test => { task.examples.push(test) })
      // console.log('task', task.examples)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()]
})
