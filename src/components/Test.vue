<template>
  <div
  class="test"
  >
  <div class="test_container">
    <div class="test_header">
      <div class="test_header_group">
        <div class="test_title">Тест {{ index + 1}} </div>
        <div class="test_asEx">
          <n-checkbox
          v-model:checked="useAsExample"
          size="large"
          font-size="18px"
          :on-update="updateExampleData('asExample', useAsExample)"
        >
          <span class="fz18">Показать в качестве примера</span>
        </n-checkbox>
        </div>
      </div>
      <n-button type="error" @click="removeTest(index)">Удалить</n-button>
    </div>
    <div class="test_wrap">
      <div class="test_inputs">
        <div class="test_input_title">
          <span :class="{testWarning: inputCheckForArray}">Входные данные: </span>
          <n-popover trigger="hover" raw :show-arrow="false" v-if="inputCheckForArray">
            <template #trigger>
              <span class="itemHealper">?</span>
            </template>
            <div class="popoverHealper">
              <span>
                  Значение не соответствует формату JSON. Для справки изучите сайт <a target="blank" href="https://www.json.org/json-ru.html">JSON.ORG</a>
              </span>
            </div>
          </n-popover>
        </div>
        <n-input
          class="testInput"
          v-model:value="inputData"
          @input="updateInputData('input', inputData)"
        >
        </n-input>
        <!-- <pre> {{inputData}} </pre> -->
      </div>
      <div class="test_outputs">
          <div class="test_input_title">
            <span :class="{testWarning: outputCheckForArray}">Выходные данные: </span>
          <n-popover trigger="hover" raw :show-arrow="false" v-if="outputCheckForArray">
            <template #trigger>
              <span class="itemHealper">?</span>
            </template>
            <div class="popoverHealper">
              <span>
                  Значение не соответствует формату JSON. Для справки изучите сайт <a target="blank" href="https://www.json.org/json-ru.html">JSON.ORG</a>
              </span>
            </div>
          </n-popover>
        </div>
        <n-dynamic-input
          v-model:value="outputData"
          item-style="border: 1px solid; border-radius: 5px; padding: 5px;"
          :min=1
          :on-update="updateOutputData('output',outputData)">
        </n-dynamic-input>
         <!-- <pre> {{outputData}} </pre> -->
      </div>
    </div>
  </div>
  </div>
</template>

<script>
/* eslint-disable no-throw-literal */
import { ref, toRaw } from '@vue/reactivity'
// import { ref } from '@vue/reactivity'
// import { ref, toRef } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  name: 'test-component',
  props: {
    test: Array,
    taskId: Number,
    index: Number
  },
  setup (props) {
    const store = useStore()
    const inputData = ref('')
    const outputData = ref([])
    const inputCheckForArray = ref(false)
    const outputCheckForArray = ref(false)
    const useAsExample = ref(false)
    let tests = []

    // console.log(props)
    if (props.test) {
      const task = store.state.tasks.filter((element) => { return element.id === props.taskId })
      // console.log(task)
      tests = task[0].examples
      // console.log('tests', tests)
    }
    const curTest = tests[props.index]
    // console.log('curTest', curTest)
    if (curTest) {
      if (typeof (curTest.input) !== 'string') {
        inputData.value = (JSON.stringify(curTest.input))
      } else {
        inputData.value = curTest.input
      }

      if (typeof (curTest.output) === 'object') {
        curTest.output.forEach(element => {
          outputData.value.push(displayElement(element))
        })
      } else {
        outputData.value.push((curTest.output))
      }
      useAsExample.value = curTest.asExample
    }

    function displayElement (el) {
      if (typeof (el) === 'string') {
        return el
      } else if (typeof (el) === 'number') {
        return el.toString()
      } else {
        return JSON.stringify(el)
      }
    }

    function updateInputData (type, data) {
      // console.log('Я тут')
      const task = store.state.tasks.filter((element) => { return element.id === props.taskId })
      tests = task[0].examples
      inputCheckForArray.value = false

      try {
        data = parseLine(data)
      } catch {
        inputCheckForArray.value = true
      }

      tests[props.index][type] = data
    }

    function parseLine (line) {
      if (!Number.isNaN(Number(line))) {
        line = JSON.parse(line)
      } else if (line.startsWith('[') && line.endsWith(']')) {
        line = JSON.parse(line)
      } else if (line.startsWith('{') && line.endsWith('}')) {
        line = JSON.parse(line)
      } else if (line.startsWith('[') || line.endsWith(']')) {
        throw 'unclosed'
      } else if (line.startsWith('{') || line.endsWith('}')) {
        throw 'unclosed'
      } else {
        // line = line
      }
      return line
    }

    function updateOutputData (type, data) {
      const task = store.state.tasks.filter((element) => { return element.id === props.taskId })
      tests = task[0].examples
      data = toRaw(data)
      // console.log('outputData', data)
      outputCheckForArray.value = false
      try {
        data.forEach(test => {
          parseLine(test)
          // console.log('test', test)
        })
      } catch {
        outputCheckForArray.value = true
      }
      tests[props.index][type] = data
      // console.log('tests[props.index][type]', tests[props.index][type])
    }

    function updateExampleData (type, data) {
      // console.log('updateExampleData', data)
      const task = store.state.tasks.filter((element) => { return element.id === props.taskId })
      tests = task[0].examples
      tests[props.index][type] = data
    }

    function removeTest (position) {
      const task = store.state.tasks.filter((element) => { return element.id === props.taskId })
      tests = JSON.parse(JSON.stringify(task[0].examples))
      const data = { id: props.taskId, position: position }
      store.commit('updateExamples', data)
    }

    return {
      curTest,
      inputData,
      outputData,
      inputCheckForArray,
      outputCheckForArray,
      useAsExample,
      updateInputData,
      updateExampleData,
      updateOutputData,
      removeTest
    }
  }
}
</script>

<style scoped>
.fz18{
  font-size: 18px;
}
.test {
  font-size: 18px;
  border: 1px solid;
  /* border-left: none; */
  padding: 5px  10px;
  margin-bottom: 10px;
  margin-top: 5px;
}
.test_asEx{
  margin-left: 20px;
  font-size: 18px;
}
.itemHealper{
  border: 1px solid;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
.test_wrap{
  display: flex;
  justify-content: space-between;
}
.testWarning{
  color:rgb(214, 139, 0)
}
.test_title{
  font-size: 24px;
}
.test_input_title{
  display: flex;
  align-items: center;
}
.popoverHealper{
  background-color: #fff;
  border: 1px solid;
  padding: 15px 10px;
  border-radius: 5px;
}
.test_header{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.test_header_group{
  display: flex;
  flex-direction: row;
  align-items: center;
}
.test_inputs{
  width: 45%;
}
.testInput{
  font-size: 18px;
  border: 1px solid;
  border-radius: 5px;
  padding: 5px;
  width: 100%;
}
</style>
