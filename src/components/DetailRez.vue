<template>
  <div class="container" v-if="result">
  <h2>Решение</h2>
    <div class="rawCode">
      <CodeEditor
        :key='result[0].id'
        :value="result[0].code"
        font_size="16px"
        width="100%"
        min_height="55vh"
        :read_only="true"
        :wrap_code="true"
      > </CodeEditor>
    </div>
    <div class="outputBox">
      <Response :data='rawRez' />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { ref, toRaw, toRef } from '@vue/reactivity'
import CodeEditor from 'simple-code-editor'
import Response from './Response.vue'
export default {
  name: 'detail-result',
  components: {
    CodeEditor,
    Response
  },
  props: {
    rezId: {
      type: Object
    }
  },
  setup (props) {
    const datailResultURL = 'http://127.0.0.1:5000/detail_result'
    const resp = ref(null)
    const customError = ref(null)
    const loading = ref(null)
    const resultID = toRef(props, 'rezId')
    // const result = getResult(resultID)
    const result = getStaticResult(resultID.value.id)
    let rawRez
    if (result) {
      result[0].status = resultID.value.status
      rawRez = toRaw(result[0])
    }
    function getResult (resultID) {
      /** ожидаемый return:
      * [
      *   {
      *     id: 1 (type: Number),
      *     deadline: TimeStamp (type: ????),
      *     subject: 'sub1' (type: String),
      *     name: 'title' (type: String),
      *     description: 'descript' (type: String),
      *     published: true / false (type: Boolean),
      *     group: 'IT-6969' (type: String),
      *     examples: [{}] (type: Object),
      *     done: true / false (type: Boolean)
      *   }
      * ]
      */
      // console.log(resultID.value)
      const body = {
        id: resultID.value
      }
      // console.log('body = ', body)
      loading.value = true
      fetch(datailResultURL, {
        method: 'POST',
        mode: 'cors',
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
      return toRaw(resp.value)
    }
    function getStaticResult (resultID) {
      console.log(resultID)
      const results = ref([
        {
          id: 1,
          failed_test: [[2, 6, 4], [4, -1, 8]],
          output: 'long code',
          code: "print('1')"
        },
        {
          id: 2,
          failed_test: [[2, 6, 4], [4, -1, 8]],
          output: null,
          code: "print('10')"
        },
        {
          id: 3,
          failed_test: null,
          output: null,
          code: "print('69')"
        }
      ])
      if (resultID) {
        return results.value.filter((el) => { return el.id === resultID })
      } else {
        return null
      }
    }

    return {
      result,
      rawRez
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  display: flex;
  flex-direction: column;
}
.outputBox {
  max-height: 22vh;
  overflow: auto;
  margin-top: 10px;
  padding: 10px;
  border: 1px solid;
}

</style>
