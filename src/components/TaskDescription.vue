<template>
  <h1 class="taskTitle"> {{allTask.title}} </h1>
  <span class="subTitle">Описание: </span>
  <pre class="description">{{ allTask.description.replaceAll('  ', ' ') }}</pre>
  <div v-for="(exam, index) in taskDetails" :key="index" class="example">
    <span class="subTitle">Пример {{index+1}}:</span>
    <div class="exampleBox">
      <span>Входные данные:</span>
      <pre v-for='(input) in exam.input' :key="input"> {{JSON.stringify(input)}}  </pre>
      <!-- <pre> {{JSON.stringify(exam.input)}} </pre> -->
      <span>Выходные данные:</span>
      <pre v-for='(output) in exam.output' :key="output"> {{JSON.stringify(output)}} </pre>
    </div>
      <!-- <pre> {{taskDetails}} </pre> -->
  </div>
</template>

<script>
import { ref, toRef } from '@vue/reactivity'
// import { useStore } from 'vuex'
export default {
  title: 'task-description',
  props: {
    task: {
      type: Object
    }
  },
  setup (props) {
    const allTask = toRef(props, 'task')
    const taskId = allTask.value.id
    const taskDetails = ref(null)

    getTaskDetails(taskId, taskDetails)

    function getTaskDetails (taskId, output) {
      const taskDetailUrl = 'http://100.90.100.22:5000/api/get_task_details'
      const body = {
        task_id: Number(taskId)
      }

      sendTaskDetails(taskDetailUrl, body, output)
    }

    function sendTaskDetails (URL, body, output) {
      fetch(URL, {
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
          output.value = result.examples
        })
    }

    console.log(allTask.value)
    return {
      allTask,
      sendTaskDetails,
      taskDetails
    }
  }
}
</script>

<style scoped>
.subTitle{
  display: block;
  margin-top: 15px;
  font-weight: 700;
  font-size: 20px;
}
.exampleBox{
  padding: 10px;
  margin-top: 5px;
  background-color: rgb(210, 194, 238);
}
.description{
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  text-indent: 0;
}
.taskTitle{
  margin-bottom: 0px;
}
</style>
