<template>
  <Header/>
  <div v-if="userType === 1" class="container">
    <div class="description">
      <div class="navBar">
        <n-button :class="['testButton', 'btn', 'handle_active']" @click="toggleView = true">Задание</n-button>
        <n-button :class="['testButton', 'btn']" @click="toggleView = false">Результаты</n-button>
      </div>
      <div class="content" v-if="this.toggleView">
        <TaskDescription :task=locTask />
      </div>
      <div class="content" v-else>Результаты</div>
    </div>
    <div class="expectation">
      <div class="codeTaker" v-if="this.toggleView"><CodeTaker :id=locTask.id :task=locTask /></div>
      <div class="resultsList" v-else>Список результатов</div>
    </div>
  </div>
  <div v-if="userType === 2" class="container">
    <div class="description">
      <div class="content">
        <!-- <TaskDescription :task=locTask /> -->
        Придумать как это сделать
      </div>
      <div class="changeTaskButton">
        <n-button @click="changeTask()">Редактировать задание</n-button>
      </div>
    </div>
    <div class="expectation">
      <div class="resultsList">Список результатов</div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import TaskDescription from '../components/TaskDescription.vue'
import CodeTaker from '../components/CodeTaker.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'
export default {
  name: 'task-vue',
  components: {
    Header,
    TaskDescription,
    CodeTaker
  },
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const toggleView = ref(true)
    const tasks = store.state.tasks
    const userType = store.state.user.type
    const subjects = new Set()
    const groups = new Set()

    const locTask = tasks.filter((task) => {
      // console.log(task.id)
      // console.log(route.params.id)
      return Number(task.id) === Number(route.params.id)
    })[0]

    tasks.forEach(element => {
      subjects.add(element.subject)
      groups.add(element.group)
    })
    console.log(subjects, groups)
    function changeTask () {
      // console.log(taskId)
      router.push({ name: 'changeTaskID', params: { id: locTask.id, task: locTask } })
    }

    // console.log(locTask.id)
    // console.log(locTask)
    return {
      locTask,
      toggleView,
      userType,
      changeTask
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
}
.description{
  width: 30%;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  text-align: left;
  /* margin: 0 5px; */
  padding: 0 15px;
  border-right: 1px solid;
  max-height: calc(100vh - 100px);
  min-height: calc(100vh - 100px);
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.expectation{
  width: 70%;
  /* margin: 0 10px; */
  padding: 0 5px;
  /* background-color: #ccc; */
}
/* .codeTaker {
  width: 75%;
} */
.navBar{
  margin-top: 10px;
}
.description::-webkit-scrollbar {
  display: none;
}
.n-button:hover{
  color:black;
}
.n-button:focus{
  color:black;
}
</style>
