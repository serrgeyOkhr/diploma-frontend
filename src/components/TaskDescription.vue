<template>
  <h1> {{task.name}} </h1>
  <span class="subTitle">Описание: </span>
  <div class="description">
    {{task.description}}
  </div>
  <div v-for="(exam, index) in task.examples" :key="index" class="example">
    <span class="subTitle">Пример {{index+1}}:</span>
    <div class="exampleBox">
      <span>Входные данные:</span>
      <pre> {{JSON.stringify(exam.input)}} </pre>
      <span>Выходные данные:</span>
      <pre> {{JSON.stringify(exam.outputs)}} </pre>
    </div>
  </div>
</template>

<script>
// import { useStore } from 'vuex'
export default {
  name: 'task-description',
  props: {
    task: {
      type: Object
    }
  }
  // state (props) {
  //   const task = useStore()
  //   return {

  //   }
  // }
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
</style>
