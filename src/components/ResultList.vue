<template>
  <!-- <pre>{{resList}}</pre> -->
  <div v-if="resList && resList.length !== 0">
    <div
    class="resultBlock"
    v-for="(elem, index) in resList"
    :class="{activeElem: elem.id === active}"
    :key="index"
    @click="$emit('handler_click', {id: elem.id, status: elem.success})"
    >
      <div>
        <span> {{elem.id}}) </span>
        <span :class="{right: elem.success}" v-if="elem.success">Верно</span>
        <span :class="{error: !elem.success}" v-else>Ошибка</span>
      </div>
      <span class="timeStamp">
        {{new Date(elem.time).getHours()}}:{{new Date(elem.time).getMinutes()}}:{{new Date(elem.time).getSeconds()}}
      {{new Date(elem.time).toLocaleDateString()}}
      </span>
    </div>
  </div>
  <div v-else>
    Нет предоставленных решений
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
import config from '@/config'
// import { isNull } from 'lodash'
export default {
  name: 'result-list',
  props: {
    _taskId: {
      type: Number
    },
    userId: {
      type: Number
    },
    activeID: {
      type: Number
    }
  },
  setup (props) {
    const rezUrl = config.hostname + config.api.getSolutionByUser
    const taskId = toRef(props, '_taskId')
    const user = toRef(props, 'userId')
    const active = toRef(props, 'activeID')
    const resList = ref(null)
    getResults(taskId.value, resList)
    // const resList = ref([
    //   { id: 3, status: 'passed', date: '2022-03-28T13:59:41.102Z' },
    //   { id: 2, status: 'test_failed', date: '2022-03-28T13:58:41.102Z' },
    //   { id: 1, status: 'runtime_error', date: '2022-03-28T13:57:41.102Z' }
    // ])
    console.log('taskId', taskId.value, ': user', user.value)
    console.log(resList)
    // if (isNull(resList.value)) {
    //   resList.value = false
    // }

    function getResults (id) {
      const body = {
        task_id: id,
        user_id: user.value ? user.value : undefined
      }
      const resp = ref(null)

      fetch(rezUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => response.json())
        .then(result => {
          console.log(result)
          resList.value = result
          console.log(resList.value)
        })
      return (resp.value)
    }

    return {
      taskId,
      user,
      active,
      resList
    }
  }
}
</script>

<style scoped>
.resultBlock {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  flex-direction: row;
  margin: 10px 0;
  padding: 5px;
  border: solid 1px;
}
.right{
  padding-left: 3px;
  color: rgb(55, 138, 0);
}
.error {
  padding-left: 3px;
  color: crimson;
}
.timeStamp{
  font-size: 16px;
}
.activeElem {
  background-color: rgb(243, 244, 194);
}
</style>
