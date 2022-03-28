<template>
  <Header/>
  <div class="container">
    <div class="description">
      <div class="navBar">
        <n-button @click="toggleView = true">Задание</n-button>
        <n-button @click="toggleView = false">Результаты</n-button>
      </div>
      <div class="content" v-if="this.toggleView">
        <TaskDescription :task=locTask />
      </div>
      <div class="content" v-else>Результаты</div>
    </div>
    <div class="expectation">
      <div class="codeTaker" v-if="this.toggleView"><CodeTaker /></div>
      <div class="resultsList" v-else>Список результатов</div>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header.vue'
import TaskDescription from '../components/TaskDescription.vue'
import CodeTaker from '../components/CodeTaker.vue'
import { useRoute } from 'vue-router'
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
    const store = useStore()
    const toggleView = ref(true)
    console.log(store.state.tasks)
    const locTask = store.state.tasks.filter((task) => {
      // console.log(task.id)
      // console.log(route.params.id)
      return Number(task.id) === Number(route.params.id)
    })[0]
    console.log(locTask)
    return {
      locTask,
      toggleView
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
  max-height: calc(100vh - 115px);
  min-height: calc(100vh - 115px);
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
.description::-webkit-scrollbar {
  display: none;
}
</style>
