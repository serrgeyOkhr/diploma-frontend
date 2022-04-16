<template>
  <div
  class="test"
  >
  <div class="test_container">
    <div class="test_header">
      <span class="test_title">Тест {{ index }} </span>
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
                  Если вы хотите задать массив, обязательно закройте скобку справа от массива
              </span>
            </div>
          </n-popover>
        </div>
        <n-dynamic-input
        v-model:value="inputData"
        item-style="border: 1px solid; border-radius: 5px; padding: 5px;"
        :min=1
        :on-update="updateInputData('input', inputData)"
        >
        </n-dynamic-input>
      </div>
      <div class="test_outputs">
        <span :class="{testWarning: outputCheckForArray}">Выходные данные: </span>
            <n-dynamic-input
            v-model:value="outputData"
            item-style="border: 1px solid; border-radius: 5px; padding: 5px;"
            :min=1
            :on-update="updateOutputData('output',outputData)">
              <!-- <template #default="{ value }">
                <div style="display: flex; align-items: center; width: 100%">
                  <n-input v-model:value="value.output" type="text" />
                </div>
              </template> -->
            </n-dynamic-input>
      </div>
    </div>
    <div class="test_actives">
      as example
    </div>
  </div>
  <!-- <pre>
  </pre> -->
  </div>
</template>

<script>
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
    const inputData = ref([])
    const outputData = ref([])
    const inputCheckForArray = ref(false)
    const outputCheckForArray = ref(false)
    let tests = []

    // console.log(props)
    if (props.test) {
      // console.log(props.test.input)
      // console.log(props.taskId)
      // console.log(props.test.output)
      const task = store.state.tasks.filter((element) => { return element.id === props.taskId })
      tests = task[0].examples
      // console.log('task', tests)
    }
    const curTest = tests[props.index]
    if (curTest) {
      if (typeof (curTest.input) === 'object') {
        if (typeof (curTest.input[0]) === 'object') {
          curTest.input.forEach(element => {
            // console.log(JSON.stringify(element))
            inputData.value.push((element))
          })
        } else {
          inputData.value.push(JSON.stringify(curTest.input))
        }
        console.log(inputData.value)
      } else {
        inputData.value.push((curTest.input))
      }
      if (typeof (curTest.output) === 'object') {
        curTest.output.forEach(element => {
          // console.log((element))
          outputData.value.push((element))
        })
      } else {
        outputData.value.push((curTest.output))
      }
    }

    function updateInputData (type, data) {
      const task = store.state.tasks.filter((element) => { return element.id === props.taskId })
      tests = task[0].examples
      console.log(data)
      data = toRaw(data)
      data.forEach((el, index) => {
        if (el) {
          console.log(el)
          // console.log(typeof (el))
          inputCheckForArray.value = false

          if (!Number.isNaN(Number(el)) && typeof (el) !== 'object') {
            el = JSON.parse(el)
          } else if (typeof (el) === 'object') {
            el = JSON.stringify(el)
            // console.log('this is obj')
          } else if (el.startsWith('[') && el.endsWith(']')) {
            el = JSON.parse('"' + el + '"')
            // console.log('это массив')
            inputCheckForArray.value = false
          } else if (el.startsWith('[') || el.endsWith(']')) {
            // console.log('возможно, это массив')
            inputCheckForArray.value = true
          }
          data[index] = el
        }
      })
      tests[props.index][type] = data
    }

    function updateOutputData (type, data) {
      const task = store.state.tasks.filter((element) => { return element.id === props.taskId })
      tests = task[0].examples
      data = toRaw(data)
      data.forEach((el, index) => {
        if (el) {
          // console.log(el)

          if (!Number.isNaN(Number(el)) && typeof (el) !== 'object') {
            console.log(!Number.isNaN(Number(el)))
            outputCheckForArray.value = false
            el = JSON.parse(el)
          } else if (typeof (el) === 'object') {
            el = JSON.stringify(el)
            // console.log('this is obj')
          } else if (el.startsWith('[') && el.endsWith(']')) {
            el = JSON.parse('"' + el + '"')
            // console.log('это Mассив')
            outputCheckForArray.value = false
          } else if (el.startsWith('[') || el.endsWith(']')) {
            // console.log('возможно, это массив')
            outputCheckForArray.value = true
          }
          data[index] = el
        }
      })
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
      updateInputData,
      updateOutputData,
      removeTest
    }
  }
}
</script>

<style scoped>
.test {
  font-size: 18px;
  border: 1px solid;
  /* border-left: none; */
  padding: 5px  10px;
  margin-bottom: 10px;
  margin-top: 5px;
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
}
</style>
