<template>
  <n-spin :show="loading" size="large">
      <div class="container">
    <div class="selectors">
      <n-select
        v-model:value="selectedLanguage"
        :options="listLanguages"
        @update:value="changeTemplate"
      />
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
        <n-button :loading="checkLoading" @click="getFormVal('check')">Проверить без сохранения</n-button>
        <n-button type=primary :loading="sendLoading" @click="getFormVal('send')">Отправить решение</n-button>
      </n-space>
    </div>
  </div>
  </n-spin>
</template>

<script>
import CodeEditor from 'simple-code-editor'
import Response from '../components/Response.vue'
import { ref } from '@vue/reactivity'
import { useMessage } from 'naive-ui'
import config from '@/config'

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
    template.value = 'def my_function(args):\n  # Писать решение здесь \n  return ...\n}\n\n\n\n\n\n\n'
    const formVal = template
    const resp = ref(null)
    const customError = ref(null)
    const loading = ref(null)
    const checkLoading = ref(false)
    const sendLoading = ref(false)
    const message = useMessage()
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

    function changeTemplate (value) {
      // eslint-disable-next-line no-useless-escape
      if (value === '[[\"javascript\",\"JS\"]]') {
        template.value = 'function my_function(args) {\n  // Писать решение здесь \n  return ...\n}\n\n\n\n\n\n'
      // eslint-disable-next-line no-useless-escape
      } else if ((value === '[[\"python\",\"Python\"]]')) {
        template.value = 'def my_function(args):\n  # Писать решение здесь \n  return ...\n}\n\n\n\n\n\n'
      }
    }

    function getFormVal (status) {
      if (status === 'send') {
        sendSolution(formVal)
      }
      if (status === 'check') {
        checkSolution(formVal)
      }
      // return formVal.value.toLowerCase()
    }

    function checkSolution (data) {
      const sendURL = config.hostname + config.api.checkSolution
      const body = {
        task_id: props.id,
        language: JSON.parse(selectedLanguage.value)[0][0],
        code: data.value
      }
      checkLoading.value = true
      loading.value = true
      sendToServer(sendURL, body, checkLoading)
    }

    function sendSolution (data) {
      const body = {
        task_id: props.id,
        language: JSON.parse(selectedLanguage.value)[0][0],
        code: data.value
      }
      const serverUrl = config.hostname + config.api.submitSolution
      console.log(body)
      sendLoading.value = true
      loading.value = true
      sendToServer(serverUrl, body, sendLoading)
    }

    async function sendToServer (URL, body, loader) {
      return fetch(URL, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then(response => {
          console.log(response)
          return response
        })
        .then((result) => {
          console.log('Ответ пришел!')
          resp.value = result
          loader.value = false
          loading.value = false
        })
        .catch((error) => {
          message.error('Ошибка сервера', {
            closable: true,
            duration: 10000
          })
          message.error(String(error))
          console.log(error)
          resp.value = error
        })
        .finally(() => {
          loader.value = false
          loading.value = false
        })
    }

    return {
      formVal,
      listLanguages,
      selectedLanguage,
      resp,
      loading,
      checkLoading,
      sendLoading,
      customError,
      changeTemplate,
      getFormVal
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
