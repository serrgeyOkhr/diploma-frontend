<template>
  <Header/>
  <div class="container">
    <div class="taskDescription">
      <div class="taskDescriptionItem">
        <div class="taskDescriptionItemContainer">
          <h2>Название: </h2>
            <n-popover trigger="hover" raw :show-arrow="false">
              <template #trigger>
                <span class="itemHealper">?</span>
              </template>
              <div class="popoverHealper">
                <span>
                  Название задания. Например: Задание 1 <br> new line
                </span>
              </div>
            </n-popover>
          <h3 class="testDescriptionDynamic"> {{taskValue.name}} </h3>
        </div>
        <div class="taskInputWrap">
          <n-input class="taskInput" type="text" v-model:value="taskValue.name" />
        </div>
      </div>
      <div class="taskDescriptionItem">
        <div>
          <h4>Описание: </h4>
              <n-popover trigger="hover" raw :show-arrow="false">
                <template #trigger>
                  <span class="itemHealper">?</span>
                </template>
                <div class="popoverHealper">
                  <span>
                    Полное описание задания. Что сделать, как? Какие цели у этого задания. Связь с реальным миром.
                  </span>
                </div>
              </n-popover>
        </div>
        <div class="taskInput">
          <n-input type="textarea" v-model:value="taskValue.description" />
       </div>
      </div>
      <div class="taskDescriptionItem">
        <div>
          <h4>Предмет: </h4>
            <n-popover trigger="hover" raw :show-arrow="false">
              <template #trigger>
                <span class="itemHealper">?</span>
              </template>
              <div class="popoverHealper">
                <span>
                  Выберите предмет, для которого предназначается это задание
                </span>
              </div>
            </n-popover>
        </div>
        <div class="taskInput">
          <n-select v-model:value="taskValue.subject" :options="subjects" />
          <!-- <n-input type="text" v-model:value="taskValue.subject" /> -->
       </div>
      </div>
      <div class="taskDescriptionItem">
        <div>
          <h4>Группа: </h4>
            <n-popover trigger="hover" raw :show-arrow="false">
              <template #trigger>
                <span class="itemHealper">?</span>
              </template>
              <div class="popoverHealper">
                <span>
                  Укажите номер группы, для которой предназначается задание
                </span>
              </div>
            </n-popover>
        </div>
        <div class="taskInput">
          <n-select v-model:value="taskValue.group" :options="groups" />
       </div>
      </div>
      <div class="taskDescriptionItem">
        <div>
          <h4>Крайний срок сдачи: </h4>
            <n-popover trigger="hover" raw :show-arrow="false">
              <template #trigger>
                <span class="itemHealper">?</span>
              </template>
              <div class="popoverHealper">
                <span>
                  Установите дедлайн для задания. Эта дата будет показана на странице заданий
                </span>
              </div>
            </n-popover>
        </div>
        <div class="taskInput">
          <n-date-picker class="date_input" type="date" v-model:value="taskValue.deadline"  />
          <!-- <pre> {{taskValue.deadline}} </pre> -->
       </div>
      </div>
      <div class="taskDescriptionItem">
        <div>
          <h4>Задать язык для выполнения задания: </h4>
            <n-popover trigger="hover" raw :show-arrow="false">
              <template #trigger>
                <span class="itemHealper">?</span>
              </template>
              <div class="popoverHealper">
                <span>
                  Можно установить специфичный язык, требуемый для этого задания. Для текущего задания выбор языков будет недоступен!
                </span>
              </div>
            </n-popover>
        </div>
        <div class="taskInput">
          <n-input type="text" v-model:value="taskValue.newField" />
       </div>
      </div>
      <n-button @click="saveTask">Сохранить задание</n-button>
    </div>
      <div class="testCase">
        <div class="tests_wrapper">
          <div class="taskTests" v-for="(test, index) in taskValue.examples" :key="index">
          <Test
          :test='test'
          :key='test'
          :taskId='taskValue.id'
          :index='index' />
          <!-- <span> {{ index }} </span> -->
        </div>
          <n-button color="#8a2be2" @click="addTest()">Добавить тест</n-button>
        </div>
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import Header from '../components/Header.vue'
import Test from '../components/Test.vue'
export default {
  name: 'ChangeTask',
  components: {
    Header,
    Test
  },
  methods: {
    removeTest (id) {
      // console.log('id = ', id)
      // const newList = taskValue.value.examples.filter((item, index, array) => { return index !== id })
      // console.log(typeof (this.taskValue.examples[id]))
      // this.taskValue.examples = this.taskValue.examples.filter((item, index, array) => { return index !== id })
      // this.taskValue.examples[id].forEach(element => {
      //   console.log(element)
      // })
      // console.log('Новый массив', newList)
      // taskValue.value.examples = newList
    }
  },
  setup () {
    const props = useRoute()
    const store = useStore()
    const tasks = store.state.tasks
    const setSubjects = new Set()
    const setGroups = new Set()
    const subjects = []
    const groups = []
    tasks.forEach(element => {
      setSubjects.add(element.subject)
      setGroups.add(element.group)
    })
    setSubjects.forEach(el => { subjects.push({ label: el, value: el }) })
    setGroups.forEach(el => { groups.push({ label: el, value: el }) })
    const taskValue = ref(props.params.id ? tasks.filter((task) => { return Number(props.params.id) === Number(task.id) })[0] : createNewTask())
    function setData (place, data) {
      store.commit(place, data)
    }
    if (typeof (taskValue.value.deadline) === 'string') {
      taskValue.value.deadline = Date.parse(taskValue.value.deadline)
    }
    function createNewTask () {
      // console.log('Я тут')
      const newTask = { id: null, deadline: new Date(), subject: '', name: '', description: '', published: true, group: '', examples: [{}] }
      const idArr = []
      tasks.forEach(element => {
        idArr.push(element.id)
        // console.log(element.id)
      })
      const lastId = idArr.sort().pop()
      newTask.id = lastId + 1
      setData('addNewTasks', newTask)
      // console.log('Biggest one', lastId)
      return newTask
    }

    function saveTask () {
      console.log('here0', tasks)
    }

    function addTest () {
      taskValue.value.examples.push({})
    }

    return {
      customValue: ref([
        {
          showAsEx: true,
          num: 1,
          input: 'A input',
          output: 'A output'
        }
      ]),
      onCreate () {
        return {
          showAsEx: false,
          num: 1,
          input: 'A String'
        }
      },
      props,
      taskValue,
      subjects,
      groups,
      saveTask,
      addTest
      // updateData
    }
  }

}
</script>

<style scoped>
.container{
  display: flex;
  height: calc(100vh - 100px);
  text-align: left;
}
.date_input{
  width: 100%;
}
.taskDescription{
  /* background-color: #ccc; */
  padding: 10px 15px;
  border-right: 1px solid;
  width: 30%;
}
.taskDescriptionItemContainer{
  display: flex;
}
.testDescriptionDynamic{
  max-width: 70%;
  word-wrap: break-word;
}
.taskDescriptionItem{
  display: flex;
  flex-direction: column;
}
.taskDescriptionItem div{
  display: flex;
  align-items: center;
}
.taskInput{
  /* background-color: red; */
  border: 1px solid;
}
.popoverHealper{
  background-color: #efefef;
  padding: 10px;
  transform-origin: inherit;
}
.itemHealper{
  display: block;
  border: 1px solid;
  /* padding: 0 5px; */
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 5px;
}
.testCase{
  display: flex;
  flex-direction: column;
  height: calc(100vh - 100px);
  overflow: auto;
  width: 70%;
}
.taskTests{
  display: flex;
  flex-direction: column;
}
.test_title{
  font-size: 24px;
}
.test_container{
  display: flex;
  flex-direction: column;
}
.test_wrap{
  display: flex;
}
</style>
