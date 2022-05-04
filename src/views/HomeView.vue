<template>
  <div class="home">
    <Header @setTasks="setTasks" :subjects='subjects' :showSubject='showSubject'/>
    <div v-if="user.type === 69" class="container">
      <Admin />
    </div>
    <div v-else class="container">
      <div class="taskBar" v-if="user.type === 2">
        <div class="taskBarContent" v-for='(group, index) in groups' :key='index'>
          <h2 class=group_header v-if='user.type === 2 && groups.length >= 1' @click="updateShow(index)"> {{ group.title }} </h2>
          <div class="groupTasks">
            <TaskCom
            v-for='(task, index) in showTask(group.title)'
            :id='task.id'
            :key='index'
            :title="task.name"
            :description="task.description"
            :published="task.published"
            :done="task.done"
            @openPage="openTask(task.id, task)"
            />
          </div>
        </div>
        <n-button class='addTask' @click='createTask()' :color=this.style.colors.purple>Добавить задание</n-button>
      </div>
      <div class="taskBar" v-else>
        <TaskCom
        v-for='(task, index) in showTask(user.group)'
        :id='task.id'
        :key='index'
        :title="task.name"
        :description="task.description"
        :published="task.published"
        :done="task.done"
        @openPage="openTask(task.id, task)"
        />
      </div>
      <div class="statsBar">
        <span> Статистика </span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { ref, toRaw } from '@vue/reactivity'
import { mapState, useStore } from 'vuex'
import TaskCom from '../components/Task.vue'
import Header from '../components/Header.vue'
import Admin from '../components/Admin.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'HomeView',
  components: {
    TaskCom,
    Header,
    Admin
  },
  data () {
    return {
      showSubject: 'all'
    }
  },
  computed: {
    ...mapState({
      state_tasks: 'tasks'
    })
  },
  methods: {
    showTask (groupTitle) {
      if (this.tasks) {
        return this.showSubject === 'all' ? this.tasks.filter((el) => { return el.group === groupTitle }) : this.tasks.filter(el => el.subject === this.showSubject).filter((el) => { return el.group === groupTitle })
      }
    },
    setTasks (subject) {
      this.showSubject = subject
      if (subject === 'all') {
        return null
      }
    }
  },
  setup () {
    const tasksUrl = 'http://127.0.0.1:5000/get_tasks'
    const store = useStore()
    const router = useRouter()
    const user = ref(store.state.user)
    const style = ref(store.state.style)
    const resp = ref(null)
    const customError = ref(null)
    const loading = ref(null)
    const tasks = ref(null)
    // const showGroupTask = ref(false)
    if (user.value.type !== 69) {
      // tasks.value = getTasks(user)
      tasks.value = getStaticTasks() // СТАТИЧНЫЕ ЗАДАНИЯ
    }
    const subjects = new Set()
    const groupsList = new Set()
    const groups = ref([])

    if (tasks.value) {
      tasks.value.forEach(element => {
        subjects.add(element.subject)
        groupsList.add(element.group)
      })
    }

    groupsList.forEach((el) => {
      const group = {
        title: el,
        show: false
      }
      groups.value.push(group)
    })

    setData('updateUser', store.state.user)
    setData('createTasks', tasks)

    function setData (place, data) {
      store.commit(place, data)
    }

    function createTask () {
      router.push({ name: 'changeTask' })
    }

    function updateShow (index) {
      console.log(groups.value[index])
      groups.value[index].show = !groups.value[index].show
    }

    function getTasks (user) {
      /** ожидаемый return:
      * [
      *   {
      *     id: 1 (type: Number),
      *     deadline: TimeStamp (type: ????),
      *     subject: 'sub1' (type: String),
      *     name: 'title' (type: String),
      *     description: 'descript' (type: String),
      *     published: true / false (type: Boolean),
      *     group: 'IT-6969' (type: String),
      *     examples: [{}] (type: Object),
      *     done: true / false (type: Boolean)
      *   }
      * ]
      */
      const body = {
        id: user.id
      }

      loading.value = true
      fetch(tasksUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(async (response) => { resp.value = await response.json() })
        .then((response) => { loading.value = false })
        .catch((error) => {
          customError.value = error
          setTimeout(() => { loading.value = false }, 1000)
        })
      return toRaw(resp.value)
    }
    function getStaticTasks () {
      const tasks = [{
        id: 1,
        deadline: '2022,05,15',
        subject: 'Предмет 1',
        name: 'Квадрат числа 1',
        description: 'В этом задании требуется найти квадрат числа, поданного на вход',
        published: true,
        group: 'ИТ-181',
        examples: [
          { input: 5, output: [25] },
          { input: 10, output: [100] },
          { input: 0, output: [0] }
        ],
        done: false
      },
      {
        id: 2,
        deadline: '10.10.2022',
        subject: 'Предмет 2',
        name: 'Сортировка массива 2',
        description: 'В этом задании требуется отсортировать массив. На вход программы подается массив чисел, на выход отсортированный массив по возрастанию',
        published: true,
        group: 'ИТ-181',
        examples: [
          { input: [3, 1, 2, 6, 5, 4], output: [[1, 2, 3, 4, 5, 6]] },
          { input: [1, -1, 0], output: [[-1, 0, 1]] },
          { input: [], output: [[]] }
        ],
        done: false
      },
      {
        id: 3,
        deadline: '10.10.2022',
        subject: 'Предмет 2',
        name: 'Сортировка массива 3',
        description: 'В этом задании требуется отсортировать массив. На вход программы подается массив чисел, на выход отсортированный массив по возрастанию',
        published: true,
        group: 'ИТ-182',
        examples: [
          { input: [3, 1, 2, 6, 5, 4], output: [[1, 2, 3, 4, 5, 6]] },
          { input: [1, -1, 0], output: [[-1, 0, 1]] },
          { input: [], output: [[]] }
        ],
        done: false
      },
      {
        id: 4,
        deadline: '10.10.2022',
        subject: 'Предмет 1',
        name: 'Сортировка массива 4',
        description: 'В этом задании требуется отсортировать массив. На вход программы подается массив чисел, на выход отсортированный массив по возрастанию',
        published: true,
        group: 'ИТ-182',
        examples: [
          { input: [3, 1, 2, 6, 5, 4], output: [[1, 2, 3, 4, 5, 6]] },
          { input: [1, -1, 0], output: [[-1, 0, 1]] },
          { input: [], output: [[]] }
        ],
        done: false
      }
      ]
      return tasks
    }

    function openTask (taskId, task) {
      console.log(taskId)
      router.push({ name: 'task', params: { id: taskId, task: task } })
    }

    // console.log(JSON.parse(localStorage.getItem('User')))
    // console.log(store.state.user)
    // // console.log(store.state.tasks)
    // console.log('setUp')
    // localStorage.setItem('User', JSON.stringify(store.state.user))
    return {
      subjects,
      tasks,
      groupsList,
      groups,
      user,
      style,
      openTask,
      // showGroupTask,
      createTask,
      updateShow
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
  align-items: stretch;
  justify-content: start;
  /* padding: 0 15px; */
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
.group_header {
  border-bottom: solid 1px;
  cursor: pointer;
}
</style>
