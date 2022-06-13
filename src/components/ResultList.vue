<template>
  <div v-if="resList">
    <div
    class="resultBlock"
    v-for="(elem, index) in resList"
    :class="{activeElem: elem.id === active}"
    :key="index"
    @click="$emit('handler_click', {id: elem.id, status: elem.status})"
    >
      <div>
        <span> {{elem.id}}) </span>
        <span :class="{right: elem.status === 'passed'}" v-if="elem.status === 'passed'">Верно</span>
        <span :class="{error: elem.status !== 'passed'}" v-else>Ошибка</span>
      </div>
      <span class="timeStamp">
        {{new Date(elem.date).getHours()}}:{{new Date(elem.date).getMinutes()}}:{{new Date(elem.date).getSeconds()}}
      {{new Date(elem.date).toLocaleDateString()}}
      </span>
    </div>
  </div>
  <div v-else>
    Нет предоставленных решений
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
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
    // const rezUrl = 'http://127.0.0.1:5000/get_shortRez'
    const taskId = toRef(props, '_taskId')
    const user = toRef(props, 'userId')
    const active = toRef(props, 'activeID')
    // const resList = getResults(taskId.value)
    const resList = ref([
      { id: 3, status: 'passed', date: '2022-03-28T13:59:41.102Z' },
      { id: 2, status: 'test_failed', date: '2022-03-28T13:58:41.102Z' },
      { id: 1, status: 'runtime_error', date: '2022-03-28T13:57:41.102Z' }
    ])
    console.log('taskId', taskId.value, ': user', user.value)
    console.log(resList.value)
    if (resList.value === null) {
      resList.value = false
    }

    // function hello (id) {
    //   console.log('id = ', id)
    // }

    //   const resp = ref(null)

    //   fetch(rezUrl, {
    //     method: 'POST',
    //     mode: 'cors',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(body)
    //   })
    //     .then(async (response) => { resp.value = await response.json() })
    //   return resp
    // }

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
