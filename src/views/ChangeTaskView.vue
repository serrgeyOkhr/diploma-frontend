<template>
  <n-spin :show="showPreloader">
    <Header/>
  <div class="container">
    <div class="taskDescription">
      <n-form ref="formRef" :rules="rules" :model="taskValue">
        <n-form-item path="title">
          <div class="taskDescriptionItem">
            <div class="taskDescriptionItemContainer">
              <h2 class="changeTask_subTitle">Название: </h2>
                <n-popover trigger="hover" raw :show-arrow="false">
                  <template #trigger>
                    <span class="itemHealper">?</span>
                  </template>
                  <div class="popoverHealper">
                    <span>
                      Название задания. Например: Задание 1
                    </span>
                  </div>
                </n-popover>
              <h3 class="testDescriptionDynamic"> {{taskValue.title}} </h3>
            </div>
            <div class="taskInputWrap">
              <n-input class="taskInput" type="text" v-model:value="taskValue.title" />
            </div>
        </div>
      </n-form-item>
        <div class="taskDescriptionItem">
          <div class="changeTask_subTitle_group">
            <h4 class="changeTask_subTitle">Описание: </h4>
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
        <n-form-item path="subject">
          <div class="taskDescriptionItem">
          <div class="changeTask_subTitle_group">
            <h4 class="changeTask_subTitle">Предмет: </h4>
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
            <n-select v-model:value="taskValue.subject" :options="subjects" remote />
            <!-- <n-input type="text" v-model:value="taskValue.subject" /> -->
        </div>
        </div>
        </n-form-item>
        <n-form-item path="group">
        <div class="taskDescriptionItem">
          <div class="changeTask_subTitle_group">
            <h4 class="changeTask_subTitle">Группа: </h4>
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
        </n-form-item>
        <div class="taskDescriptionItem">
          <div class="changeTask_subTitle_group">
            <h4 class="changeTask_subTitle">Крайний срок сдачи: </h4>
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
          <div class="changeTask_subTitle_group">
            <h4 class="changeTask_subTitle">Задать язык для выполнения задания: </h4>
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
        <div class="changeTaskButtonGroup">
          <n-button class="save_change_btn" @click="saveTask">Сохранить задание</n-button>
          <n-button v-if="propsID" class="checkSolutionBtn" @click="checkSolutionBtn" type="primary">Проверить задание</n-button>
          <!-- <n-button v-else disabled class="checkSolutionBtn" @click="checkSolutionBtn" type="primary">Проверить задание</n-button> -->
          <n-tooltip v-else>
            <template #trigger>
              <n-button disabled class="checkSolutionBtn" type="primary">
                Проверить задание
              </n-button>
            </template>
            Сохраните задание и перейдите на страницу редактирования задания
          </n-tooltip>
        </div>
        <!-- <pre> {{taskValue}} </pre> -->
      </n-form>
    </div>
      <div class="testCase">
        <n-spin :show="taskPreloader">
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
        </n-spin>
      </div>
  </div>
  </n-spin>
    <n-modal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="Проверка прохождения тестов"
      :bordered="false"
      size="huge"
      :segmented="segmented"
    >
      <!-- <template #header-extra>
        Oops!
      </template> -->
        <!-- <div class="modal"> -->
          <CodeTakerVue :userType="'teacher'" :id="taskValue.id"/>
        <!-- </div> -->
    </n-modal>

</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Header from '../components/Header.vue'
import Test from '../components/Test.vue'
import CodeTakerVue from '@/components/CodeTaker.vue'
import { useMessage } from 'naive-ui'
import config from '@/config'
export default {
  title: 'ChangeTask',
  components: {
    Header,
    Test,
    CodeTakerVue
  },
  setup () {
    const URLgetGroups = config.hostname + config.api.getGroups
    const URLgetSubjects = config.hostname + config.api.getSubjects
    const props = useRoute()
    const store = useStore()
    const message = useMessage()
    const router = useRouter()
    const formRef = ref(null)
    const showModal = ref(false)
    const showPreloader = ref(false)
    const taskPreloader = ref(false)
    const propsID = props.params.id ? props.params.id : undefined
    const tasks = store.state.tasks
    const updateTask = ref(config.hostname + (props.params.id !== undefined ? config.api.editTask : config.api.createTask))
    // console.log(props.params.id !== undefined)
    // console.log('URL', updateTask.value)
    const rules = ref({
      title: {
        required: true,
        message: 'Это поле обязательно для ввода',
        trigger: ['input', 'blur']
      },
      subject: {
        required: true,
        message: 'Выберите элемент!',
        trigger: ['input', 'blur']
      },
      group: {
        required: true,
        message: 'Выберите элемент!',
        trigger: ['input', 'blur']
      }
    })
    // const setSubjects = new Set()
    // const setGroups = ref(null)
    const subjects = ref([])
    const groups = ref([])
    getSubjects(subjects)
    getGroups(groups)

    function getSubjects (subjects) {
      fetch(URLgetSubjects, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(result => {
          const allSubjects = result.filter((el) => { return el.teacher === store.state.user.id })
          allSubjects.forEach((el) => {
            subjects.value.push(
              {
                label: el.full_name,
                value: el.id
              }
            )
          })
          // console.log('AllSubjects', result)
        })
    }
    function getGroups () {
      fetch(URLgetGroups, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(result => {
          result.forEach((el) => {
            groups.value.push(
              {
                label: el.id,
                value: el.id
              }
            )
          })
        })
    }

    const taskValue = ref(props.params.id ? tasks.filter((task) => { return Number(props.params.id) === Number(task.id) })[0] : createNewTask())
    function setData (place, data) {
      store.commit(place, data)
    }
    getTaskDetails(taskValue.value.id, taskValue)
    function getTaskDetails (taskId, output) {
      const taskDetailUrl = config.hostname + config.api.getTaskDetails
      const body = {
        task_id: taskId
      }
      // console.log(body)
      taskPreloader.value = true
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
          taskPreloader.value = false
          output.value.examples = unify(result.tests, result.examples)
          store.commit('saveNewTask', output)
        })
        .finally(() => {
          taskPreloader.value = false
        })
    }
    function unify (uniTests, uniExamples) {
      const es = {}
      for (const e of uniExamples) {
        es[e.input] = true
      }
      // eslint-disable-next-line no-return-assign
      uniTests.map((t) => {
        // eslint-disable-next-line no-return-assign
        if (es[t.input] === true) {
          t.asExample = true
        }
        return t
      })
      // console.log('before return', uniTests)
      return uniTests
    }
    if (typeof (taskValue.value.deadline) === 'string') {
      // const re = /[.]+/g
      // taskValue.value.deadline = taskValue.value.deadline.replaceAll(re, ',')
      // console.log(taskValue.value.deadline)
      // console.log(Date.parse(taskValue.value.deadline))
      taskValue.value.deadline = Date.parse(taskValue.value.deadline)
    }
    function createNewTask () {
      // console.log('Я тут')
      const newTask = { id: null, deadline: new Date(), subject: '', title: '', description: '', shown: false, group: '', examples: [{}] }
      const idArr = []
      tasks.forEach(element => {
        idArr.push(element.id)
        // console.log(element.id)
      })
      const lastId = idArr.sort().pop()
      newTask.id = String(Number(lastId) + 1)
      setData('addNewTasks', newTask)
      // console.log('Biggest one', lastId)
      return newTask
    }
    // console.log('дед лайн', taskValue.value.deadline)
    function saveTask (e) {
      e.preventDefault()
      formRef.value?.validate(async (errors) => {
        if (!errors) {
          sendToServer(taskValue)
        }
      })
    }

    function checkSolutionBtn () {
      showModal.value = true
      // console.log('Проверка задания')
    }
    function sendToServer (data) {
      // console.log('Ожидаемый аут', data.value.examples)
      const tests = []
      const examples = []
      data.value.examples.forEach(test => {
        const e = {
          input: test.input,
          output: test.output.map((el) => parseLine(el))
        }
        tests.push(e)
        if (test.asExample) {
          examples.push(e)
        }
        // console.log(test)
      //   test.output.forEach(out => {
      //   })
      })
      const body = {
        id: props.params.id ? data.value.id : null,
        title: data.value.title,
        description: data.value.description,
        deadline: new Date(data.value.deadline),
        subject: data.value.subject,
        group: data.value.group,
        shown: data.value.shown,
        examples: JSON.stringify(examples),
        tests: JSON.stringify(tests)
      }
      // console.log('PROLOADER')
      showPreloader.value = true
      fetch(updateTask.value, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          return response
        })
        .then((result) => {
          if (result.statusText === 'OK') {
            message.info('Задание сохранено')
            if (props.params.id === undefined) {
              router.push('/')
            }
          } else {
            message.error('Произошла ошибка')
          }
          // console.log('STOP PROLOADER')
          showPreloader.value = false
        })
        .catch(error => console.error(error))
    }

    function addTest () {
      if (taskValue.value.examples) {
        taskValue.value.examples.push({})
      } else {
        taskValue.value.examples = [{}]
      }
    }

    function parseLine (line) {
      if (!Number.isNaN(Number(line))) {
        line = JSON.parse(line)
      } else if (line.startsWith('[') && line.endsWith(']')) {
        line = JSON.parse(line)
      } else if (line.startsWith('{') && line.endsWith('}')) {
        line = JSON.parse(line)
      } else if (line.startsWith('[') || line.endsWith(']')) {
        // eslint-disable-next-line no-throw-literal
        throw 'unclosed'
      } else if (line.startsWith('{') || line.endsWith('}')) {
        // eslint-disable-next-line no-throw-literal
        throw 'unclosed'
      } else {
        // line = line
      }
      return line
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
      formRef,
      rules,
      taskValue,
      subjects,
      groups,
      showPreloader,
      propsID,
      showModal,
      taskPreloader,
      saveTask,
      addTest,
      checkSolutionBtn,
      sendToServer
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
/* .save_change_btn {
} */
.testDescriptionDynamic{
  max-width: 70%;
  word-wrap: break-word;
}
.taskDescriptionItem{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.taskDescriptionItem div{
  display: flex;
  align-items: center;
}
.taskInput{
  /* background-color: red; */
  width: 100%;
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
  padding: 2px;
  font-size: 14px;
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
.tests_wrapper{
  padding: 0 10px;
}
.test_wrap{
  display: flex;
}
.changeTask_subTitle{
  margin: 0px;
  padding: 10px 5px;
}
.changeTask_subTitle_group{
  display: flex;
  align-items: center;
}
.changeTaskButtonGroup{
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.modal {
  display: flex;
  width: 90%;
}
</style>
