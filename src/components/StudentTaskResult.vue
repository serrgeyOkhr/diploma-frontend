<template>
  <h1>Результаты {{ taskId }} студента</h1>
</template>

<script>
import { toRef } from '@vue/reactivity'
export default {
  name: 'student-task-result',
  props: {
    id: {
      type: Number
    }
  },
  setup (props) {
    const taskId = toRef(props, 'id')

    return {
      taskId
    }
  }
}
</script>

<style>

</style>
