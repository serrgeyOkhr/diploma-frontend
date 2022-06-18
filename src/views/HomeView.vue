<template>
<n-spin :show="loading">
  <div class="home">
    <Header @adminPage="adminPage" @setTasks="setTasks" :subjects='subjects' :showSubject='showSubject' />
    <div v-if="user.type === 'admin'" class="container">
      <Admin :showSettings='showSettings' />
    </div>
    <div v-else class="container">
      <div class="taskBar" v-if="user.type === 'teacher'">
        <div class="taskBarContent" v-for='(group, index) in groups' :key='index'>
          <h2 class=group_header v-if="user.type === 'teacher' && groups.length >= 1" @click="updateShow(index)"> {{ group.title }} </h2>
          <div class="groupTasks">
            <TaskCom
            v-for='(task, index) in showTask(group.title)'
            :id='task.id'
            :key='index'
            :title="task.title"
            :description="task.description"
            :published="task.shown"
            :task="task"
            @openPage="openTask(task.id, task)"
            />
          </div>
        </div>
        <n-button
        class='addTask'
        @click='createTask()'
        :color='this.style.colors.purple'
        >
        Добавить задание
        </n-button>
      </div>
      <div class="taskBar" v-else>
        <TaskCom
        v-for='(task, index) in showTask(user.group)'
        :id='task.id'
        :key='index + Math.random()'
        :title="task.title"
        :description="task.description"
        :done="task.done"
        :task="task"
        @openPage="openTask(task.id, task)"
        />
      </div>
      <div class="statsBar">
        <span> Статистика </span>
      </div>
    </div>
  </div>
</n-spin>
</template>

<script>
import { ref } from '@vue/reactivity'
import { mapState, useStore } from 'vuex'
import TaskCom from '../components/Task.vue'
import Header from '../components/Header.vue'
import Admin from '../components/Admin.vue'
import { useRouter } from 'vue-router'
import config from '@/config'

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
    },
    adminPage (selector) {
      this.showSettings = selector
    }
  },
  async setup () {
    const store = useStore()
    const router = useRouter()
    const user = ref(store.state.user)
    const style = ref(store.state.style)
    // const resp = ref(null)
    // const customError = ref(null)
    const loading = ref(null)
    const tasks = ref(null)
    const showSettings = ref('person')
    const subjects = new Set()
    const groupsList = new Set()
    const groups = ref([])
    const serverTasks = ref([])

    if (user.value.type !== 'admin') {
      getTasks(serverTasks)
        .then((response) => {
          // console.log(serverTasks)
          if (serverTasks.value.length > 0) {
            serverTasks.value.forEach(element => {
              subjects.add(element.subject)
              groupsList.add(element.group)
            })
          }
          setData('createTasks', serverTasks.value)
          tasks.value = serverTasks.value
        })
    }

    groupsList.forEach((el) => {
      const group = {
        title: el,
        show: false
      }
      groups.value.push(group)
    })

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

    async function getTasks (output) {
      const tasksUrl = config.hostname + config.api.getTasks
      loading.value = true
      return fetch(tasksUrl, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => {
          if (response.status !== 200) {
            router.push({ name: 'login' })
          }
          return response.json()
        })
        .then(result => {
          console.log(result)
          output.value = result
        })
        .catch((error) => {
          console.error(error)
        })
        .finally(() => { loading.value = false })
    }

    function openTask (taskId, task) {
      console.log(taskId)
      router.push({ name: 'task', params: { id: taskId, task: task } })
    }

    return {
      subjects,
      groupsList,
      groups,
      tasks,
      loading,
      user,
      showSettings,
      style,
      openTask,
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
