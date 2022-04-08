/* eslint-disable no-useless-escape */
<template>
  <div class="container">
    <div class="selectors">
      <n-select v-model:value="selectedLanguage" :options="listLanguages" />
      <!-- <n-select v-model:value="value" :options="options" /> -->
    </div>
    <div class="codeForm">
    <CodeEditor
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
    <div class="results">  {{formVal}}  </div>
    <div class="takerButton">
      <n-space>
        <n-button @click="getFormVal()">Проверить</n-button>
        <n-button @click="getFormVal()">Отправить</n-button>
      </n-space>
    </div>
  </div>
</template>

<script>
import CodeEditor from 'simple-code-editor'
import { ref } from '@vue/reactivity'
export default {
  name: 'code-taker',
  components: {
    CodeEditor
  },
  computed: {
    formatSelectLanguage () {
      return JSON.parse(this.selectedLanguage)
    }
  },
  setup () {
    const template = 'function main () {\n\n}\n\n\n\n\n\n\n\n\n\n\n'
    const formVal = ref(template)

    // eslint-disable-next-line no-useless-escape
    const selectedLanguage = ref('[[\"python\",\"Python\"]]')
    const listLanguages = [
      {
        label: 'JavaScript',
        // eslint-disable-next-line no-useless-escape
        value: '[[\"javascipt\",\"JS\"]]'
      },
      {
        label: 'Python',
        // eslint-disable-next-line no-useless-escape
        value: '[[\"python\",\"Python\"]]'
      },
      {
        label: 'C#',
        // eslint-disable-next-line no-useless-escape
        value: '[[\"csharp\",\"C#\"]]'
      }
    ]

    function getFormVal () {
      console.log('here')
      console.log(formVal)
      // return formVal.value.toLowerCase()
    }
    return {
      formVal,
      listLanguages,
      selectedLanguage,
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
  width: 10%;
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
