import { createServer, Model } from 'miragejs'

export function makeServer ({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    models: {
      user: Model,
      task: Model
    },

    seeds (server) {
      server.create('user', { name: 'Bob' })
      server.create('user', { name: 'Alice' })

      server.create('task', { name: 'задание 1', description: 'Первое задание, из фейк сервера' })
    },

    routes () {
      this.namespace = 'api'

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
