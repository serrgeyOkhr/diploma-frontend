<template>
  <div class="container">
    <div class="selectors">
      <n-select v-model:value="selectedLanguage" :options="listLanguages" />
      <!-- <n-select v-model:value="value" :options="options" /> -->
    </div>
    <div class="codeForm">
    <CodeEditor
      theme="light"
      v-model="formVal"
      font_size="16px"
      width="100%"
      min_height="55vh"
      :key="formatSelectLanguage"
      :autofocus="true"
      :wrap_code="true"
      :languages="formatSelectLanguage"
    > </CodeEditor>
    </div>
    <div class="results" v-if="customError">
      <!-- <pre> {{resp}} </pre> -->
      <Response :key='resp' :data='customError' />
    </div>
    <div class="results" v-else>
      <!-- <pre> {{resp}} </pre> -->
      <Response :key='resp' :data='resp' />
    </div>
    <div class="takerButton">
      <n-space>
        <!-- <n-button @click="getFormVal()">Проверить</n-button> -->
        <n-button :loading="loading" @click="getFormVal()">Отправить</n-button>
      </n-space>
    </div>
  </div>
</template>

<script>
import CodeEditor from 'simple-code-editor'
import Response from '../components/Response.vue'
import { ref } from '@vue/reactivity'
export default {
  name: 'code-taker',
  components: {
    CodeEditor,
    Response
  },
  computed: {
    formatSelectLanguage () {
      return JSON.parse(this.selectedLanguage)
    }
  },
  props: {
    id: {
      type: Number
    },
    task: {
      type: Object
    }
  },
  setup (props) {
    const template = ref(null)
    template.value = 'def my_function(n):\n    return n ** 2\n'
    const formVal = template
    const resp = ref(null)
    const customError = ref(null)
    const loading = ref(null)
    // eslint-disable-next-line no-useless-escape
    const selectedLanguage = ref('[[\"python\",\"Python\"]]')
    const listLanguages = [
      {
        label: 'JavaScript',
        // eslint-disable-next-line no-useless-escape
        value: '[[\"javascript\",\"JS\"]]'
      },
      {
        label: 'Python',
        // eslint-disable-next-line no-useless-escape
        value: '[[\"python\",\"Python\"]]'
      }
    ]

    function getFormVal () {
      sendSolution(formVal)
      // return formVal.value.toLowerCase()
    }
    // function getTests () {
    //   const tests = props.task.examples
    //   // console.log('body.spec.tests', toRaw(tests))
    //   return toRaw(tests)
    // }

    function sendSolution (data) {
      const body = {
        task_id: props.id,
        language: JSON.parse(selectedLanguage.value)[0][0],
        code: data.value
      }
      const serverUrl = 'http://100.90.100.22:5000/api/submit_solution'
      console.log(body)
      loading.value = true
      fetch(serverUrl, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(async (response) => { resp.value = await response.json() })
        .then((response) => { loading.value = false })
        .catch((error) => {
          customError.value = error
          setTimeout(() => { loading.value = false }, 1000)
        })
    }
    return {
      formVal,
      listLanguages,
      selectedLanguage,
      resp,
      getFormVal,
      loading,
      customError
    }
  }
}
</script>

<style scoped>
.codeForm{
  /* border: 1px solid; */
  border-radius: 15px;
  padding: 0;
  margin: 0;
  max-height: 55vh;
  overflow: auto;
  margin-bottom: 20px;
  box-shadow: 0px 2px 4px -1px #000;
}
.giantTextarea{
  padding: 0;
  margin: 0;
}
/* .giantTextarea:hover{
  border: 1px solid blue;
} */
.container{
  display: flex;
  flex-direction: column;
  text-align-last: left;
  margin-right: 5px;
}
.selectors{
  width: 150px;
  margin-top: 10px;
  margin-bottom: 15px;
}
.results{
  height: 15vh;
  overflow: auto;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid;
}
.takerButton{
  display: flex;
  justify-content: flex-end;
  text-align: center;
  /* padding-right: 10px; */
}
</style>
