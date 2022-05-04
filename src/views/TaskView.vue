<template>
  <Header/>
  <div v-if="userType === 1" class="container">
    <div class="content" v-if="this.toggleView">
      <div class="subclass">
        <div class="navBar">
          <n-button class="testButton btn" :class="{handle_active: toggleView}" @click="toggleView = true">Задание</n-button>
          <n-button class="testButton btn" :class="{handle_active: !toggleView}"  @click="toggleView = false">Результаты</n-button>
          <div class="description">
          <TaskDescription :task=locTask />
          </div>
        </div>
      </div>
      <div class="codeTaker">
        <CodeTaker :id=locTask.id :task=locTask />
      </div>
    </div>

    <div class="content" v-else>
      <div class="subclass">
        <div class="navBar">
          <n-button class="testButton btn" :class="{handle_active: toggleView}" @click="toggleView = true">Задание</n-button>
          <n-button class="testButton btn" :class="{handle_active: !toggleView}"  @click="toggleView = false">Результаты</n-button>
          <div class="description">
            <ResultList :id='locTask.id' @handler_click="hello"/>
          </div>
        </div>
      </div>
      <div class="resultsList">
        <DetailResult :rezId='detailTask' :key='detailTask.id'/>
      </div>
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
import ResultList from '../components/ResultList.vue'
import DetailResult from '../components/DetailRez.vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref } from '@vue/reactivity'
export default {
  name: 'task-vue',
  components: {
    Header,
    TaskDescription,
    CodeTaker,
    ResultList,
    DetailResult
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
    const detailTask = ref({ id: null, status: null })

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
    function hello (data) {
      detailTask.value.id = data.id
      detailTask.value.status = data.status
    }
    // console.log(locTask.id)
    // console.log(locTask)
    return {
      locTask,
      toggleView,
      userType,
      detailTask,
      changeTask,
      hello
    }
  }
}
</script>

<style scoped>
.container{
  display: flex;
}
.content{
  display: flex;
  width: 100%;
}
.subclass{
  width: 30%;
  border-right: solid 1px;
}
.resultsList{
  width: 70%;
  padding: 0 10px;
}
.codeTaker{
  min-width: 70%;
  padding: 0 10px;
}
.description{
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  text-align: left;
  /* margin: 0 5px; */
  padding: 0 15px;
  max-height: calc(100vh - 140px);
  min-height: calc(100vh - 140px);
  overflow: auto;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
.expectation{
  /* width: 70%; */
  /* margin: 0 10px; */
  /* padding: 0 5px; */
  /* background-color: #ccc; */
}
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
