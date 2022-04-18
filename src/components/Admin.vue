<template>
  <div class="container">
    <n-button-group>
      <n-button @click="showChangePerson = false">1</n-button>
      <n-button @click="showChangePerson = true">2</n-button>
    </n-button-group>
    <div v-if="!showChangePerson" class="addForm">Добавить</div>
    <div v-else class="addForm">Изменить</div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
  name: 'admin-view',
  setup () {
    const showChangePerson = ref(false)
    return {
      showChangePerson
    }
  }
}
</script>

<style>
.container{
  display: flex;
}
</style>
