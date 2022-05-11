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
        name: 'Сергей Вячеславович',
        type: 1,
        group: 'ИТ-181',
        login: 'stud_01',
        password: '1111'
      })
      server.create('user', {
        name: 'Антон Денисович',
        type: 2,
        group: undefined,
        login: 'prof_01',
        password: '1111'
      })
      server.create('user', {
        name: 'Админ Админович',
        type: 69,
        group: undefined,
        login: 'admin',
        password: 'admin'
      })

      server.create('task', { name: 'задание 1', description: 'Первое задание, из фейк сервера' })
    },

    routes () {
      this.namespace = 'api'

      this.post('/login', (schema, request) => {
        const data = JSON.parse(request.requestBody)
        console.log(data.login)
        const tmpUser = schema.users.where({ login: data.login })
        if (tmpUser.models[0] && tmpUser.models[0].password === data.password) {
          console.log('true')
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
