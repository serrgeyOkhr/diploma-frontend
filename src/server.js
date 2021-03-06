import { createServer, Model, Response } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
      task: Model
    },

    seeds (server) {
      server.create('user', {
        id: 1,
        name: 'Сергей Вячеславович',
        type: 1,
        group: 'ИТ-181',
        username: 'stud_01',
        password: '1111'
      })
      server.create('user', {
        id: 2,
        name: 'Александр Константинович',
        type: 1,
        group: 'ИТ-182',
        username: 'stud_02',
        password: '1234567'
      })
      server.create('user', {
        id: 3,
        name: 'Антон Денисович',
        type: 2,
        group: undefined,
        username: 'prof_01',
        password: '1111'
      })
      server.create('user', {
        id: 4,
        name: 'Админ Админович',
        type: 69,
        group: undefined,
        username: 'admin',
        password: 'admin'
      })

      server.create('task', {
        id: 1,
        deadline: '2022,05,15',
        subject: 'Предмет 1',
        name: 'Квадрат числа',
        description: 'В этом задании требуется найти квадрат числа, поданного на вход',
        published: true,
        group: 'ИТ-181',
        examples: [
          { input: 5, output: [25] },
          { input: 10, output: [100] },
          { input: 0, output: [0] }
        ],
        done: true
      })
      server.create('task', {
        id: 2,
        deadline: '10.10.2022',
        subject: 'Предмет 1',
        name: 'Сортировка массива',
        description: 'В этом задании требуется отсортировать массив. На вход программы подается массив чисел, на выход отсортированный массив по возрастанию',
        published: true,
        group: 'ИТ-181',
        examples: [
          { input: [3, 1, 2, 6, 5, 4], output: [[1, 2, 3, 4, 5, 6]] },
          { input: [1, -1, 0], output: [[-1, 0, 1]] },
          { input: [], output: [[]] }
        ],
        done: false
      })
      server.create('task', {
        id: 3,
        deadline: '10.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск подстроки',
        description: 'В этом задании требуется отсортировать массив. На вход программы подается массив чисел, на выход отсортированный массив по возрастанию',
        published: true,
        group: 'ИТ-182',
        examples: [
          { input: [3, 1, 2, 6, 5, 4], output: [[1, 2, 3, 4, 5, 6]] },
          { input: [1, -1, 0], output: [[-1, 0, 1]] },
          { input: [], output: [[]] }
        ],
        done: false
      })
      server.create('task', {
        id: 4,
        deadline: '10.10.2022',
        subject: 'Предмет 1',
        name: 'Самый длинный полиндром',
        description: 'В этом задании требуется отсортировать массив. На вход программы подается массив чисел, на выход отсортированный массив по возрастанию',
        published: true,
        group: 'ИТ-182',
        examples: [
          { input: [3, 1, 2, 6, 5, 4], output: [[1, 2, 3, 4, 5, 6]] },
          { input: [1, -1, 0], output: [[-1, 0, 1]] },
          { input: [], output: [[]] }
        ],
        done: false
      })
    },

    routes () {
      this.namespace = 'api'

      this.post('/login', (schema, request) => {
        const data = JSON.parse(request.requestBody)
        const tmpUser = schema.users.where({ username: data.username })
        if (tmpUser.models[0] && tmpUser.models[0].password === data.password) {
          return new Response(200, {}, { response: 200, user: tmpUser.models[0] })
        } else {
          return new Response(400, {}, { errors: ['name cannot be blank'] })
        }
      })

      this.get('/users', (schema) => {
        return schema.users.all()
      })

      this.get('/tasks', (schema) => {
        return schema.tasks.all()
      })
    }
  })
  return server
}
