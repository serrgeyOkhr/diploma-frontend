<template>
  <div class="containerAdmin" v-if="showSettings === 'person'">
    <div class="title_selector">
      <h3
      @click="showChangePerson = false"
      :class="{active_view: !showChangePerson}"
      >Добавить</h3>
      <h3
      @click="showChangePerson = true"
      :class="{active_view: showChangePerson}"
      >Изменить</h3>
    </div>
    <div v-if="!showChangePerson" class="addForm">
      <CreatePerson />
    </div>
    <div v-else class="addForm">
      <CreatePerson :isChange='true'/>
    </div>
  </div>
  <div class="containerAdmin" v-else>
      <CreateTaskSub />
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import CreatePerson from './CreatePerson.vue'
import CreateTaskSub from './CreateTaskSub.vue'
export default {
  name: 'admin-view',
  components: {
    CreatePerson,
    CreateTaskSub
  },
  props: {
    showSettings: {
      type: String
    }
  },
  setup () {
    const showChangePerson = ref(false)
    return {
      showChangePerson
    }
  }
}
</script>

<style scoped>
.containerAdmin {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.title_selector {
  display: flex;
  font-size: 18px;
  align-items: center;
  color: rgb(121, 121, 121);
}
.title_selector h3 {
  padding: 5px;
  margin: 5px 0;
  cursor: pointer;
}
.active_view {
  border-bottom: 2px solid;
  font-size: 24px;
  color: black;
}
.addForm {
  width: 600px;
  margin: 0 10%;
  display: flex;
  flex-direction: column;
  border: solid 1px;
  border-radius: 10px;
  padding: 10px;
  background-color: rgb(248, 248, 248);
}
</style>
