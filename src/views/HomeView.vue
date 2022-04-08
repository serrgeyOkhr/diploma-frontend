<template>
  <div class="home">
    <Header @setTasks="setTasks" :subjects='subjects' :showSubject='showSubject'/>
    <div class="container">
      <div class="taskBar" v-for='(group, index) in groups' :key='index'>
        <TaskCom
        v-for='(task, index) in showTask'
        :id='task.id'
        :key='index'
        :title="task.name"
        :description="task.description"
        :published="task.published"
        :done="task.done"
        @openPage="openTask(task.id, task)"
        />
        <!-- <h2 class=group_header v-if='groups.size >= 1'> {{task}} </h2> -->
        <!-- <div class="task_item" v-for='(task, index) in showTask' :key='index'>{{task.name}}</div> -->
        <n-button v-if='user.type === 2' class='addTask' @click='createTask()' :color=this.style.colors.purple>Добавить задание</n-button>
      </div>
      <div class="statsBar"> <span>content</span></div>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { mapMutations, mapState, useStore } from 'vuex'
import TaskCom from '../components/Task.vue'
import Header from '../components/Header.vue'
import { useRouter } from 'vue-router'

// @ is an alias to /src
// import ModalLogin from '@/components/ModalLogin.vue'
// const testUser = {
//   name: 'oleg',
//   id: 9999
// }
export default {
  name: 'HomeView',
  components: {
    TaskCom,
    Header
  },
  data () {
    return {
      showSubject: 'all'
    }
  },
  computed: {
    showTask () {
      return this.showSubject === 'all' ? this.tasks : this.tasks.filter(el => el.subject === this.showSubject)
    },
    ...mapState({
      state_tasks: 'tasks'
    })
  },
  methods: {
    ...mapMutations({
      updateUser: 'updateUser'
    }),
    setTasks (subject) {
      this.showSubject = subject
      if (subject === 'all') {
        console.log(this.tasks)
        return null
      }
      console.log(this.tasks.filter((task) => {
        return task.subject === subject
      }))
    },
    logStore () {
      console.log('state: ', this.state_tasks)
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const user = ref(store.state.user)
    const style = ref(store.state.style)
    const tasks = getTasks()
    const subjects = new Set()
    const groups = new Set()

    function setData (place, data) {
      store.commit(place, data)
    }

    tasks.forEach(element => {
      subjects.add(element.subject)
      groups.add(element.group)
    })

    function createTask () {
      router.push({ name: 'changeTask' })
    }

    function getTasks () {
      const tasks = [{
        id: 1,
        deadline: '2022,05,15',
        subject: 'Предмет 1',
        name: 'Поиск цифр в строке',
        description: 'В этом задании требуется найти корни квадратного уравнения. Функция должна необходимое число корней, или "нет корней. В этом задании требуется найти корни квадратного уравнения. В этом задании требуется найти корни квадратного уравнения.',
        published: true,
        group: 'ИТ-181',
        examples: [
          {
            input: 5,
            outputs: [25]
          },
          {
            input: 'ab',
            outputs: ['aba', 'bab']
          },
          {
            input: [[2, 6, 4], [4, -1, 8]],
            outputs: [[1, 4], [4, 1]]
          }

        ]
      },
      {
        id: 2,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181'
      },
      {
        id: 3,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: false,
        group: 'ИТ-181'
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 5,
        deadline: '15.10.2022',
        subject: 'Предмет 1',
        name: 'Поиск символов в строке',
        description: 'В этом задании требуется найти все буквы в заданной строке. Функция должна вернуть строку',
        published: true,
        group: 'ИТ-181',
        done: true
      },
      {
        id: 4,
        deadline: '11.10.2022',
        subject: 'Предмет 2',
        name: 'решение квадратного уравнения',
        description: 'В этом задании требуется найти корни квадратного уравнения. Функция должна необходимое число корней, или "нет корней. В этом задании требуется найти корни квадратного уравнения. В этом задании требуется найти корни квадратного уравнения."',
        published: true,
        group: 'ИТ-181',
        done: false
      }]
      return tasks
    }

    function openTask (taskId, task) {
      console.log(taskId)
      router.push({ name: 'task', params: { id: taskId, task: task } })
    }

    if (!localStorage.getItem('User')) {
      localStorage.setItem('User', JSON.stringify(store.state.user))
      setData('createTasks', tasks)
    } else {
      setData('updateUser', JSON.parse(localStorage.getItem('User')))
      setData('createTasks', tasks)
    }
    console.log(JSON.parse(localStorage.getItem('User')))
    console.log(store.state.user)
    // console.log(store.state.tasks)

    console.log('setUp')
    // localStorage.setItem('User', JSON.stringify(store.state.user))
    return {
      subjects,
      tasks,
      groups,
      user,
      style,
      openTask,
      createTask
    }
  }
}

</script>

<style scoped>
.btn {
  font-size: 18px;
  padding: 10px 20px;
}

.container {
  display: flex;
  justify-content: space-between;
}
.taskBar {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15px;
  flex-shrink: 0;
  border: 1px solid #fff;
  border-right-color: black;
  max-height: calc(100vh - 100px);
  min-height: calc(100vh - 100px);
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.statsBar{
  width: 70%;
}
.taskBar::-webkit-scrollbar {
  display: none;
}
.task_item{
  border: 1px solid #F8D57E;
  padding: 10px;
  margin-bottom: 10px;
}
.statsBar {
  display: flex;
  width: 70%;
  justify-content: center;
  align-items: center;
}
.n-button:hover{
  color:black
}
.n-button:focus{
  color:black
}
.addTask{
  margin-top: 20px;
}
</style>
