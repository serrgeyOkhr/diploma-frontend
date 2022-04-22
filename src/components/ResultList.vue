<template>
  <div v-if="resList">
    <div class="resultBlock" v-for="(elem, index) in resList" :key="index">
      <div>
        <span> {{elem.id}}) </span>
        <span :class="{right: elem.status}" v-if="elem.status">Верно</span>
        <span :class="{error: !elem.status}" v-else>Ошибка</span>
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
    id: {
      type: Number
    }
  },
  setup (props) {
    // const rezUrl = 'http://127.0.0.1:5000/get_shortRez'
    const taskId = toRef(props, 'id')
    // const resList = getResults(taskId.value)
    const resList = ref([
      { id: 3, status: true, date: '2022-03-28T13:59:41.102Z' },
      { id: 2, status: false, date: '2022-03-28T13:58:41.102Z' },
      { id: 1, status: false, date: '2022-03-28T13:57:41.102Z' }
    ])
    console.log(resList.value)
    if (resList.value === null) {
      resList.value = false
    }

    // function getResults (id) {
    //   const body = {
    //     id: id
    //   }

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
</style>
