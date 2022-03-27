<template>
  <Header/>
  <h1>Hello, this is component {{ locTask.id }} </h1>
  <pre>
    {{locTask}}
  </pre>
</template>

<script>
import Header from '../components/Header.vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
export default {
  name: 'task-vue',
  components: {
    Header
  },
  setup () {
    const route = useRoute()
    const store = useStore()
    console.log(store.state.tasks)
    const locTask = store.state.tasks.filter((task) => {
      // console.log(task.id)
      // console.log(route.params.id)
      return Number(task.id) === Number(route.params.id)
    })[0]
    console.log(locTask)
    return {
      locTask
    }
  }
}
</script>

<style>

</style>
